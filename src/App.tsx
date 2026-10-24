import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeHero } from './components/HomeHero';
import { ImageUploader } from './components/ImageUploader';
import { ResultCard } from './components/ResultCard';
import { CropGuideView } from './components/CropGuideView';
import { WeatherView } from './components/WeatherView';
import { ScanHistoryView } from './components/ScanHistoryView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { PrivacyPolicyView } from './components/PrivacyPolicyView';
import { analyzeCropLeaf } from './services/aiInference';
import { saveLocalScan } from './services/storageService';
import { CropScanResult } from './types';
import { AlertCircle, Loader2 } from 'lucide-react';

const MainApp: React.FC = () => {
  const { t } = useLanguage();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeSampleHint, setActiveSampleHint] = useState<string | undefined>(undefined);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<CropScanResult | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [selectedCropIdForGuide, setSelectedCropIdForGuide] = useState<string | null>(null);

  const handleImageSelected = (imageDataUrl: string, sampleHintId?: string) => {
    setSelectedImage(imageDataUrl);
    setActiveSampleHint(sampleHintId);
    setAnalysisResult(null);
    setAnalysisError(null);
    setIsSaved(false);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setActiveSampleHint(undefined);
    setAnalysisResult(null);
    setAnalysisError(null);
    setIsSaved(false);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const result = await analyzeCropLeaf(selectedImage, activeSampleHint);
      setAnalysisResult(result);

      // Automatically persist to local scan history
      await saveLocalScan(result, selectedImage);
      setIsSaved(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setAnalysisError(err?.message || 'Failed to analyze crop image. Please verify file quality and retry.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleScanAnother = () => {
    setAnalysisResult(null);
    setSelectedImage(null);
    setActiveSampleHint(undefined);
    setAnalysisError(null);
    setIsSaved(false);
    setCurrentTab('detect');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewScanFromHistory = (result: CropScanResult) => {
    setAnalysisResult(result);
    setSelectedImage(result.imageUrl || null);
    setIsSaved(true);
    setCurrentTab('detect');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCropToScan = (_cropName: string) => {
    setAnalysisResult(null);
    setSelectedImage(null);
    setCurrentTab('detect');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreGuide = (cropId?: string) => {
    setSelectedCropIdForGuide(cropId || null);
    setCurrentTab('guide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream dark:bg-[#0f1a12] text-stone-800 dark:text-emerald-50 font-sans selection:bg-forest-100 selection:text-forest-900 dark:selection:bg-forest-900 dark:selection:text-emerald-100">
      
      {/* Sticky Top Navigation */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* Tab 1: Home */}
        {currentTab === 'home' && (
          <HomeHero
            onStartDetect={() => {
              setCurrentTab('detect');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreGuide={handleExploreGuide}
          />
        )}

        {/* Tab 2: Detect Disease */}
        {currentTab === 'detect' && (
          <div className="space-y-6 pb-16">
            
            {/* If analysis result is available, show the full result card */}
            {analysisResult ? (
              <ResultCard
                result={analysisResult}
                onScanAnother={handleScanAnother}
                isSaved={isSaved}
                onSaveToHistory={() => {
                  if (analysisResult) {
                    saveLocalScan(analysisResult, selectedImage || undefined);
                    setIsSaved(true);
                  }
                }}
              />
            ) : (
              <div className="space-y-6">
                
                {/* Error Banner if analysis failed */}
                {analysisError && (
                  <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs sm:text-sm flex items-start gap-3 shadow-soft">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Analysis Failed</strong>
                      <span>{analysisError}</span>
                    </div>
                  </div>
                )}

                {/* Image Uploader & Camera Capture Component */}
                <ImageUploader
                  onImageSelected={handleImageSelected}
                  onAnalyze={handleAnalyze}
                  isAnalyzing={isAnalyzing}
                  selectedImage={selectedImage}
                  onClear={handleClearImage}
                />
              </div>
            )}

          </div>
        )}

        {/* Tab 3: Crop Health Guide */}
        {currentTab === 'guide' && (
          <CropGuideView
            initialCropId={selectedCropIdForGuide}
            onSelectCropToScan={handleSelectCropToScan}
          />
        )}

        {/* Tab 4: Weather & Spray Advisory */}
        {currentTab === 'weather' && <WeatherView />}

        {/* Tab 5: Scan History */}
        {currentTab === 'history' && (
          <ScanHistoryView
            onViewScan={handleViewScanFromHistory}
            onNewScan={() => {
              setCurrentTab('detect');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Tab 6: About & Responsible AI */}
        {currentTab === 'about' && <AboutView />}

        {/* Tab 7: Support & Contact */}
        {currentTab === 'contact' && <ContactView />}

        {/* Tab 8: Privacy Policy */}
        {currentTab === 'privacy' && (
          <PrivacyPolicyView onBack={() => setCurrentTab('home')} />
        )}

      </main>

      {/* Footer */}
      <Footer setCurrentTab={setCurrentTab} />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
