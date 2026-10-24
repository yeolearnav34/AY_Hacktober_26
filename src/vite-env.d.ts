/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_HUGGINGFACE_API_KEY?: string;
  readonly VITE_HF_MODEL?: string;
  readonly VITE_OPENWEATHER_API_KEY?: string;
  readonly VITE_MODEL_API_URL?: string;
  readonly VITE_GEMINI_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
