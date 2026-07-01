import React from 'react';
import { Phone, Calendar, Star, Sparkles, Award, Shield, Heart } from 'lucide-react';
import { motion } from 'motion/react';
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
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.5, 0.4]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute -top-40 -right-40 -z-10 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.6, 0.5]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1 
        }}
        className="absolute top-1/2 -left-40 -z-10 h-96 w-96 rounded-full bg-slate-100/50 blur-3xl" 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Hero Text Content */}
          <div className="space-y-6 lg:col-span-7">
            {/* Trust Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-800 uppercase shadow-xs cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
              <span>{t.heroBadge}</span>
            </motion.div>

            {/* Display Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6.5xl leading-tight"
            >
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
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl text-base text-slate-500 sm:text-lg md:text-xl font-normal leading-relaxed font-sans"
            >
              {t.heroSub}
            </motion.p>

            {/* Star Rating Info */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xs max-w-lg cursor-default"
            >
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400 animate-pulse" />
                <span className="font-bold text-slate-800 text-base">4.8</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-600">
                <div className="font-bold text-slate-900">{t.heroRatingText}</div>
                <div className="text-slate-400 font-medium">{language === 'en' ? "531+ verified Google Business ratings" : "गूगल पर 531+ सत्यापित मरीजों की रेटिंग"}</div>
              </div>
            </motion.div>

            {/* Buttons Row */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={() => onNavigate('book')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white px-8 py-4 text-base font-bold shadow-xl shadow-slate-200/50 hover:bg-slate-800 transition duration-200 ease-in-out cursor-pointer active:scale-95"
              >
                <Calendar className="h-5 w-5 text-blue-400" />
                <span>{t.heroBookBtn}</span>
              </button>
              <a
                href="tel:+917714050625"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition duration-200 ease-in-out cursor-pointer active:scale-95"
              >
                <Phone className="h-5 w-5 text-rose-600 animate-bounce" />
                <span>{t.heroEmergencyCall}</span>
              </a>
            </motion.div>
          </div>

          {/* Side Graphic Card Area with 3D Float and Tilt Hover */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 60 }}
              whileHover={{ 
                y: -10,
                rotateX: 3,
                rotateY: -3,
                scale: 1.02,
                boxShadow: "0 35px 70px rgba(59, 130, 246, 0.15)"
              }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl lg:p-8 transition-shadow duration-300"
            >
              {/* Top Bar Decoration */}
              <div className="absolute top-0 inset-x-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-blue-500 to-indigo-600" />

              <h3 className="text-lg font-extrabold text-slate-900 mb-6 flex items-center gap-2 tracking-tight">
                <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
                <span>{language === 'en' ? 'Quick Access Services' : 'त्वरित पहुंच सेवाएं'}</span>
              </h3>

              <div className="space-y-4">
                {/* Item 1 */}
                <motion.div 
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition duration-150"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">{language === 'en' ? 'Safe & Hygienic Delivery' : 'सुरक्षित और स्वच्छ प्रसव'}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium leading-normal">
                      {language === 'en' ? 'Private labor suites with obstetric backup.' : 'स्त्री रोग विशेषज्ञ सहायता के साथ निजी लेबर सुइट्स।'}
                    </p>
                  </div>
                </motion.div>

                {/* Item 2 */}
                <motion.div 
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition duration-150"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">{language === 'en' ? 'Expert Pediatrics & NICU' : 'विशेषज्ञ बाल चिकित्सा और एनआईसीयू'}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium leading-normal">
                      {language === 'en' ? 'Premium incubator units & neonatal care.' : 'प्रीमियम इनक्यूबेटर इकाइयां और नवजात शिशुओं की देखभाल।'}
                    </p>
                  </div>
                </motion.div>

                {/* Item 3 */}
                <motion.div 
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition duration-150"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600 border border-rose-100">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">{language === 'en' ? '24 Hours Emergency Care' : '24 घंटे आपातकालीन चिकित्सा'}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium leading-normal">
                      {language === 'en' ? 'Full resident specialist coverage day & night.' : 'दिन-रात पूर्ण रेजिडेंट विशेषज्ञ डॉक्टरों की उपस्थिति।'}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Promo Stats Banner */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{language === 'en' ? 'Location' : 'स्थान'}</div>
                  <div className="text-sm font-bold text-slate-700">Shivanand Nagar, Raipur</div>
                </div>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group cursor-pointer"
                >
                  <span>{language === 'en' ? 'View Map' : 'नक्शा देखें'}</span>
                  <span className="group-hover:translate-x-1 transition-transform font-bold">→</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Counter Stats Grid with Staggered Slide In */}
        <div id="hero-stats-grid" className="mt-16 sm:mt-20 border-t border-slate-200/60 pt-10">
          <div className="grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-4 text-center">
            {[
              { val: "15+", label: t.heroStatsYears },
              { val: "25K+", label: t.heroStatsPatients },
              { val: "12+", label: t.heroStatsDoctors },
              { val: "530+", label: t.heroStatsReviews }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="space-y-1 cursor-default"
              >
                <p className="text-4xl font-normal text-blue-600 font-serif">{stat.val}</p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
