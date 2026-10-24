"""CropCare AI model API.

Serves the ResNet34 leaf classifier trained in the notebook.

Preprocessing here MUST match the notebook exactly:
  RGB -> resize to 128x128 (OpenCV bilinear, like albumentations) -> float 0..255
  -> NO mean/std normalisation (the notebook never normalised).
The model's last layer already ends in Softmax, so outputs are probabilities.
"""
import io
import json
import os

import cv2
import numpy as np
import torch
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError
from torch import nn
from torchvision import models

IMAGE_SIZE = (128, 128)
MAX_UPLOAD_BYTES = 10 * 1024 * 1024
MODEL_PATH = os.getenv("MODEL_PATH", "plant_model.pth")
LABELS_PATH = os.getenv("LABELS_PATH", "labels.json")
ALLOWED_ORIGINS = [
    o.strip()
    for o in os.getenv(
        "ALLOWED_ORIGINS",
        "https://ay-hacktober-26.vercel.app,http://localhost:5173",
    ).split(",")
    if o.strip()
]


class PlantDiseaseModel(nn.Module):
    """Same structure as the notebook so the saved state_dict keys line up."""

    def __init__(self, classes: int):
        super().__init__()
        self.model = models.resnet34(weights=None)
        in_features = self.model.fc.in_features
        self.model.fc = nn.Sequential(
            nn.Linear(in_features=in_features, out_features=classes),
            nn.Softmax(dim=1),
        )

    def forward(self, image):
        return self.model(image)


labels: list[str] = []
model: PlantDiseaseModel | None = None


def load_model() -> None:
    global labels, model
    if not (os.path.exists(MODEL_PATH) and os.path.exists(LABELS_PATH)):
        return
    with open(LABELS_PATH) as f:
        labels = json.load(f)
    net = PlantDiseaseModel(classes=len(labels))
    net.load_state_dict(torch.load(MODEL_PATH, map_location="cpu"))
    net.eval()
    model = net


def preprocess(raw: bytes) -> torch.Tensor:
    try:
        img = Image.open(io.BytesIO(raw)).convert("RGB")
    except (UnidentifiedImageError, OSError):
        raise HTTPException(status_code=415, detail="Not a valid image. Upload a JPG, PNG or WEBP.")
    arr = np.array(img)
    arr = cv2.resize(arr, IMAGE_SIZE, interpolation=cv2.INTER_LINEAR)
    tensor = torch.from_numpy(arr).permute(2, 0, 1).float()  # 0..255, CHW
    return tensor.unsqueeze(0)


app = FastAPI(title="CropCare AI model API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.on_event("startup")
def _startup() -> None:
    load_model()


@app.get("/health")
def health():
    return {"ok": True, "model_loaded": model is not None, "labels": labels}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Add plant_model.pth and labels.json next to app.py.",
        )
    raw = await file.read(MAX_UPLOAD_BYTES + 1)
    if len(raw) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="Image is larger than 10MB.")

    with torch.no_grad():
        probs = model(preprocess(raw))[0].tolist()

    ranked = sorted(zip(labels, probs), key=lambda p: p[1], reverse=True)
    return {
        "label": ranked[0][0],
        "confidence": round(ranked[0][1], 4),
        "probabilities": {name: round(p, 4) for name, p in ranked},
    }
