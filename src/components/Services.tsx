import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Baby, 
  Activity, 
  Scissors, 
  Bone, 
  X, 
  ChevronRight, 
  User, 
  CheckCircle2, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { Language, translations, DEPARTMENTS, Department } from '../types';

interface ServicesProps {
  language: Language;
  onBookDepartment: (deptId: string) => void;
}

export default function Services({ language, onBookDepartment }: ServicesProps) {
  const t = translations[language];
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  // Helper to map string icon name to Lucide icons
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake': return HeartHandshake;
      case 'Baby': return Baby;
      case 'Activity': return Activity;
      case 'Scissors': return Scissors;
      case 'Bone': return Bone;
      default: return HeartHandshake;
    }
  };

  return (
    <section id="services-section" className="py-16 sm:py-24 bg-slate-50/40 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50/70 px-3 py-1 rounded-full border border-blue-100">
            {t.servicesBadge}
          </span>
          <h2 className="mt-4 text-3xl font-normal tracking-tight text-slate-900 sm:text-4xl font-serif">
            {t.servicesTitle}
          </h2>
          <p className="mt-4 text-base text-slate-550 font-normal max-w-2xl mx-auto font-sans">
            {t.servicesSubtitle}
          </p>
          <div className="mt-4 h-[1px] w-16 bg-blue-500 mx-auto" />
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEPARTMENTS.map((dept) => {
            const IconComponent = getIcon(dept.icon);
            return (
              <div 
                key={dept.id} 
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-lg hover:border-blue-200 transition duration-300"
              >
                <div>
                  {/* Icon */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-6 border border-blue-100">
                    <IconComponent className="h-5 w-5" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold font-serif text-slate-900 mb-3">
                    {dept.name[language]}
                  </h3>

                  {/* Short Desc */}
                  <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed mb-6">
                    {dept.shortDesc[language]}
                  </p>
                </div>

                {/* Primary Doctor Subtitle */}
                <div className="border-t border-slate-100 pt-4 mt-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-600">
                      {language === 'en' ? 'Specialist: ' : 'विशेषज्ञ: '}
                      <span className="text-blue-600">{dept.doctors[0].name[language]}</span>
                    </span>
                  </div>

                  {/* View details button */}
                  <button
                    onClick={() => setSelectedDept(dept)}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-blue-50/20 hover:border-blue-200 hover:text-blue-600 transition duration-150 ease-in-out cursor-pointer"
                  >
                    <span>{t.viewDetails}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Department Details Modal */}
        {selectedDept && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              {/* Background overlay */}
              <div 
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
                aria-hidden="true"
                onClick={() => setSelectedDept(null)}
              />

              {/* Center modal element */}
              <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

              <div className="relative inline-block transform overflow-hidden rounded-2xl bg-white text-left align-bottom shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle border border-slate-200">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedDept(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition focus:outline-hidden p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Modal Header Cover */}
                <div className="bg-slate-900 p-6 sm:p-8 text-white border-b border-slate-800">
                  <div className="flex items-center gap-3 mb-2">
                    {React.createElement(getIcon(selectedDept.icon), { className: "h-7 w-7 text-blue-400" })}
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      <Sparkles className="h-3 w-3" />
                      <span>{language === 'en' ? 'Active Specialty' : 'सक्रिय विशेषज्ञता'}</span>
                    </span>
                  </div>
                  <h3 className="text-2xl font-normal font-serif text-white" id="modal-title">
                    {selectedDept.name[language]}
                  </h3>
                </div>

                {/* Modal Body */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Long Description */}
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                      {language === 'en' ? 'About Department' : 'विभाग के बारे में'}
                    </h4>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {selectedDept.fullDesc[language]}
                    </p>
                  </div>

                  {/* Doctor Profiles */}
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                      {language === 'en' ? 'Our Expert Doctors' : 'हमारे विशेषज्ञ चिकित्सक'}
                    </h4>
                    <div className="space-y-4">
                      {selectedDept.doctors.map((doc, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl border border-slate-200 bg-slate-50/40">
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                              {doc.name.en.split(' ').pop()?.[0]}
                            </div>
                            <div>
                              <h5 className="font-bold text-slate-800 text-base">{doc.name[language]}</h5>
                              <p className="text-xs text-blue-700 font-semibold">{doc.role[language]}</p>
                            </div>
                          </div>
                          <span className="mt-2 sm:mt-0 inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-800 border border-blue-100">
                            {doc.experience[language]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features List */}
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                      {language === 'en' ? 'Key Clinical Offerings' : 'मुख्य क्लीनिकल सुविधाएं'}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedDept.features[language].map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 leading-normal">
                          <CheckCircle2 className="h-4.5 w-4.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="bg-slate-50 px-6 py-4 sm:px-8 sm:py-5 flex flex-col sm:flex-row sm:justify-between items-center gap-3 border-t border-slate-200">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {language === 'en' ? '*Confirm slot via web or phone' : '*वेब या फोन द्वारा समय की पुष्टि करें'}
                  </span>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setSelectedDept(null)}
                      className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 cursor-pointer text-center"
                    >
                      {t.close}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onBookDepartment(selectedDept.id);
                        setSelectedDept(null);
                      }}
                      className="w-full sm:w-auto px-5 py-2 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 cursor-pointer text-center flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="h-4 w-4 text-blue-200" />
                      <span>{language === 'en' ? 'Book Slot Now' : 'अभी स्लॉट बुक करें'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
