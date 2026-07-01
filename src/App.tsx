import React, { useState, useEffect } from 'react';
import { 
  HeartHandshake, 
  Languages, 
  Phone, 
  Clock, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight, 
  MessageSquare, 
  Calendar,
  Sparkles,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations } from './types';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Appointments from './components/Appointments';
import AiAssistant from './components/AiAssistant';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [language, setLanguage] = useState<Language>('hi'); // Default to Hindi as requested by Raipur users
  const [activeView, setActiveView] = useState<string>('home'); // 'home' | 'book' | 'chat' | 'admin'
  const [selectedDeptId, setSelectedDeptId] = useState<string | undefined>(undefined);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[language];

  // Real-time Traffic/Visits Logging on Mount
  useEffect(() => {
    fetch('/api/traffic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer || 'Direct',
        userAgent: navigator.userAgent
      })
    }).catch(err => console.error("Error logging page traffic:", err));
  }, []);

  // Language toggle handler
  const handleToggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  // Scroll helper to sections
  const scrollToSection = (sectionId: string) => {
    setActiveView('home');
    setMobileMenuOpen(false);
    
    // Allow state to resolve first before scrolling
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleBookFromSpecialty = (deptId: string) => {
    setSelectedDeptId(deptId);
    setActiveView('book');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* 24/7 Top Alert Notification Bar */}
      <div className="bg-rose-600 text-white py-2 px-4 text-center text-xs font-extrabold tracking-wide flex items-center justify-center gap-2 relative z-50">
        <span className="h-2 w-2 bg-white rounded-full animate-ping shrink-0" />
        <span>
          {language === 'en' 
            ? "24/7 Emergency & Maternity Admissions Active: +91 77140 50625" 
            : "24/7 आपातकालीन एवं प्रसूति प्रवेश चालू है: +91 77140 50625"}
        </span>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            
            {/* Logo area */}
            <div 
              onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
            >
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-slate-900 text-white border border-slate-800 shadow-sm group-hover:bg-blue-600 transition duration-200">
                <HeartHandshake className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-normal text-slate-900 tracking-tight leading-none font-serif">
                  सौभाग्य <span className="text-blue-600">हॉस्पिटल</span>
                </h1>
                <p className="text-[9px] sm:text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-0.5 font-sans">
                  SAUBHAGYA HOSPITAL
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              <button 
                onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`text-xs font-bold uppercase tracking-wider transition cursor-pointer ${activeView === 'home' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
              >
                {t.navHome}
              </button>
              <button 
                onClick={() => scrollToSection('about-section')}
                className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-blue-600 transition cursor-pointer"
              >
                {t.navAbout}
              </button>
              <button 
                onClick={() => scrollToSection('services-section')}
                className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-blue-600 transition cursor-pointer"
              >
                {t.navServices}
              </button>
              <button 
                onClick={() => scrollToSection('reviews-section')}
                className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-blue-600 transition cursor-pointer"
              >
                {t.navReviews}
              </button>
              <button 
                onClick={() => scrollToSection('contact-section')}
                className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-blue-600 transition cursor-pointer"
              >
                {t.navContact}
              </button>
            </nav>

            {/* Header Action Buttons (Language + Book + Chat) */}
            <div className="hidden lg:flex items-center gap-4">
              
              {/* Language Switch */}
              <button
                onClick={handleToggleLanguage}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold text-xs transition cursor-pointer"
                title={language === 'en' ? 'हिन्दी में बदलें' : 'Change to English'}
              >
                <Languages className="h-4 w-4 text-blue-600" />
                <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
              </button>

              {/* Chat tab */}
              <button
                onClick={() => setActiveView('chat')}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer border ${
                  activeView === 'chat'
                    ? 'bg-slate-900 border-slate-950 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <MessageSquare className="h-4 w-4 text-blue-500 animate-pulse" />
                <span>{t.navChat}</span>
              </button>

              {/* Book Appointment Call-to-action */}
              <button
                onClick={() => setActiveView('book')}
                className={`inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer active:scale-95 ${
                  activeView === 'book'
                    ? 'bg-blue-700 text-white border border-blue-800'
                    : 'bg-blue-600 text-white hover:bg-blue-700 border border-blue-700 shadow-xs'
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>{t.navBook}</span>
              </button>
            </div>

            {/* Mobile Actions / Hamburger row */}
            <div className="flex lg:hidden items-center gap-2">
              
              {/* Language Switch for mobile */}
              <button
                onClick={handleToggleLanguage}
                className="inline-flex h-9 items-center gap-1 px-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-bold text-xs cursor-pointer"
              >
                <Languages className="h-3.5 w-3.5 text-blue-600" />
                <span>{language === 'en' ? 'HI' : 'EN'}</span>
              </button>

              {/* Chat action shortcut */}
              <button
                onClick={() => setActiveView('chat')}
                className={`h-9 w-9 flex items-center justify-center rounded-lg border cursor-pointer ${
                  activeView === 'chat' ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-700'
                }`}
                title={t.navChat}
              >
                <MessageSquare className="h-4.5 w-4.5 text-blue-500 animate-pulse" />
              </button>

              {/* Book Appointment mobile shortcut */}
              <button
                onClick={() => setActiveView('book')}
                className={`h-9 w-9 flex items-center justify-center rounded-lg cursor-pointer ${
                  activeView === 'book' ? 'bg-blue-700 text-white border border-blue-800' : 'bg-blue-600 text-white border border-blue-700 shadow-sm'
                }`}
                title={t.navBook}
              >
                <Calendar className="h-4.5 w-4.5" />
              </button>

              {/* Mobile hamburger toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="h-9 w-9 flex items-center justify-center rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl transition duration-200">
            <div className="space-y-1.5 p-4">
              <button
                onClick={() => { setActiveView('home'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`block w-full text-left px-4 py-3 rounded-xl font-bold text-sm ${activeView === 'home' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {t.navHome}
              </button>
              <button
                onClick={() => scrollToSection('about-section')}
                className="block w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50"
              >
                {t.navAbout}
              </button>
              <button
                onClick={() => scrollToSection('services-section')}
                className="block w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50"
              >
                {t.navServices}
              </button>
              <button
                onClick={() => scrollToSection('reviews-section')}
                className="block w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50"
              >
                {t.navReviews}
              </button>
              <button
                onClick={() => scrollToSection('contact-section')}
                className="block w-full text-left px-4 py-3 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50"
              >
                {t.navContact}
              </button>

              {/* Extra block actions inside Drawer */}
              <div className="pt-4 border-t border-slate-150 grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setActiveView('chat'); setMobileMenuOpen(false); }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-900 text-white px-4 py-3 font-bold text-xs"
                >
                  <MessageSquare className="h-4 w-4 text-blue-400" />
                  <span>{t.navChat}</span>
                </button>
                <button
                  onClick={() => { setActiveView('book'); setMobileMenuOpen(false); }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 text-white px-4 py-3 font-bold text-xs"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{t.navBook}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <Hero language={language} onNavigate={setActiveView} />
              <About language={language} />
              <Services language={language} onBookDepartment={handleBookFromSpecialty} />
              <Testimonials language={language} />
              <Contact language={language} />
            </motion.div>
          )}

          {activeView === 'book' && (
            <motion.div
              key="book"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <Appointments 
                language={language} 
                selectedDeptId={selectedDeptId}
                onClearSelectedDept={() => setSelectedDeptId(undefined)}
              />
            </motion.div>
          )}

          {activeView === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <AiAssistant language={language} />
            </motion.div>
          )}

          {activeView === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <AdminDashboard language={language} onBack={() => setActiveView('home')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Hospital Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">
            
            {/* Col 1: Brand details (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 text-slate-900 shadow-md">
                  <HeartHandshake className="h-5.5 w-5.5" />
                </div>
                <div>
                  <h3 className="text-white text-lg font-black tracking-tight">सौभाग्य हॉस्पिटल</h3>
                  <p className="text-[10px] tracking-widest text-slate-400 uppercase">SAUBHAGYA HOSPITAL</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {language === 'en'
                  ? "Saubhagya Hospital is Raipur's highly rated multi-specialty family healthcare center. Dedicated to delivering advanced obstetrics, pediatrics, medicine and surgery with top-level medical precision and transparent care."
                  : "सौभाग्य हॉस्पिटल रायपुर का एक अत्यधिक प्रशंसित बहु-विशेषज्ञ पारिवारिक स्वास्थ्य सेवा केंद्र है। हम पूर्ण पारदर्शिता के साथ प्रसूति, बाल रोग, चिकित्सा और लेप्रोस्कोपिक सर्जरी प्रदान करने के लिए समर्पित हैं।"
                }
              </p>
              
              {/* Emergency info block */}
              <div className="pt-2">
                <a 
                  href="tel:+917714050625"
                  className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 font-extrabold text-sm"
                >
                  <Phone className="h-4 w-4 animate-bounce" />
                  <span>{language === 'en' ? 'Emergency 24x7: 077140 50625' : 'आपातकालीन सेवा 24x7: 077140 50625'}</span>
                </a>
              </div>
            </div>

            {/* Col 2: Useful Links (3 cols) */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                {language === 'en' ? 'Quick Links' : 'त्वरित लिंक्स'}
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => { setActiveView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition">
                    {t.navHome}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about-section')} className="hover:text-white transition">
                    {t.navAbout}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('services-section')} className="hover:text-white transition">
                    {t.navServices}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('reviews-section')} className="hover:text-white transition">
                    {t.navReviews}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact-section')} className="hover:text-white transition">
                    {t.navContact}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Address / Map info (4 cols) */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                {language === 'en' ? 'Our Location' : 'अस्पताल का पता'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold flex items-start gap-2">
                <MapPin className="h-4.5 w-4.5 text-teal-500 shrink-0 mt-0.5" />
                <span>Sector 1, Saptgiri Colony, Shivanand Nagar, Raipur, Chhattisgarh 492008</span>
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium flex items-start gap-2">
                <Clock className="h-4.5 w-4.5 text-teal-500 shrink-0 mt-0.5" />
                <span>{language === 'en' ? 'Open 24 Hours / Shift doctor on-duty' : '24 घंटे खुला / शिफ्ट डॉक्टर उपस्थित'}</span>
              </p>
            </div>

          </div>

          {/* Bottom Copyright and credit */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p className="font-semibold text-center sm:text-left">
              &copy; {new Date().getFullYear()} Saubhagya Hospital Raipur. All Rights Reserved. •{' '}
              <button 
                onClick={() => { setActiveView('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                className="hover:text-blue-500 font-bold underline transition bg-transparent border-0 cursor-pointer p-0"
              >
                {language === 'en' ? 'Staff Portal' : 'एडमिन / स्टाफ लॉगिन'}
              </button>
            </p>
            <div className="flex items-center gap-1.5 font-bold text-teal-600">
              <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
              <span>{language === 'en' ? 'Caring for Raipur Families' : 'रायपुर परिवारों की देखभाल'}</span>
            </div>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
