import React, { useState, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { sampleLeaves, SampleLeaf } from '../data/sampleLeaves';
import { CameraCaptureModal } from './CameraCaptureModal';
import { 
  Upload, 
  Camera, 
  Image as ImageIcon, 
  Trash2, 
  RefreshCcw, 
  AlertCircle, 
  Sparkles,
  ArrowRight,
  Shield,
  Leaf
} from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (imageDataUrl: string, sampleHintId?: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  selectedImage: string | null;
  onClear: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  onAnalyze,
  isAnalyzing,
  selectedImage,
  onClear,
}) => {
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);

  const validateAndProcessFile = (file: File) => {
    setErrorMessage(null);
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (!validTypes.includes(file.type)) {
      setErrorMessage(t.detect.fileLimitWarning);
      return;
    }

    // 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage(t.detect.fileLimitWarning);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setActiveSampleId(null);
      onImageSelected(reader.result as string);
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read selected image. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSample = (sample: SampleLeaf) => {
    setErrorMessage(null);
    setActiveSampleId(sample.id);
    onImageSelected(sample.imageUrl, sample.id);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative overflow-hidden rounded-3xl border-2 transition-all p-6 sm:p-10 text-center ${
          isDragging
            ? 'border-forest-600 bg-forest-50/80 scale-[1.01]'
            : selectedImage
            ? 'border-forest-300 bg-white shadow-soft'
            : 'border-dashed border-stone-300 bg-white/70 hover:border-forest-400 hover:bg-forest-50/30 shadow-xs'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />

        {selectedImage ? (
          /* Preview state */
          <div className="flex flex-col items-center">
            <div className="relative group max-w-md w-full rounded-2xl overflow-hidden shadow-card border border-stone-200">
              <img
                src={selectedImage}
                alt="Selected crop leaf for diagnosis"
                className="w-full h-64 sm:h-80 object-cover rounded-2xl"
              />
              
              {/* Overlay badges */}
              <div className="absolute top-3 left-3 bg-forest-950/75 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-harvest" />
                <span>Ready for AI Analysis</span>
              </div>

              {/* Action buttons on image */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl bg-white/90 p-2 text-stone-700 shadow-sm hover:bg-white hover:text-forest-900 transition"
                  title="Replace Image"
                >
                  <RefreshCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onClear}
                  className="rounded-xl bg-red-500/90 p-2 text-white shadow-sm hover:bg-red-600 transition"
                  title="Remove Image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CTA Analyze Button */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onAnalyze}
                disabled={isAnalyzing}
                className="inline-flex items-center gap-2.5 rounded-full bg-harvest-400 px-8 py-4 text-base sm:text-lg font-bold text-stone-900 shadow-lifted transition-all hover:bg-harvest-500 hover:scale-102 active:scale-98 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCcw className="h-5 w-5 animate-spin text-stone-900" />
                    <span>{t.detect.analyzingTitle}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 text-stone-900" />
                    <span>{t.detect.analyzeBtn}</span>
                    <ArrowRight className="h-5 w-5 text-stone-900" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClear}
                disabled={isAnalyzing}
                className="rounded-full border border-stone-300 bg-white px-5 py-3.5 text-sm font-semibold text-stone-700 hover:bg-stone-50"
              >
                {t.detect.removeBtn}
              </button>
            </div>
          </div>
        ) : (
          /* Empty upload state */
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-3xl bg-forest-100 text-forest-700 mb-4 shadow-soft">
              <Upload className="h-8 w-8 sm:h-10 sm:w-10 animate-bounce duration-1000" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-stone-900">
              {t.detect.uploadAreaTitle}
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-stone-500 max-w-sm">
              {t.detect.uploadAreaSubtitle}
            </p>

            {/* Main Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-full bg-forest-800 px-6 py-3 text-sm font-semibold text-white shadow-soft hover:bg-forest-900 hover:scale-102 active:scale-98 transition"
              >
                <ImageIcon className="h-4 w-4" />
                <span>{t.detect.browseFiles}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCameraOpen(true)}
                className="inline-flex items-center gap-2 rounded-full border border-forest-300 bg-white px-6 py-3 text-sm font-semibold text-forest-900 shadow-xs hover:bg-forest-50 hover:border-forest-500 transition"
              >
                <Camera className="h-4 w-4 text-forest-700" />
                <span>{t.detect.takePhoto}</span>
              </button>
            </div>

            {/* Photo Tips */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
              <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-50 rounded-xl px-3 py-2 border border-stone-100">
                <Leaf className="w-3.5 h-3.5 text-forest-600 shrink-0" />
                <span>Focus on the affected leaf</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-50 rounded-xl px-3 py-2 border border-stone-100">
                <Sparkles className="w-3.5 h-3.5 text-harvest-500 shrink-0" />
                <span>Use good natural lighting</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-50 rounded-xl px-3 py-2 border border-stone-100">
                <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Photos stay on your device</span>
              </div>
            </div>
          </div>
        )}

        {/* Error notification */}
        {errorMessage && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-2xl border border-red-200 max-w-md mx-auto">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Test Sample Leaf Gallery */}
      <div className="rounded-3xl bg-white/80 p-5 sm:p-6 border border-stone-200 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-forest-600" />
            <h4 className="text-xs sm:text-sm font-bold text-stone-800 uppercase tracking-wider">
              {t.detect.sampleImagesPrompt}
            </h4>
          </div>
          <span className="text-[11px] text-stone-600 font-medium hidden sm:inline">
            Click any leaf to test diagnosis
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {sampleLeaves.map((leaf) => {
            const isSelected = activeSampleId === leaf.id;
            return (
              <button
                key={leaf.id}
                type="button"
                onClick={() => handleSelectSample(leaf)}
                className={`group relative flex flex-col items-center rounded-2xl p-2 text-left transition border ${
                  isSelected
                    ? 'border-forest-600 bg-forest-50 ring-2 ring-forest-500 shadow-sm'
                    : 'border-stone-200 bg-white hover:border-forest-300 hover:shadow-xs'
                }`}
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-2 bg-stone-100">
                  <img
                    src={leaf.imageUrl}
                    alt={leaf.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 right-1 rounded-md bg-black/60 px-1.5 py-0.5 text-[9px] font-semibold text-white backdrop-blur-xs">
                    {leaf.crop}
                  </span>
                </div>
                <div className="w-full">
                  <div className="text-xs font-bold text-stone-900 truncate leading-tight">
                    {leaf.name}
                  </div>
                  <div className="text-[10px] text-stone-500 truncate mt-0.5">
                    {leaf.condition}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Camera Modal */}
      <CameraCaptureModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(dataUrl) => {
          setActiveSampleId(null);
          onImageSelected(dataUrl);
        }}
      />
    </div>
  );
};
