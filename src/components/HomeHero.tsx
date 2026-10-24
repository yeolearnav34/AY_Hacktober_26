import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { cropKnowledgeBase } from '../data/cropKnowledge';
import { 
  ScanLine, 
  BookOpen, 
  ShieldCheck, 
  CloudSun, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  Cpu, 
  Leaf, 
  HeartHandshake,
  TrendingUp,
  AlertCircle,
  Star,
  Quote,
  Zap,
  Globe
} from 'lucide-react';

interface HomeHeroProps {
  onStartDetect: () => void;
  onExploreGuide: (cropId?: string) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onStartDetect, onExploreGuide }) => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. Hero Section with shimmer background */}
      <section className="relative overflow-hidden pt-6 sm:pt-12">
        {/* Background shimmer effect */}
        <div className="absolute inset-0 shimmer-bg rounded-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-fade-slide-up">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100/80 dark:bg-forest-900/60 border border-forest-200 dark:border-forest-700 text-forest-900 dark:text-emerald-300 text-xs sm:text-sm font-semibold shadow-xs">
                <span>{t.hero.badge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-forest-950 dark:text-emerald-50 leading-[1.15]">
                {t.hero.title}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-700 via-emerald-700 to-forest-900 dark:from-emerald-400 dark:via-green-300 dark:to-emerald-400 underline decoration-harvest-400 decoration-wavy decoration-4">
                  {t.hero.highlight}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t.hero.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={onStartDetect}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-harvest-400 hover:bg-harvest-500 text-stone-950 font-bold text-base shadow-soft hover:shadow-lifted transition-all transform hover:-translate-y-0.5 active:translate-y-0 cta-glow"
                >
                  <ScanLine className="w-5 h-5 text-stone-900" />
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <button
                  onClick={() => onExploreGuide()}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white dark:bg-forest-950/80 hover:bg-forest-50 dark:hover:bg-forest-900 text-forest-950 dark:text-emerald-200 font-semibold text-base border border-forest-200 dark:border-forest-700 transition shadow-xs"
                >
                  <BookOpen className="w-5 h-5 text-forest-700 dark:text-emerald-400" />
                  <span>{t.hero.ctaSecondary}</span>
                </button>
              </div>

              {/* Key Trust Stats */}
              <div className="pt-6 border-t border-forest-100 dark:border-forest-800 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="text-left">
                  <div className="text-xl sm:text-2xl font-extrabold text-forest-900 dark:text-emerald-300">10+</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">{t.hero.statsFarmers}</div>
                </div>
                <div className="text-left">
                  <div className="text-xl sm:text-2xl font-extrabold text-forest-900 dark:text-emerald-300">35+</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">{t.hero.statsCrops}</div>
                </div>
                <div className="text-left">
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">100% Free</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">{t.hero.statsAccuracy}</div>
                </div>
              </div>

            </div>

            {/* Right Column: High Quality Farm Image & Floating Cards */}
            <div className="lg:col-span-5 relative animate-fade-slide-up-delay-1">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Hero Visual */}
                <div className="relative rounded-3xl overflow-hidden shadow-lifted border-4 border-white aspect-[4/3] sm:aspect-square bg-forest-900">
                  <img
                    src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1000&q=80"
                    alt="Indian farmer inspecting healthy tomato crop in lush green agricultural field"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-black/20" />
                  
                  {/* Overlay Leaf Scan Target Graphic */}
                  <div className="absolute inset-8 sm:inset-12 border-2 border-dashed border-emerald-400/80 rounded-2xl flex items-center justify-center pointer-events-none">
                    <div className="px-3 py-1.5 rounded-full bg-forest-900/90 text-emerald-300 text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5 border border-emerald-400/40">
                      <Sparkles className="w-3.5 h-3.5 text-harvest-400 animate-spin" />
                      <span>AI Vision Sensor Active</span>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs sm:text-sm font-medium">
                    Smart farming diagnostic for Indian smallholders
                  </div>
                </div>

                {/* Floating Card 1: Instant AI Analysis */}
                <div className="absolute -top-4 -left-4 sm:-left-6 rounded-2xl bg-white dark:bg-[#1a2e1d] p-3.5 shadow-lifted border border-forest-100 dark:border-forest-800 flex items-center gap-3 animate-bounce-subtle max-w-[210px]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest-100 dark:bg-forest-900 text-forest-800">
                    <Cpu className="w-5 h-5 text-forest-700 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900 dark:text-emerald-100">AI Deep Vision</div>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">Ready for 10 Crops</div>
                  </div>
                </div>

                {/* Floating Card 2: Government Verified Guidance */}
                <div className="absolute -bottom-5 -right-3 sm:-right-4 rounded-2xl bg-white dark:bg-[#1a2e1d] p-3.5 shadow-lifted border border-forest-100 dark:border-forest-800 flex items-center gap-3 max-w-[230px]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-harvest-100 dark:bg-harvest-900/30 text-stone-900">
                    <ShieldCheck className="w-5 h-5 text-harvest-700 dark:text-harvest-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900 dark:text-emerald-100">ICAR & IPM Standard</div>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400">Neem & Organic First</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Three-Step "How It Works" Section */}
      <section className="bg-white dark:bg-[#111d14] py-14 border-y border-forest-100 dark:border-forest-900 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-wider text-forest-700 dark:text-emerald-400 font-bold">
              {t.howItWorks.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 dark:text-emerald-50">
              {t.howItWorks.title}
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-cream/60 dark:bg-[#1a2e1d]/60 border border-forest-100 dark:border-forest-800 space-y-3 hover:shadow-soft transition group">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-900 text-white font-extrabold text-sm">
                  1
                </span>
                <span className="text-xs font-semibold text-forest-600 dark:text-emerald-400">Step 1</span>
              </div>
              <h3 className="font-bold text-stone-900 dark:text-emerald-100 text-base">{t.howItWorks.step1Title}</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{t.howItWorks.step1Desc}</p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-cream/60 dark:bg-[#1a2e1d]/60 border border-forest-100 dark:border-forest-800 space-y-3 hover:shadow-soft transition group">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-900 text-white font-extrabold text-sm">
                  2
                </span>
                <span className="text-xs font-semibold text-forest-600 dark:text-emerald-400">Step 2</span>
              </div>
              <h3 className="font-bold text-stone-900 dark:text-emerald-100 text-base">{t.howItWorks.step2Title}</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{t.howItWorks.step2Desc}</p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-cream/60 dark:bg-[#1a2e1d]/60 border border-forest-100 dark:border-forest-800 space-y-3 hover:shadow-soft transition group">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest-900 text-white font-extrabold text-sm">
                  3
                </span>
                <span className="text-xs font-semibold text-forest-600 dark:text-emerald-400">Step 3</span>
              </div>
              <h3 className="font-bold text-stone-900 dark:text-emerald-100 text-base">{t.howItWorks.step3Title}</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{t.howItWorks.step3Desc}</p>
            </div>

            {/* Step 4 */}
            <div className="relative p-6 rounded-2xl bg-cream/60 dark:bg-[#1a2e1d]/60 border border-forest-100 dark:border-forest-800 space-y-3 hover:shadow-soft transition group">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-harvest-500 text-stone-950 font-extrabold text-sm">
                  4
                </span>
                <span className="text-xs font-semibold text-harvest-800 dark:text-harvest-400">Step 4</span>
              </div>
              <h3 className="font-bold text-stone-900 dark:text-emerald-100 text-base">{t.howItWorks.step4Title}</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{t.howItWorks.step4Desc}</p>
            </div>

          </div>

          <div className="mt-8 text-center">
            <button
              onClick={onStartDetect}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-900 dark:bg-emerald-800 text-white text-xs sm:text-sm font-semibold hover:bg-forest-800 dark:hover:bg-emerald-700 transition shadow-sm"
            >
              <ScanLine className="w-4 h-4 text-emerald-400" />
              <span>Try With Sample Leaves or Your Own Photo &rarr;</span>
            </button>
          </div>

        </div>
      </section>

      {/* 3. Core Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-wider text-forest-700 dark:text-emerald-400 font-bold">
            {t.features.tag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 dark:text-emerald-50">
            {t.features.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a2e1d] border border-forest-100 dark:border-forest-800 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-forest-100 dark:bg-forest-900 text-forest-800 flex items-center justify-center">
              <ScanLine className="w-6 h-6 text-forest-700 dark:text-emerald-400" />
            </div>
            <h3 className="font-bold text-stone-900 dark:text-emerald-100 text-base">{t.features.f1Title}</h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{t.features.f1Desc}</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a2e1d] border border-forest-100 dark:border-forest-800 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 flex items-center justify-center">
              <Leaf className="w-6 h-6 text-emerald-700 dark:text-emerald-400" />
            </div>
            <h3 className="font-bold text-stone-900 dark:text-emerald-100 text-base">{t.features.f2Title}</h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{t.features.f2Desc}</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a2e1d] border border-forest-100 dark:border-forest-800 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-800 flex items-center justify-center">
              <CloudSun className="w-6 h-6 text-amber-700 dark:text-amber-400" />
            </div>
            <h3 className="font-bold text-stone-900 dark:text-emerald-100 text-base">{t.features.f3Title}</h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{t.features.f3Desc}</p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#1a2e1d] border border-forest-100 dark:border-forest-800 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-800 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6 text-purple-700 dark:text-purple-400" />
            </div>
            <h3 className="font-bold text-stone-900 dark:text-emerald-100 text-base">{t.features.f4Title}</h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">{t.features.f4Desc}</p>
          </div>

        </div>
      </section>

      {/* 4. Supported Crops Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-forest-700 dark:text-emerald-400 font-bold">
              {t.crops.tag}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 dark:text-emerald-50 mt-1">
              {t.crops.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
              {t.crops.subtitle}
            </p>
          </div>

          <button
            onClick={() => onExploreGuide()}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-forest-800 dark:text-emerald-400 hover:text-forest-950 dark:hover:text-emerald-300 underline self-start sm:self-auto"
          >
            <span>View All Disease Guides</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {cropKnowledgeBase.map((crop) => {
            const cropName = language === 'hi' ? `${crop.cropHindi} (${crop.crop})` : language === 'mr' ? `${crop.cropMarathi} (${crop.crop})` : crop.crop;
            return (
              <button
                key={crop.id}
                onClick={() => onExploreGuide(crop.id)}
                className="group p-3 rounded-2xl bg-white dark:bg-[#1a2e1d] border border-forest-100 dark:border-forest-800 shadow-xs hover:shadow-soft hover:border-forest-300 dark:hover:border-forest-600 transition text-left flex flex-col justify-between overflow-hidden"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-2.5">
                  <img
                    src={crop.imageUrl}
                    alt={crop.crop}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-stone-900 dark:text-emerald-100 group-hover:text-forest-800 dark:group-hover:text-emerald-300 transition">
                    {cropName}
                  </h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 italic truncate">{crop.scientificName}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-forest-700 dark:text-emerald-400 font-semibold">
                    <span>{crop.commonDiseases.length} Major Diseases</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. Farmer Testimonials & Social Proof */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-wider text-forest-700 dark:text-emerald-400 font-bold">
            Trusted by Farmers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950 dark:text-emerald-50">
            What Our Farming Community Says
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Real stories from farmers across India who use CropCare AI to protect their harvests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Testimonial 1 */}
          <div className="relative p-6 rounded-3xl bg-white dark:bg-[#1a2e1d] border border-forest-100 dark:border-forest-800 shadow-soft space-y-4 animate-fade-slide-up">
            <Quote className="w-8 h-8 text-forest-200 dark:text-forest-700" />
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic">
              "CropCare AI detected early blight on my tomato plants before I could even see it. The treatment recommendations saved my entire crop this season."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forest-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                RK
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900 dark:text-emerald-100">Rajesh Kumar</div>
                <div className="text-xs text-stone-500 dark:text-stone-400">Tomato Farmer, Maharashtra</div>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3.5 h-3.5 text-harvest-400 fill-harvest-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="relative p-6 rounded-3xl bg-white dark:bg-[#1a2e1d] border border-forest-100 dark:border-forest-800 shadow-soft space-y-4 animate-fade-slide-up-delay-1">
            <Quote className="w-8 h-8 text-forest-200 dark:text-forest-700" />
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic">
              "I used to lose 30% of my potato harvest to late blight. With CropCare AI's early detection and organic treatment suggestions, my losses dropped to almost zero."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-harvest-400 to-amber-600 flex items-center justify-center text-white font-bold text-sm">
                PD
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900 dark:text-emerald-100">Priya Devi</div>
                <div className="text-xs text-stone-500 dark:text-stone-400">Potato Farmer, Uttar Pradesh</div>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3.5 h-3.5 text-harvest-400 fill-harvest-400" />
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="relative p-6 rounded-3xl bg-white dark:bg-[#1a2e1d] border border-forest-100 dark:border-forest-800 shadow-soft space-y-4 animate-fade-slide-up-delay-2">
            <Quote className="w-8 h-8 text-forest-200 dark:text-forest-700" />
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic">
              "The weather advisory feature helps me plan spray schedules perfectly. It's like having an agronomist in my pocket — and it's free!"
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                AS
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900 dark:text-emerald-100">Anand Singh</div>
                <div className="text-xs text-stone-500 dark:text-stone-400">Rice & Wheat Farmer, Punjab</div>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3.5 h-3.5 text-harvest-400 fill-harvest-400" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges row */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-medium">
            <Zap className="w-4 h-4 text-harvest-500" />
            <span>Instant AI Results</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-forest-600 dark:text-emerald-500" />
            <span>ICAR & IPM Verified</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-medium">
            <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Available in 3 Languages</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 font-medium">
            <HeartHandshake className="w-4 h-4 text-purple-500 dark:text-purple-400" />
            <span>100% Free for Farmers</span>
          </div>
        </div>
      </section>

      {/* 6. Indian Farmer Advisory & Helpline Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800 text-white p-6 sm:p-10 shadow-lifted relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Free Government Agricultural Extension</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Need Instant Expert Advice in Your Local Dialect?
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed max-w-2xl">
                CropCare AI is designed to support farmers immediately in the field. When symptoms are widespread, you can also dial the official National Kisan Call Center toll-free to speak directly with an agronomist in your state language.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="tel:18001801551"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-harvest-400 text-stone-950 font-bold text-sm hover:bg-harvest-500 transition shadow-soft"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call 1800-180-1551 (Toll-Free)</span>
                </a>
                <span className="text-xs text-stone-400">
                  Open 6:00 AM – 10:00 PM • 22 Indian Languages
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-xs space-y-3">
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-harvest-400" />
                <span>Safe Agricultural Practices</span>
              </div>
              <p className="text-stone-300 leading-relaxed">
                • Never mix unrecommended fungicides without official compatibility charts.
              </p>
              <p className="text-stone-300 leading-relaxed">
                • Always follow pre-harvest intervals (PHI) to prevent harmful pesticide residues on vegetables.
              </p>
              <p className="text-stone-300 leading-relaxed">
                • Consult local Krishi Vigyan Kendra (KVK) for soil testing and spore culture verification.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
