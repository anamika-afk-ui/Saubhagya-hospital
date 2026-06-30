import React from 'react';
import { Phone, Calendar, Star, Sparkles, Award, Shield, Heart } from 'lucide-react';
import { Language, translations } from '../types';

interface HeroProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export default function Hero({ language, onNavigate }: HeroProps) {
  const t = translations[language];

  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/20 to-white py-16 lg:py-24">
      {/* Absolute Decorative Blobs */}
      <div className="absolute -top-40 -right-40 -z-10 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="absolute top-1/2 -left-40 -z-10 h-96 w-96 rounded-full bg-slate-100/50 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Hero Text Content */}
          <div className="space-y-6 lg:col-span-7">
            {/* Trust Badge */}
            <div id="hero-trust-badge" className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-800 uppercase shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Display Heading */}
            <h1 id="hero-headline" className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6.5xl leading-tight">
              {language === 'en' ? (
                <>
                  Excellence in <br />
                  <span className="text-blue-600 italic font-serif font-normal">Patient Care.</span>
                </>
              ) : (
                <>
                  विशेषज्ञ चिकित्सा सेवा, <br />
                  <span className="text-blue-600 italic font-serif font-normal">संवेदनशील उपचार।</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p id="hero-subtitle" className="max-w-2xl text-base text-slate-500 sm:text-lg md:text-xl font-normal leading-relaxed font-sans">
              {t.heroSub}
            </p>

            {/* Star Rating Info */}
            <div id="hero-rating" className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs max-w-lg">
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-800 text-base">4.8</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-600">
                <div className="font-bold text-slate-900">{t.heroRatingText}</div>
                <div className="text-slate-400 font-medium">{language === 'en' ? "531+ verified Google Business ratings" : "गूगल पर 531+ सत्यापित मरीजों की रेटिंग"}</div>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="hero-book-btn"
                onClick={() => onNavigate('book')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white px-8 py-4 text-base font-bold shadow-xl shadow-slate-200/50 hover:bg-slate-800 transition duration-150 ease-in-out cursor-pointer active:scale-95"
              >
                <Calendar className="h-5 w-5 text-blue-400" />
                <span>{t.heroBookBtn}</span>
              </button>
              <a
                id="hero-emergency-btn"
                href="tel:+917714050625"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 hover:bg-slate-50 transition duration-150 ease-in-out cursor-pointer active:scale-95"
              >
                <Phone className="h-5 w-5 text-rose-600 animate-bounce" />
                <span>{t.heroEmergencyCall}</span>
              </a>
            </div>
          </div>

          {/* Side Graphic Card Area */}
          <div className="lg:col-span-5">
            <div id="hero-visual-card" className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl lg:p-8">
              {/* Top Bar Decoration */}
              <div className="absolute top-0 inset-x-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-blue-500 to-indigo-600" />

              <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2 tracking-tight">
                <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                <span>{language === 'en' ? 'Quick Access Services' : 'त्वरित पहुंच सेवाएं'}</span>
              </h3>

              <div className="space-y-4">
                {/* Item 1 */}
                <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">{language === 'en' ? 'Safe & Hygienic Delivery' : 'सुरक्षित और स्वच्छ प्रसव'}</h4>
                    <p className="text-xs text-slate-450 mt-0.5 font-medium leading-normal">
                      {language === 'en' ? 'Private labor suites with obstetric backup.' : 'स्त्री रोग विशेषज्ञ सहायता के साथ निजी लेबर सुइट्स।'}
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">{language === 'en' ? 'Expert Pediatrics & NICU' : 'विशेषज्ञ बाल चिकित्सा और एनआईसीयू'}</h4>
                    <p className="text-xs text-slate-450 mt-0.5 font-medium leading-normal">
                      {language === 'en' ? 'Premium incubator units & neonatal care.' : 'प्रीमियम इनक्यूबेटर इकाइयां और नवजात शिशुओं की देखभाल।'}
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600 border border-rose-100">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">{language === 'en' ? '24 Hours Emergency Care' : '24 घंटे आपातकालीन चिकित्सा'}</h4>
                    <p className="text-xs text-slate-450 mt-0.5 font-medium leading-normal">
                      {language === 'en' ? 'Full resident specialist coverage day & night.' : 'दिन-रात पूर्ण रेजिडेंट विशेषज्ञ डॉक्टरों की उपस्थिति।'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Promo Stats Banner */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{language === 'en' ? 'Location' : 'स्थान'}</div>
                  <div className="text-sm font-bold text-slate-700">Shivanand Nagar, Raipur</div>
                </div>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group"
                >
                  <span>{language === 'en' ? 'View Map' : 'नक्शा देखें'}</span>
                  <span className="group-hover:translate-x-1 transition-transform font-bold">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Counter Stats Grid */}
        <div id="hero-stats-grid" className="mt-16 sm:mt-20 border-t border-slate-200/60 pt-10">
          <div className="grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-4 text-center">
            <div className="space-y-1">
              <p className="text-4xl font-normal text-blue-600 font-serif">15+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">{t.heroStatsYears}</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-normal text-blue-600 font-serif">25K+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">{t.heroStatsPatients}</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-normal text-blue-600 font-serif">12+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">{t.heroStatsDoctors}</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-normal text-blue-600 font-serif">530+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">{t.heroStatsReviews}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
