import React from 'react';
import { Phone, Mail, MapPin, Clock, ExternalLink, ShieldAlert, Heart } from 'lucide-react';
import { Language, translations } from '../types';

interface ContactProps {
  language: Language;
}

export default function Contact({ language }: ContactProps) {
  const t = translations[language];

  // Map link to redirect users to real directions
  const mapSearchUrl = "https://www.google.com/maps/search/?api=1&query=Saubhagya+Hospital+Sector+1+Saptgiri+Colony+Shivanand+Nagar+Raipur+Chhattisgarh+492008";

  return (
    <section id="contact-section" className="py-16 sm:py-24 bg-slate-50/50 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            {t.contactBadge}
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {t.contactTitle}
          </h2>
          <p className="mt-4 text-base text-slate-500 font-normal max-w-2xl mx-auto">
            {t.contactSubtitle}
          </p>
          <div className="mt-4 h-1 w-20 bg-teal-500 mx-auto rounded-full" />
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contact details list (5 cols) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">
                {language === 'en' ? 'Saubhagya Hospital Raipur' : 'सौभाग्य हॉस्पिटल रायपुर'}
              </h3>

              {/* Phone item */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{t.contactPhone}</h4>
                  <p className="text-base font-bold text-slate-900 mt-1">
                    <a href="tel:+917714050625" className="hover:text-teal-600 transition">077140 50625</a>
                  </p>
                  <p className="text-sm text-slate-600 mt-0.5">
                    <a href="tel:+917714050625" className="hover:text-teal-600 transition">+91 77140 50625</a>
                  </p>
                </div>
              </div>

              {/* Address item */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{t.contactAddress}</h4>
                  <p className="text-sm sm:text-base font-semibold text-slate-800 mt-1 leading-relaxed">
                    Sector 1, Saptgiri Colony, Shivanand Nagar, Raipur, Chhattisgarh 492008
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {language === 'en' ? 'Behind Shivanand Nagar Main Ground' : 'शिवानंद नगर मुख्य मैदान के पीछे'}
                  </p>
                </div>
              </div>

              {/* Hours item */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{t.contactHours}</h4>
                  <p className="text-sm sm:text-base font-bold text-slate-850 mt-1">
                    {t.contactHoursVal}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {language === 'en' ? 'Resident doctor available on shift duty 24/7' : 'ड्यूटी डॉक्टर 24 घंटे शिफ्ट के आधार पर उपलब्ध'}
                  </p>
                </div>
              </div>

              {/* Email item */}
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{t.contactEmail}</h4>
                  <p className="text-sm sm:text-base font-semibold text-slate-750 mt-1">
                    <a href="mailto:info@saubhagyahospital.com" className="hover:text-teal-600 transition">contact@saubhagyahospital.com</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Caution Panel */}
            <div className="p-4 rounded-2xl border border-rose-100 bg-rose-50/50 text-rose-800 text-xs sm:text-sm flex gap-3 mt-6">
              <ShieldAlert className="h-5 w-5 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <span className="font-bold">{language === 'en' ? 'Emergency Admission' : 'आपातकालीन प्रवेश'}: </span>
                <span>
                  {language === 'en' 
                    ? "Our emergency trauma and labor suites are active 24/7. No prior appointment is required for emergency labor pain or trauma cases."
                    : "हमारे आपातकालीन आघात और लेबर रूम 24 घंटे चालू हैं। आपातकालीन प्रसव पीड़ा या गंभीर चोट के मामलों में किसी पूर्व अपॉइंटमेंट की आवश्यकता नहीं है।"
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Map Area (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-md h-full flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between mb-4 px-2">
                  <h4 className="font-bold text-slate-800 text-sm tracking-wide uppercase flex items-center gap-1.5">
                    <Heart className="h-4.5 w-4.5 text-rose-500 fill-rose-500" />
                    <span>{t.contactMapTitle}</span>
                  </h4>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                    ● {language === 'en' ? 'Open Now' : 'अभी खुला है'}
                  </span>
                </div>

                {/* Actual Map Iframe with fallback visual */}
                <div id="google-map-container" className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                  {/* Map Iframe */}
                  <iframe
                    title="Saubhagya Hospital Raipur Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.387532349887!2d81.636054!3d21.295744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28ddbb875ca1f5%3A0xc391104fc819777f!2sSaubhagya%20Hospital!5e0!3m2!1sen!2sin!4v1719741234567!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                </div>
              </div>

              {/* Call to action direction button */}
              <div className="mt-4 pt-4 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500 leading-normal text-center sm:text-left">
                  {language === 'en' 
                    ? "Located in Shivanand Nagar, Raipur - 1 hour 15 minutes from nearest airports/railway hubs."
                    : "शिवानंद नगर, रायपुर में स्थित - निकटतम हवाई अड्डों/रेलवे जंक्शनों से लगभग 1 घंटे 15 मिनट की दूरी।"
                  }
                </span>
                <a
                  href={mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold text-white shadow-xs hover:bg-teal-700 transition cursor-pointer shrink-0"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>{t.contactGetDirections}</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
