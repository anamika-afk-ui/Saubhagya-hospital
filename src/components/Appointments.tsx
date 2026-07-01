import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  HelpCircle, 
  CheckCircle, 
  AlertCircle, 
  Trash2, 
  Download, 
  Activity, 
  Sparkles,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, translations, DEPARTMENTS, Appointment } from '../types';

interface AppointmentsProps {
  language: Language;
  selectedDeptId?: string;
  onClearSelectedDept?: () => void;
}

export default function Appointments({ language, selectedDeptId, onClearSelectedDept }: AppointmentsProps) {
  const t = translations[language];

  // Appointment slots list
  const timeSlots = [
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
    "07:00 PM - 08:00 PM"
  ];

  // State managers
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('Male');
  const [deptId, setDeptId] = useState(DEPARTMENTS[0].id);
  const [prefDate, setPrefDate] = useState('');
  const [prefTime, setPrefTime] = useState(timeSlots[0]);
  const [symptoms, setSymptoms] = useState('');

  // Form notifications
  const [isSuccess, setIsSuccess] = useState(false);
  const [latestAppt, setLatestAppt] = useState<Appointment | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Set initial date to tomorrow as default
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setPrefDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Sync selectedDeptId from Services if passed down
  useEffect(() => {
    if (selectedDeptId) {
      setDeptId(selectedDeptId);
      if (onClearSelectedDept) {
        onClearSelectedDept();
      }
    }
  }, [selectedDeptId]);

  // Load appointments from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('saubhagya_appointments');
    if (saved) {
      try {
        setAppointments(JSON.parse(saved));
      } catch (err) {
        console.error("Error loading appointments:", err);
      }
    }
  }, []);

  const saveAppointments = (list: Appointment[]) => {
    setAppointments(list);
    localStorage.setItem('saubhagya_appointments', JSON.stringify(list));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!patientName.trim()) {
      setErrorMsg(language === 'en' ? "Please enter patient name." : "कृपया मरीज का नाम दर्ज करें।");
      return;
    }
    if (!patientPhone.trim() || patientPhone.trim().length < 10) {
      setErrorMsg(language === 'en' ? "Please enter a valid 10-digit phone number." : "कृपया एक वैध 10-अंकीय फोन नंबर दर्ज करें।");
      return;
    }
    if (!patientAge || Number(patientAge) <= 0) {
      setErrorMsg(language === 'en' ? "Please enter a valid age." : "कृपया मरीज की सही उम्र दर्ज करें।");
      return;
    }
    if (!prefDate) {
      setErrorMsg(language === 'en' ? "Please select a preferred date." : "कृपया पसंदीदा तारीख चुनें।");
      return;
    }

    const matchedDept = DEPARTMENTS.find(d => d.id === deptId);
    const departmentName = matchedDept ? matchedDept.name[language] : DEPARTMENTS[0].name[language];

    // Create appointment instance
    const newAppt: Appointment = {
      id: `SB-${Math.floor(100000 + Math.random() * 900000)}`,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientAge: Number(patientAge),
      patientGender,
      departmentId: deptId,
      departmentName,
      date: prefDate,
      timeSlot: prefTime,
      symptoms: symptoms.trim() || (language === 'en' ? "General checkup" : "सामान्य स्वास्थ्य जांच"),
      status: 'Scheduled',
      bookedAt: new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    };

    const updatedList = [newAppt, ...appointments];
    saveAppointments(updatedList);

    // Set success modal states
    setLatestAppt(newAppt);
    setIsSuccess(true);

    // Reset input fields
    setPatientName('');
    setPatientPhone('');
    setPatientAge('');
    setSymptoms('');
  };

  const handleCancelAppointment = (id: string) => {
    if (confirm(language === 'en' ? "Are you sure you want to cancel this appointment?" : "क्या आप वाकई इस अपॉइंटमेंट को रद्द करना चाहते हैं?")) {
      const updated = appointments.filter(a => a.id !== id);
      saveAppointments(updated);
    }
  };

  const handleDownloadSlip = (appt: Appointment) => {
    // Elegant text booking receipt downloadable file
    const fileContent = `
========================================
       SAUBHAGYA HOSPITAL RAIPUR
========================================
          APPOINTMENT SLIP
========================================
Receipt ID : ${appt.id}
Date Booked: ${appt.bookedAt}
Status     : ${appt.status === 'Scheduled' ? 'REGISTERED' : 'CANCELLED'}

PATIENT DETAILS:
----------------------------------------
Patient Name : ${appt.patientName}
Age / Gender : ${appt.patientAge} Years / ${appt.patientGender}
Contact No.  : ${appt.patientPhone}

VISIT INFORMATION:
----------------------------------------
Department   : ${appt.departmentName}
Consultation Date : ${appt.date}
Preferred Slot    : ${appt.timeSlot}
Key Symptoms      : ${appt.symptoms}

IMPORTANT INSTRUCTIONS:
----------------------------------------
1. Please reach Saubhagya Hospital reception 15 minutes before your preferred time slot.
2. Bring any previous medical files, prescription reports or active scans.
3. For directions, search 'Saubhagya Hospital Sector 1 Shivanand Nagar Raipur' on Google Maps.
4. For cancellation or assistance, call: 077140 50625.

Address: Sector 1, Saptgiri Colony, Shivanand Nagar, Raipur, Chhattisgarh 492008.
Thank you for trusting Saubhagya Hospital!
========================================
    `;

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Saubhagya_Appointment_${appt.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="appointments-section" className="py-16 sm:py-24 bg-white border-t border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100"
          >
            {t.bookBadge}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl font-serif"
          >
            {t.bookTitle}
          </motion.h2>
          <p className="mt-4 text-base text-slate-500 font-normal max-w-2xl mx-auto font-sans">
            {t.bookSubtitle}
          </p>
          <div className="mt-4 h-[1px] w-16 bg-teal-500 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Appointment Form Column (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div 
              layout
              id="booking-form-card" 
              className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500" />
              
              <AnimatePresence mode="wait">
                {isSuccess && latestAppt ? (
                  // Success screen
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -15 }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
                    id="booking-success-view" 
                    className="text-center py-8 space-y-6"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-100"
                    >
                      <CheckCircle className="h-10 w-10" />
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-extrabold text-slate-900 font-serif">{t.bookFormSuccess}</h3>
                      <p className="text-sm text-slate-600 max-w-md mx-auto">{t.bookFormSuccessSub}</p>
                    </div>

                    {/* Summary of Appointment */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="max-w-md mx-auto p-5 rounded-2xl border border-emerald-100 bg-emerald-50/30 text-left space-y-3"
                    >
                      <div className="flex justify-between border-b border-emerald-100/50 pb-2">
                        <span className="text-[10px] font-bold uppercase text-slate-400">ID / Dept</span>
                        <span className="text-sm font-bold text-slate-800">{latestAppt.id} - <span className="text-teal-700">{latestAppt.departmentName}</span></span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs font-bold text-slate-500 font-sans">{language === 'en' ? 'Patient Name' : 'मरीज का नाम'}</span>
                        <span className="text-sm font-semibold text-slate-800 font-sans">{latestAppt.patientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs font-bold text-slate-500 font-sans">{language === 'en' ? 'Appointment Date' : 'अपॉइंटमेंट की तारीख'}</span>
                        <span className="text-sm font-bold text-slate-800 font-sans">{latestAppt.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs font-bold text-slate-500 font-sans">{language === 'en' ? 'Time Slot' : 'पसंदीदा समय'}</span>
                        <span className="text-sm font-bold text-slate-800 font-sans">{latestAppt.timeSlot}</span>
                      </div>
                    </motion.div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDownloadSlip(latestAppt)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-teal-600 px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-teal-700 cursor-pointer"
                      >
                        <Download className="h-4 w-4" />
                        <span>{t.apptDownloadSlip}</span>
                      </motion.button>
                      <button
                        onClick={() => {
                          setIsSuccess(false);
                          setLatestAppt(null);
                        }}
                        className="px-5 py-3 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer"
                      >
                        {language === 'en' ? 'Book Another Visit' : 'एक और अपॉइंटमेंट बुक करें'}
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  // Booking form
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleBookingSubmit} 
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-bold text-slate-800 border-b border-slate-50 pb-4 flex items-center gap-2 font-serif">
                      <Activity className="h-5.5 w-5.5 text-teal-600" />
                      <span>{language === 'en' ? 'Request Consultation' : 'परामर्श का अनुरोध करें'}</span>
                    </h3>

                    {errorMsg && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 text-xs sm:text-sm flex items-center gap-2"
                      >
                        <AlertCircle className="h-4.5 w-4.5 text-rose-600 shrink-0" />
                        <span>{errorMsg}</span>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Patient Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 font-sans">
                          <User className="h-3.5 w-3.5" />
                          <span>{t.bookFormName} <span className="text-rose-500">*</span></span>
                        </label>
                        <input
                          type="text"
                          required
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="e.g. Satish Kumar Sahu"
                          className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm focus:border-teal-500 focus:outline-hidden text-slate-800 placeholder-slate-400 font-medium font-sans"
                        />
                      </div>

                      {/* Patient Phone */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 font-sans">
                          <Phone className="h-3.5 w-3.5" />
                          <span>{t.bookFormPhone} <span className="text-rose-500">*</span></span>
                        </label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={patientPhone}
                          onChange={(e) => setPatientPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="e.g. 7714050625"
                          className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm focus:border-teal-500 focus:outline-hidden text-slate-800 placeholder-slate-400 font-medium font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                      {/* Age */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase font-sans">
                          <span>{t.bookFormAge} <span className="text-rose-500">*</span></span>
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          max="120"
                          value={patientAge}
                          onChange={(e) => setPatientAge(e.target.value)}
                          placeholder="e.g. 28"
                          className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm focus:border-teal-500 focus:outline-hidden text-slate-800 font-medium font-sans"
                        />
                      </div>

                      {/* Gender */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase font-sans">
                          <span>{t.bookFormGender}</span>
                        </label>
                        <select
                          value={patientGender}
                          onChange={(e) => setPatientGender(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm focus:border-teal-500 focus:outline-hidden text-slate-800 font-medium font-sans"
                        >
                          <option value="Male">{t.bookFormGenderM}</option>
                          <option value="Female">{t.bookFormGenderF}</option>
                          <option value="Other">{t.bookFormGenderO}</option>
                        </select>
                      </div>

                      {/* Department */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase font-sans">
                          <span>{t.bookFormDept}</span>
                        </label>
                        <select
                          value={deptId}
                          onChange={(e) => setDeptId(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm focus:border-teal-500 focus:outline-hidden text-slate-800 font-medium font-sans"
                        >
                          {DEPARTMENTS.map(d => (
                            <option key={d.id} value={d.id}>{d.name[language]}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Date */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 font-sans">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{t.bookFormDate} <span className="text-rose-500">*</span></span>
                        </label>
                        <input
                          type="date"
                          required
                          value={prefDate}
                          onChange={(e) => setPrefDate(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm focus:border-teal-500 focus:outline-hidden text-slate-800 font-medium font-sans"
                        />
                      </div>

                      {/* Time slots */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 font-sans">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{t.bookFormTime}</span>
                        </label>
                        <select
                          value={prefTime}
                          onChange={(e) => setPrefTime(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm focus:border-teal-500 focus:outline-hidden text-slate-800 font-medium font-sans"
                        >
                          {timeSlots.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Symptoms */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 font-sans">
                        <HelpCircle className="h-3.5 w-3.5" />
                        <span>{t.bookFormSymptoms}</span>
                      </label>
                      <textarea
                        rows={3}
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder={language === 'en' ? "e.g. Mild pregnancy checkup / infant vaccination schedule" : "जैसे- सामान्य स्वास्थ्य जांच / टीकाकरण परामर्श"}
                        className="w-full rounded-xl border border-slate-200 bg-white p-3.5 text-sm focus:border-teal-500 focus:outline-hidden text-slate-800 font-medium font-sans"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-4 text-base font-bold text-white shadow-md hover:bg-teal-700 transition cursor-pointer"
                    >
                      <span>{t.bookFormSubmit}</span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Appointments Manager Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div id="manager-card" className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 font-serif">
                <Award className="h-5.5 w-5.5 text-teal-600 animate-pulse" />
                <span>{t.appointmentsManagerTitle}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-normal mb-6 font-sans">
                {t.appointmentsManagerSub}
              </p>

              <AnimatePresence mode="popLayout">
                {appointments.length === 0 ? (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10 bg-white border border-dashed border-slate-200 rounded-2xl p-6 cursor-default"
                  >
                    <Calendar className="h-8 w-8 mx-auto text-slate-300 mb-3" />
                    <p className="text-xs font-medium text-slate-500 leading-normal font-sans">
                      {t.apptNoRecords}
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                    {appointments.map((appt) => (
                      <motion.div 
                        key={appt.id} 
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -20 }}
                        whileHover={{ y: -2 }}
                        className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs relative space-y-3 cursor-default"
                      >
                        {/* Top bar info */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md font-sans">
                            ID: {appt.id}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 font-sans">
                            ● {t.apptStatusScheduled}
                          </span>
                        </div>

                        {/* Patient metadata */}
                        <div>
                          <h4 className="text-sm font-bold text-slate-800 leading-normal font-sans">
                            {appt.patientName}
                          </h4>
                          <p className="text-xs font-bold text-teal-600 mt-0.5 font-sans">
                            {appt.departmentName}
                          </p>
                        </div>

                        {/* Visit details */}
                        <div className="text-xs text-slate-500 space-y-1 pt-1.5 border-t border-slate-100">
                          <div className="flex items-center gap-1.5 font-medium font-sans">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            <span>{appt.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-medium font-sans">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            <span>{appt.timeSlot}</span>
                          </div>
                        </div>

                        {/* Buttons strip */}
                        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                          <button
                            onClick={() => handleCancelAppointment(appt.id)}
                            className="text-[11px] font-bold text-rose-500 hover:text-rose-600 cursor-pointer flex items-center gap-1 p-1 hover:bg-rose-50 rounded-lg transition"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>{t.apptActionCancel}</span>
                          </button>
                          <button
                            onClick={() => handleDownloadSlip(appt)}
                            className="text-[11px] font-bold text-teal-600 hover:text-teal-700 cursor-pointer flex items-center gap-1 p-1 hover:bg-teal-50 rounded-lg transition"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>{t.apptDownloadSlip}</span>
                          </button>
                        </div>

                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Offline Support Notice */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="p-4 rounded-2xl border border-teal-100/50 bg-teal-50/20 text-teal-800 text-xs flex gap-2 cursor-default"
            >
              <Sparkles className="h-4.5 w-4.5 text-teal-600 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <span className="font-bold">{language === 'en' ? 'Local Persistence' : 'स्थानीय संचय'}: </span>
                <span className="font-sans">
                  {language === 'en'
                    ? "Your scheduled visits are saved in your browser storage so you can easily trace, verify, download, or reschedule them at any time."
                    : "आपके अनुसूचित दौरे आपके ब्राउज़र स्टोरेज में सुरक्षित सहेजे गए हैं ताकि आप किसी भी समय आसानी से ट्रैक, सत्यापित, या डाउनलोड कर सकें।"
                  }
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
