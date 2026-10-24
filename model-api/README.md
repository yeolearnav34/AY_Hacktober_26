---
title: CropCare AI Model API
emoji: 🌿
colorFrom: green
colorTo: yellow
sdk: docker
app_port: 7860
---

# CropCare AI model API

FastAPI server for the ResNet34 leaf classifier trained in the notebook (Healthy / Powdery / Rust).

## Get the weights (once)
1. Run the notebook `plant-disease-classification-with-export.ipynb` on Kaggle or Colab with a GPU.
2. The new export cell creates **`plant_model.pth`** and **`labels.json`**. Download both.

## Deploy on Hugging Face Spaces (free)
1. huggingface.co → New Space → SDK **Docker** → name it e.g. `cropcare-model`.
2. Upload everything in this folder (`app.py`, `requirements.txt`, `Dockerfile`, `README.md`) **plus** `plant_model.pth` and `labels.json`.
   Files over 10MB (the `.pth` is about 85MB) upload through the website's "Add file" button, which handles it automatically.
3. Space → Settings → Variables: set `ALLOWED_ORIGINS` to `https://ay-hacktober-26.vercel.app` (comma-separate more if needed).
4. When the Space shows **Running**, open `https://<you>-cropcare-model.hf.space/health`. It should say `"model_loaded": true`.

## Connect the site
In Vercel → Project → Settings → Environment Variables add
`VITE_MODEL_API_URL = https://<you>-cropcare-model.hf.space` then **Redeploy** (Vite bakes variables in at build time).

## Run locally
```bash
pip install -r requirements.txt
uvicorn app:app --port 7860
curl -F file=@leaf.jpg http://localhost:7860/predict
```
Free Spaces sleep after inactivity, so the first scan after a pause can take 30-60 seconds. The site falls back to its built-in engine if the API doesn't answer in time.
