import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { LanguageSelector } from './LanguageSelector';
import { 
  Sprout, 
  ScanLine, 
  BookOpen, 
  CloudSun, 
  History, 
  Info, 
  PhoneCall, 
  Menu, 
  X,
  Sparkles,
  Megaphone,
  XCircle,
  Sun,
  Moon
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { t } = useLanguage();
  const { theme, toggleTheme, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const navLinks = [
    { id: 'home', label: t.nav.home, icon: Sprout },
    { id: 'detect', label: t.nav.detect, icon: ScanLine, highlight: true },
    { id: 'guide', label: t.nav.guide, icon: BookOpen },
    { id: 'weather', label: t.nav.weather, icon: CloudSun },
    { id: 'history', label: t.nav.history, icon: History },
    { id: 'about', label: t.nav.about, icon: Info },
    { id: 'contact', label: t.nav.contact, icon: PhoneCall },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Announcement Banner */}
      {showAnnouncement && (
        <div className="relative bg-gradient-to-r from-forest-900 via-forest-800 to-emerald-900 text-white text-center py-2 px-4 text-xs sm:text-sm font-medium animate-slide-down z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <Megaphone className="w-3.5 h-3.5 text-harvest-400 shrink-0" />
            <span>
              🌾 <strong>Hacktoberfest 2026:</strong> CropCare AI now supports <strong>10+ crops</strong> with real-time disease detection!
            </span>
            <button
              onClick={() => setShowAnnouncement(false)}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition"
              aria-label="Dismiss announcement"
            >
              <XCircle className="w-4 h-4 text-stone-300 hover:text-white" />
            </button>
          </div>
        </div>
      )}

    <header className="sticky top-0 z-40 w-full border-b border-forest-100 dark:border-forest-900 bg-cream/95 dark:bg-[#0f1a12]/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          
          {/* Brand Logo & Tagline */}
          <button 
            type="button" 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none"
          >
            <div className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-forest-900 text-white shadow-soft transition-transform group-hover:scale-105">
              <Sprout className="h-6 w-6 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-harvest-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-harvest"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-forest-950 dark:text-emerald-100">
                  CropCare <span className="text-forest-600 dark:text-emerald-400 font-extrabold">AI</span>
                </span>
                <span className="hidden sm:inline-flex items-center rounded-full bg-harvest-100 dark:bg-harvest-900/40 px-2 py-0.5 text-[10px] font-semibold text-harvest-800 dark:text-harvest-300 border border-harvest-200 dark:border-harvest-700">
                  <Sparkles className="w-2.5 h-2.5 mr-0.5 text-harvest-600 dark:text-harvest-400" /> Free for Farmers
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 font-medium tracking-tight -mt-0.5 hidden xs:block">
                {t.tagline}
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              
              if (item.highlight) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs xl:text-sm font-semibold transition shadow-sm ${
                      isActive 
                        ? 'bg-harvest-500 text-stone-900 ring-2 ring-harvest-400' 
                        : 'bg-harvest-400 text-stone-900 hover:bg-harvest-500 hover:shadow'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 xl:px-3.5 py-1.5 text-xs xl:text-sm font-medium transition ${
                    isActive
                      ? 'bg-forest-100 dark:bg-forest-900/60 text-forest-950 dark:text-emerald-200 font-semibold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-forest-50 dark:hover:bg-forest-900/40 hover:text-forest-900 dark:hover:text-emerald-200'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-forest-700 dark:text-emerald-400' : 'text-stone-500 dark:text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right side controls: Theme toggle, Language switcher & Mobile Menu toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`
                relative inline-flex items-center justify-center w-10 h-10 rounded-full
                border transition-all duration-300 group
                ${isDark
                  ? 'bg-indigo-950 border-indigo-700 hover:bg-indigo-900 hover:border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                  : 'bg-amber-50 border-amber-200 hover:bg-amber-100 hover:border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                }
              `}
            >
              {/* Sun icon for light mode */}
              <Sun
                className={`
                  absolute h-4 w-4 text-amber-500 transition-all duration-500
                  ${isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}
                `}
              />
              {/* Moon icon for dark mode */}
              <Moon
                className={`
                  absolute h-4 w-4 text-indigo-300 transition-all duration-500
                  ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}
                `}
              />
            </button>

            <LanguageSelector />

            {/* Mobile Detect Button shortcut */}
            <button
              onClick={() => handleNavClick('detect')}
              className="lg:hidden inline-flex items-center gap-1 rounded-full bg-harvest-400 px-3 py-1.5 text-xs font-semibold text-stone-900 shadow-sm hover:bg-harvest-500"
            >
              <ScanLine className="h-3.5 w-3.5" />
              <span>{t.nav.detect}</span>
            </button>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center rounded-xl p-2 text-forest-900 dark:text-emerald-300 hover:bg-forest-100 dark:hover:bg-forest-900/50 focus:outline-none focus:ring-2 focus:ring-forest-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-forest-100 dark:border-forest-800 bg-white/95 dark:bg-[#0f1a12]/98 px-4 pt-3 pb-6 shadow-lifted animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-forest-900 text-white font-semibold shadow-sm'
                      : item.highlight
                      ? 'bg-harvest-100 dark:bg-harvest-900/30 text-harvest-950 dark:text-harvest-200 font-semibold'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-forest-50 dark:hover:bg-forest-900/40 hover:text-forest-900 dark:hover:text-emerald-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${isActive ? 'text-emerald-400' : 'text-forest-700 dark:text-emerald-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && !isActive && (
                    <span className="rounded-full bg-harvest-400 px-2 py-0.5 text-[10px] font-bold text-stone-900 uppercase">
                      AI Scan
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Helpline inside Mobile Drawer */}
          <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between px-2 text-xs text-stone-600 dark:text-stone-400">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-forest-700 dark:text-emerald-500" /> Kisan Helpline: <strong>1800-180-1551</strong>
            </span>
            <span className="text-[11px] text-forest-700 dark:text-emerald-400 font-semibold">Toll-Free 24x7</span>
          </div>
        </div>
      )}
    </header>
    </>
  );
};
