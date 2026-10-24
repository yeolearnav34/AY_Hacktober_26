import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { Sprout, PhoneCall, ShieldCheck, Heart, ExternalLink, MapPin, Mail, Send, CheckCircle2, Sparkles } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNav = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-forest-100 bg-forest-950 text-stone-300 transition-colors">
      
      {/* Newsletter / Seasonal Alerts CTA */}
      <div className="bg-gradient-to-r from-forest-900 via-emerald-900 to-forest-900 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-harvest-400/20 text-harvest-300 border border-harvest-400/30 text-xs font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>Seasonal Crop Alerts</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Get Disease Alerts Before They Strike
              </h3>
              <p className="text-sm text-stone-400 max-w-lg">
                Subscribe to receive seasonal crop disease warnings, spray schedules, and IPM advisories tailored to your region — completely free.
              </p>
            </div>
            <div className="w-full lg:w-auto lg:min-w-[360px]">
              {subscribed ? (
                <div className="flex items-center gap-3 justify-center lg:justify-start p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/30">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  <div>
                    <div className="text-sm font-bold text-white">You're subscribed!</div>
                    <div className="text-xs text-emerald-300">We'll send you seasonal alerts at harvest time.</div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email.trim()) setSubscribed(true);
                  }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-5 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-harvest-400 focus:border-transparent backdrop-blur-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-harvest-400 hover:bg-harvest-500 text-stone-950 font-bold text-sm transition shadow-soft whitespace-nowrap"
                  >
                    <Send className="w-4 h-4" />
                    <span>Subscribe Free</span>
                  </button>
                </form>
              )}
              <p className="mt-2 text-[11px] text-stone-500 text-center lg:text-left">
                🔒 No spam, ever. Unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-forest-900/80">
          
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-soft">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-white">
                  CropCare <span className="text-emerald-400 font-extrabold">AI</span>
                </span>
                <p className="text-xs text-emerald-300 font-medium">{t.tagline}</p>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              {t.footer.desc} Designed specifically for Indian smallholder farmers, combining high-precision computer vision with official Integrated Pest Management (IPM).
            </p>

            <div className="pt-2">
              <LanguageSelector />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="text-stone-400 hover:text-emerald-400 transition">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('detect')} className="text-stone-400 hover:text-emerald-400 transition font-medium text-emerald-300">
                  {t.nav.detect}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('guide')} className="text-stone-400 hover:text-emerald-400 transition">
                  {t.nav.guide}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('weather')} className="text-stone-400 hover:text-emerald-400 transition">
                  {t.nav.weather}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('history')} className="text-stone-400 hover:text-emerald-400 transition">
                  {t.nav.history}
                </button>
              </li>
            </ul>
          </div>

          {/* Government Helplines */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              {t.footer.helpline}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="rounded-2xl bg-forest-900/60 p-3.5 border border-forest-800">
                <div className="flex items-center gap-2 text-harvest-400 font-semibold text-xs">
                  <PhoneCall className="w-3.5 h-3.5" /> Kisan Call Center (Toll Free)
                </div>
                <a 
                  href="tel:18001801551" 
                  className="mt-1 block text-lg font-bold text-white hover:text-harvest-300 transition"
                >
                  1800-180-1551
                </a>
                <div className="text-[11px] text-stone-400 mt-0.5">
                  6:00 AM – 10:00 PM • 22 Indian Languages
                </div>
              </div>

              <div className="text-xs text-stone-400 space-y-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>731+ Krishi Vigyan Kendras (KVK) Nationwide</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>support@cropcare-ai.org.in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Legal, Trust & Ethics */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Trust & Transparency
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('about')} className="text-stone-400 hover:text-emerald-400 transition">
                  Responsible AI Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy')} className="text-stone-400 hover:text-emerald-400 transition">
                  {t.footer.privacy}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="text-stone-400 hover:text-emerald-400 transition">
                  {t.nav.contact}
                </button>
              </li>
              <li>
                <a 
                  href="https://kisansuvidha.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-stone-400 hover:text-emerald-400 transition text-xs"
                >
                  <span>Kisan Suvidha Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Bar */}
        <div className="pt-8 pb-4 text-xs text-stone-400 leading-relaxed border-b border-forest-900/60 flex flex-col md:flex-row items-start md:items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 md:mt-0" />
          <p>
            <strong>Agricultural Disclaimer:</strong> {t.disclaimer.text}
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
          <p className="flex items-center gap-1 text-stone-400">
            Dedicated with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> to India’s Annadatas (Farmers)
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
};
