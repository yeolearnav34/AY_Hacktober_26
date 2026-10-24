import { CropScanResult } from '../types';
import { MODEL_DISEASES, ModelDiseaseInfo } from '../data/modelDiseases';

// URL of the model server in model-api/, e.g. https://<you>-cropcare-model.hf.space
const API_URL = ((import.meta.env.VITE_MODEL_API_URL as string | undefined) || '').replace(/\/+$/, '');
export const isModelApiConfigured = API_URL.length > 0;

// Below this the site asks for a better photo instead of guessing.
export const MIN_CONFIDENCE = 0.7;
// Free hosts sleep when idle; the first request can take a while to wake them.
const REQUEST_TIMEOUT_MS = 60_000;

const MODEL_NAME = 'CropCare ResNet34 (Healthy / Powdery Mildew / Rust)';
const DISCLAIMER =
  'This model only recognises healthy leaves, powdery mildew and rust. Other diseases can be mislabelled as one of these. Verify with your local Krishi Vigyan Kendra (KVK) before spraying.';

type ClassKey = keyof typeof MODEL_DISEASES;

const toClassKey = (label: string): ClassKey | null => {
  const l = label.toLowerCase();
  if (l.includes('healthy')) return 'healthy';
  if (l.includes('powdery')) return 'powdery';
  if (l.includes('rust')) return 'rust';
  return null;
};

interface ModelResponse {
  label: string;
  confidence: number;
  probabilities: Record<string, number>;
}

const callModel = async (dataUrl: string): Promise<ModelResponse> => {
  const blob = await (await fetch(dataUrl)).blob();
  const form = new FormData();
  form.append('file', blob, 'leaf.jpg');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(`${API_URL}/predict`, { method: 'POST', body: form, signal: controller.signal });
    if (!res.ok) throw new Error(`Model API responded ${res.status}`);
    return (await res.json()) as ModelResponse;
  } finally {
    clearTimeout(timer);
  }
};

const toResult = (
  info: ModelDiseaseInfo,
  prediction: ModelResponse,
  alternatives: CropScanResult['alternatives'],
  dataUrl: string
): CropScanResult => ({
  success: true,
  crop: 'Leaf (crop not identified)',
  cropLocalName: { hi: 'पत्ती', mr: 'पान' },
  prediction: info.name,
  diseaseLocalName: info.localName,
  scientificName: info.scientificName,
  pathogenType: info.pathogenType,
  confidence: Math.round(prediction.confidence * 100) / 100,
  severity: info.pathogenType === 'healthy' ? 'healthy' : 'moderate',
  alternatives,
  symptoms: info.symptoms,
  causes: info.causes,
  treatment: info.treatment,
  prevention: info.prevention,
  expertGuidance: info.expertGuidance,
  model: MODEL_NAME,
  disclaimer: DISCLAIMER,
  analysisTimestamp: new Date().toISOString(),
  imageUrl: dataUrl,
});

/**
 * Classify a leaf with the trained model.
 * Returns null when the API is not configured or unreachable so the caller can fall back.
 */
export const predictWithModelApi = async (dataUrl: string): Promise<CropScanResult | null> => {
  if (!isModelApiConfigured) return null;

  try {
    const prediction = await callModel(dataUrl);
    const topKey = toClassKey(prediction.label);
    if (!topKey) return null; // labels.json doesn't match what the site knows about

    const alternatives = Object.entries(prediction.probabilities)
      .filter(([label]) => label !== prediction.label)
      .map(([label, p]) => {
        const key = toClassKey(label);
        return key ? { name: MODEL_DISEASES[key].name, confidence: Math.round(p * 100) / 100, crop: 'Leaf' } : null;
      })
      .filter((a): a is NonNullable<typeof a> => a !== null);

    const result = toResult(MODEL_DISEASES[topKey], prediction, alternatives, dataUrl);

    if (prediction.confidence < MIN_CONFIDENCE) {
      return {
        ...result,
        isUnclearImage: true,
        unclearReason: `The model is only ${Math.round(prediction.confidence * 100)}% sure. Take a clear, close-up photo of a single leaf in daylight and try again, and do not spray based on this result.`,
        severity: 'low',
      };
    }
    return result;
  } catch (err) {
    console.warn('Model API unavailable, falling back:', err);
    return null;
  }
};
