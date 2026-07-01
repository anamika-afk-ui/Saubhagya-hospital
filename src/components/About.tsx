import React from 'react';
import { Shield, Heart, Activity, Award, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Language, translations } from '../types';

interface AboutProps {
  language: Language;
}

export default function About({ language }: AboutProps) {
  const t = translations[language];

  const features = [
    {
      title: t.aboutFeature1,
      description: t.aboutFeature1Sub,
      icon: Activity,
      color: "text-slate-800 bg-slate-50 border-slate-200",
    },
    {
      title: t.aboutFeature2,
      description: t.aboutFeature2Sub,
      icon: Heart,
      color: "text-rose-600 bg-rose-50 border-rose-100",
    },
    {
      title: t.aboutFeature3,
      description: t.aboutFeature3Sub,
      icon: Award,
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      title: t.aboutFeature4,
      description: t.aboutFeature4Sub,
      icon: Shield,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    }
  ];

  return (
    <section id="about-section" className="py-16 sm:py-24 bg-white border-t border-slate-200 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* About Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-[11px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50/70 px-3 py-1 rounded-full border border-blue-100"
          >
            {t.aboutBadge}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-3xl font-normal tracking-tight text-slate-900 sm:text-4xl font-serif"
          >
            {t.aboutTitle}
          </motion.h2>
          <div className="mt-4 h-[1px] w-16 bg-blue-500 mx-auto" />
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text Description */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <h3 className="text-2xl font-bold font-serif text-slate-800 leading-snug">
              {language === 'en' 
                ? "Your Health, Our Sacred Responsibility" 
                : "आपका स्वास्थ्य, हमारा पवित्र उत्तरदायित्व"
              }
            </h3>
            
            <p className="text-base text-slate-500 leading-relaxed font-normal font-sans">
              {t.aboutPara1}
            </p>

            <p className="text-base text-slate-500 leading-relaxed font-normal font-sans">
              {t.aboutPara2}
            </p>

            {/* In-hospital facilities list */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <h4 className="font-bold text-slate-400 text-xs tracking-wider uppercase">
                {language === 'en' ? "Our High Standards" : "हमारे उच्च मानक"}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  language === 'en' ? "Sterile Modular OT" : "संक्रमित-मुक्त मॉड्यूलर ओटी",
                  language === 'en' ? "Deluxe AC Patient Rooms" : "शानदार वातानुकूलित कमरे",
                  language === 'en' ? "Advanced Diagnostic Lab" : "उन्नत पैथोलॉजी लैब",
                  language === 'en' ? "24/7 Resident Doctors" : "24 घंटे रेजिडेंट डॉक्टर"
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-sm text-slate-600 font-medium"
                  >
                    <CheckCircle className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Interactive Feature Cards Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02, 
                    boxShadow: "0 25px 50px rgba(59, 130, 246, 0.08)",
                    borderColor: "rgb(191, 219, 254)" // blue-200
                  }}
                  className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 transition duration-300 cursor-default"
                >
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border mb-4 ${feat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800 mb-2 font-serif">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
                    {feat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Highlight Card with dynamic scroll slide up */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.15 }}
          className="mt-16 bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden"
        >
          <motion.div 
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full -mr-12 -mt-12" 
          />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-normal font-serif tracking-tight leading-tight">
                {language === 'en' ? "Looking for Raipur's Best Maternal Care?" : "रायपुर की सर्वश्रेष्ठ मातृत्व देखभाल की तलाश है?"}
              </h3>
              <p className="text-slate-300 text-sm font-normal">
                {language === 'en' 
                  ? "Saubhagya Hospital has helped welcome thousands of newborns into the world safely. Contact Dr. Rashmi Bhandari and her expert team for customizable, budget-friendly maternity packages."
                  : "सौभाग्य हॉस्पिटल ने दुनिया में हजारों नवजात शिशुओं का सुरक्षित स्वागत करने में मदद की है। बजट के अनुकूल मातृत्व पैकेजों के लिए डॉ. रश्मी भंडारी और उनकी टीम से संपर्क करें।"
                }
              </p>
            </div>
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              href="tel:+917714050625"
              className="px-6 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shrink-0 shadow-md text-center w-full md:w-auto cursor-pointer"
            >
              {language === 'en' ? "Call Now: 077140 50625" : "अभी कॉल करें: 077140 50625"}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
