import React, { useState, useEffect, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  TrendingUp, 
  Check, 
  ExternalLink, 
  FileSpreadsheet, 
  RefreshCw, 
  LogOut, 
  Globe, 
  Smartphone, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowLeft,
  ChevronRight,
  Database,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { Language, Appointment, DEPARTMENTS } from '../types';

// Initialize Firebase App for Admin Dashboard
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(firebaseApp);

interface PageVisit {
  id: string;
  timestamp: string;
  path: string;
  referrer: string;
  userAgent: string;
}

interface AdminDashboardProps {
  language: Language;
  onBack: () => void;
}

export default function AdminDashboard({ language, onBack }: AdminDashboardProps) {
  // Authentication & Auth state
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  // Data states from backend
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [traffic, setTraffic] = useState<PageVisit[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Local storage for Google Sheet link
  const [connectedSheetId, setConnectedSheetId] = useState<string | null>(() => {
    return localStorage.getItem('saubhagya_sheets_id');
  });
  const [connectedSheetUrl, setConnectedSheetUrl] = useState<string | null>(() => {
    return localStorage.getItem('saubhagya_sheets_url');
  });
  
  // Track synced appointments to prevent duplicate appends
  const [syncedApptIds, setSyncedApptIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('saubhagya_synced_ids');
    return saved ? JSON.parse(saved) : [];
  });

  // UI state managers
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  // Listen to Firebase Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoadingAuth(false);
      if (currentUser) {
        // Fetch appointments & traffic immediately upon sign-in
        fetchDashboardData();
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch data from backend Express APIs
  const fetchDashboardData = async () => {
    setIsLoadingData(true);
    try {
      const [apptsRes, trafficRes] = await Promise.all([
        fetch('/api/appointments'),
        fetch('/api/traffic')
      ]);

      if (apptsRes.ok) {
        const apptsData = await apptsRes.json();
        setAppointments(apptsData);
      }
      if (trafficRes.ok) {
        const trafficData = await trafficRes.json();
        setTraffic(trafficData);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Google Sign-In helper (Requests spreadsheet access scope)
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/spreadsheets');
    
    try {
      setIsLoadingAuth(true);
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential?.accessToken) {
        setGoogleAccessToken(credential.accessToken);
        // Save token temporarily for active session
        sessionStorage.setItem('sheets_auth_token', credential.accessToken);
      }
    } catch (err) {
      console.error("Google sign in failed:", err);
      alert(language === 'en' ? "Failed to sign in with Google." : "गूगल से साइन-इन विफल रहा।");
    } finally {
      setIsLoadingAuth(false);
    }
  };

  // Google Sign-Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setGoogleAccessToken(null);
      sessionStorage.removeItem('sheets_auth_token');
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  // Retrieve cached token if user is signed in but page reloaded
  useEffect(() => {
    if (user && !googleAccessToken) {
      const cachedToken = sessionStorage.getItem('sheets_auth_token');
      if (cachedToken) {
        setGoogleAccessToken(cachedToken);
      }
    }
  }, [user, googleAccessToken]);

  // Connect Google Sheets API: Creates a brand new spreadsheet
  const handleCreateAndConnectSheet = async () => {
    const token = googleAccessToken || sessionStorage.getItem('sheets_auth_token');
    if (!token) {
      alert(language === 'en' ? "Please connect your Google Account first." : "कृपया पहले अपने गूगल खाते को कनेक्ट करें।");
      return;
    }

    setIsSyncing(true);
    setSyncMessage(language === 'en' ? "Creating spreadsheet..." : "नया गूगल शीट बना रहे हैं...");

    try {
      // 1. Create spreadsheet
      const createRes = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          properties: {
            title: "Saubhagya Hospital - Website Appointments Log"
          }
        })
      });

      if (!createRes.ok) {
        throw new Error("Failed to create spreadsheet");
      }

      const sheetData = await createRes.json();
      const spreadsheetId = sheetData.spreadsheetId;
      const spreadsheetUrl = sheetData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

      // 2. Set Up Column Headers
      setSyncMessage(language === 'en' ? "Setting up column headers..." : "कॉलम हेडर व्यवस्थित कर रहे हैं...");
      const headerRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:J1?valueInputOption=USER_ENTERED`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          range: "Sheet1!A1:J1",
          majorDimension: "ROWS",
          values: [
            ["Booking ID", "Patient Name", "Phone Number", "Age", "Gender", "Department", "Consultation Date", "Time Slot", "Symptoms/Notes", "Booked At"]
          ]
        })
      });

      if (!headerRes.ok) {
        throw new Error("Failed to write headers");
      }

      // Save state and localStorage
      setConnectedSheetId(spreadsheetId);
      setConnectedSheetUrl(spreadsheetUrl);
      localStorage.setItem('saubhagya_sheets_id', spreadsheetId);
      localStorage.setItem('saubhagya_sheets_url', spreadsheetUrl);

      setSyncMessage(language === 'en' ? "Connected successfully!" : "सफलतापूर्वक कनेक्ट हो गया!");
      setTimeout(() => setSyncMessage(''), 3000);
    } catch (err) {
      console.error("Sheets connection error:", err);
      alert(language === 'en' ? "Error connecting Google Sheets. Your session may have expired." : "गूगल शीट को कनेक्ट करने में त्रुटि हुई। आपका सत्र समाप्त हो गया होगा।");
    } finally {
      setIsSyncing(false);
    }
  };

  // Sync Pending Appointments to Connected Google Sheet
  const handleSyncData = async () => {
    const token = googleAccessToken || sessionStorage.getItem('sheets_auth_token');
    if (!token || !connectedSheetId) {
      alert(language === 'en' ? "Google Sheets connection is missing." : "गूगल शीट कनेक्शन गायब है।");
      return;
    }

    // Filter unsynced appointments
    const unsynced = appointments.filter(appt => !syncedApptIds.includes(appt.id));
    if (unsynced.length === 0) {
      alert(language === 'en' ? "All appointments are already in sync!" : "सभी अपॉइंटमेंट्स पहले से ही सिंक हैं!");
      return;
    }

    setIsSyncing(true);
    setSyncMessage(language === 'en' ? `Syncing ${unsynced.length} records...` : `${unsynced.length} रिकॉर्ड सिंक किए जा रहे हैं...`);

    try {
      const rows = unsynced.map(appt => [
        appt.id,
        appt.patientName,
        appt.patientPhone,
        appt.patientAge,
        appt.patientGender,
        appt.departmentName,
        appt.date,
        appt.timeSlot,
        appt.symptoms,
        appt.bookedAt
      ]);

      const appendRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${connectedSheetId}/values/Sheet1!A2:append?valueInputOption=USER_ENTERED`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          range: "Sheet1!A2",
          majorDimension: "ROWS",
          values: rows
        })
      });

      if (!appendRes.ok) {
        throw new Error("Append failed");
      }

      // Mark as synced
      const newlySyncedIds = [...syncedApptIds, ...unsynced.map(a => a.id)];
      setSyncedApptIds(newlySyncedIds);
      localStorage.setItem('saubhagya_synced_ids', JSON.stringify(newlySyncedIds));

      setSyncMessage(language === 'en' ? "Sync completed successfully!" : "डेटा सिंक सफलतापूर्वक पूरा हुआ!");
      setTimeout(() => setSyncMessage(''), 3500);
    } catch (err) {
      console.error("Sync failed:", err);
      alert(language === 'en' ? "Sync failed. Your access token might have expired. Please log out and log in again." : "सिंक विफल रहा। आपका एक्सेस टोकन समाप्त हो गया हो सकता है। कृपया लॉग आउट करके पुनः प्रयास करें।");
    } finally {
      setIsSyncing(false);
    }
  };

  // Toggle/Cancel Appointment directly from Dashboard
  const handleCancelApptFromAdmin = async (appt: Appointment) => {
    if (!confirm(language === 'en' ? `Are you sure you want to cancel appointment ${appt.id}?` : `क्या आप वाकई अपॉइंटमेंट ${appt.id} को रद्द करना चाहते हैं?`)) {
      return;
    }

    const updatedAppt: Appointment = { ...appt, status: 'Cancelled' };
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAppt)
      });
      if (res.ok) {
        setAppointments(prev => prev.map(a => a.id === appt.id ? updatedAppt : a));
      }
    } catch (err) {
      console.error("Error cancelling appointment:", err);
    }
  };

  // Mark Completed / Scheduled
  const handleToggleStatus = async (appt: Appointment) => {
    const nextStatus = appt.status === 'Scheduled' ? 'Cancelled' : 'Scheduled';
    const updatedAppt: Appointment = { ...appt, status: nextStatus };
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAppt)
      });
      if (res.ok) {
        setAppointments(prev => prev.map(a => a.id === appt.id ? updatedAppt : a));
      }
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  // Process traffic data into chart friendly format (Page Views by Day)
  const chartData = useMemo(() => {
    if (traffic.length === 0) return [];
    
    const viewsByDate: { [key: string]: number } = {};
    traffic.forEach(visit => {
      try {
        const dateStr = new Date(visit.timestamp).toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN', {
          month: 'short',
          day: 'numeric'
        });
        viewsByDate[dateStr] = (viewsByDate[dateStr] || 0) + 1;
      } catch (e) {
        // Ignore date parsing errors
      }
    });

    return Object.keys(viewsByDate).map(date => ({
      date,
      views: viewsByDate[date]
    })).slice(-7); // last 7 days
  }, [traffic, language]);

  // Process browser types or pages
  const referrerData = useMemo(() => {
    const counts: { [key: string]: number } = {};
    traffic.forEach(v => {
      const ref = v.referrer || "Direct";
      const cleanRef = ref.includes("google") ? "Google Search" 
                     : ref.includes("maps") ? "Google Maps"
                     : ref === "Direct" ? "Direct Visit"
                     : "Other Referral";
      counts[cleanRef] = (counts[cleanRef] || 0) + 1;
    });

    const colors = ["#0ea5e9", "#10b981", "#f59e0b", "#6366f1"];
    return Object.keys(counts).map((name, i) => ({
      name,
      value: counts[name],
      color: colors[i % colors.length]
    }));
  }, [traffic]);

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter(appt => {
      const matchSearch = 
        appt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.patientPhone.includes(searchQuery) ||
        appt.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchDept = deptFilter === 'ALL' || appt.departmentId === deptFilter;
      const matchStatus = statusFilter === 'ALL' || appt.status === statusFilter;

      return matchSearch && matchDept && matchStatus;
    });
  }, [appointments, searchQuery, deptFilter, statusFilter]);

  // Basic counters
  const totalBookings = appointments.length;
  const pendingBookings = appointments.filter(a => a.status === 'Scheduled').length;
  const totalTrafficViews = traffic.length;
  const unsyncedCount = appointments.filter(appt => !syncedApptIds.includes(appt.id)).length;

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans pb-16">
      
      {/* Top sticky Admin Bar */}
      <div className="bg-slate-950 border-b border-slate-800 py-4 px-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition font-bold text-xs bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{language === 'en' ? 'Exit Admin' : 'एडमिन बंद करें'}</span>
            </button>
            <div className="h-4 w-[1px] bg-slate-800" />
            <h2 className="font-serif text-base sm:text-lg font-bold flex items-center gap-2">
              <Database className="h-5 w-5 text-teal-400 animate-pulse" />
              <span>{language === 'en' ? 'Saubhagya Owner Panel' : 'सौभाग्य ओनर डैशबोर्ड'}</span>
            </h2>
          </div>

          {user && (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-slate-200">{user.displayName || "Owner"}</p>
                <p className="text-[10px] text-teal-400 font-mono">Hospital Admin</p>
              </div>
              <button 
                onClick={handleSignOut}
                className="text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 p-2 rounded-lg border border-slate-800 hover:border-rose-500/20 transition cursor-pointer"
                title={language === 'en' ? "Log Out" : "लॉग आउट"}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {!user ? (
        // Beautiful, High-Contrast Google Login Screen
        <div className="max-w-md mx-auto mt-20 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6"
          >
            <div className="mx-auto h-16 w-16 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Database className="h-8 w-8 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight text-white font-serif">
                {language === 'en' ? "Admin Access Portal" : "एडमिन एक्सेस पोर्टल"}
              </h3>
              <p className="text-sm text-slate-400">
                {language === 'en' 
                  ? "Sign in with the hospital's registered Google account to access patient appointments, visitor traffic data, and sync with Google Sheets."
                  : "मरीजों के अपॉइंटमेंट्स, विज़िटर ट्रैफिक डेटा देखने और गूगल शीट के साथ सिंक करने के लिए कृपया अपने गूगल खाते से लॉग-इन करें।"
                }
              </p>
            </div>

            <div className="h-[1px] bg-slate-800" />

            {isLoadingAuth ? (
              <div className="flex justify-center py-4">
                <div className="h-6 w-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              /* Official Styled Sign in with Google Button */
              <button 
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 py-3.5 px-5 rounded-xl font-bold text-sm hover:bg-slate-50 transition shadow-lg cursor-pointer active:scale-95"
              >
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5 shrink-0">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
                <span>{language === 'en' ? "Sign in with Google" : "गूगल के साथ साइन-इन करें"}</span>
              </button>
            )}

            <button 
              onClick={onBack}
              className="text-xs text-slate-500 hover:text-slate-300 block mx-auto underline mt-2"
            >
              {language === 'en' ? "Back to Hospital Website" : "हॉस्पिटल वेबसाइट पर वापस जाएं"}
            </button>
          </motion.div>
        </div>
      ) : (
        // Full Admin Dashboard Workspace
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
          
          {/* Bento-grid Analytics Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Stat Card 1: Appointments */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{language === 'en' ? 'Total Appointments' : 'कुल अपॉइंटमेंट्स'}</p>
                <h3 className="text-3xl font-bold text-white mt-1.5 font-sans">{totalBookings}</h3>
                <p className="text-[10px] text-emerald-400 font-bold mt-1">● {pendingBookings} {language === 'en' ? 'Scheduled' : 'आरक्षित'}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Calendar className="h-6 w-6" />
              </div>
            </div>

            {/* Stat Card 2: Traffic views */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{language === 'en' ? 'Total Page Visits' : 'कुल पेज विज़िट्स'}</p>
                <h3 className="text-3xl font-bold text-white mt-1.5 font-sans">{totalTrafficViews}</h3>
                <p className="text-[10px] text-teal-400 font-bold mt-1">
                  {language === 'en' ? 'Real-time Traffic Logger' : 'वास्तविक समय विज़िटर ट्रैकिंग'}
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Globe className="h-6 w-6" />
              </div>
            </div>

            {/* Stat Card 3: Sheets Connection Status */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{language === 'en' ? 'Google Sheets Sync' : 'गूगल शीट सिंक्रोनाइज़ेशन'}</p>
                <h3 className="text-sm font-bold text-white mt-2.5 flex items-center gap-1.5">
                  {connectedSheetId ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Check className="h-4 w-4" /> Connected
                    </span>
                  ) : (
                    <span className="text-amber-500">Not Connected</span>
                  )}
                </h3>
                <p className="text-[10px] text-slate-400 mt-1">
                  {unsyncedCount === 0 
                    ? (language === 'en' ? 'All records are in sync' : 'सभी रिकॉर्ड्स सिंक हैं')
                    : (language === 'en' ? `${unsyncedCount} pending sync` : `${unsyncedCount} सिंक के लिए लंबित`)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <FileSpreadsheet className="h-6 w-6" />
              </div>
            </div>

            {/* Stat Card 4: Action Center */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{language === 'en' ? 'Database Health' : 'डेटाबेस स्वास्थ्य'}</p>
                <h3 className="text-lg font-bold text-white mt-1.5 flex items-center gap-1.5">
                  <Database className="h-4 w-4 text-emerald-400" />
                  <span>100% Online</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-1">
                  {language === 'en' ? 'Local JSON database storage' : 'स्थानीय JSON फ़ाइल संचय'}
                </p>
              </div>
              <button 
                onClick={fetchDashboardData}
                disabled={isLoadingData}
                className="h-10 w-10 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center border border-slate-800 cursor-pointer transition disabled:opacity-40"
                title={language === 'en' ? 'Reload Data' : 'डेटा रीलोड करें'}
              >
                <RefreshCw className={`h-4 w-4 ${isLoadingData ? 'animate-spin' : ''}`} />
              </button>
            </div>

          </div>

          {/* Google Sheets Integration Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <h3 className="text-xl font-bold text-white font-serif flex items-center gap-2">
                  <FileSpreadsheet className="h-5.5 w-5.5 text-emerald-400" />
                  <span>{language === 'en' ? 'Google Sheets Live Sync' : 'गूगल शीट लाइव सिंक्रोनाइज़ेशन'}</span>
                </h3>
                <p className="text-sm text-slate-400">
                  {language === 'en' 
                    ? "Connect your Google Sheets account. A dedicated spreadsheet 'Saubhagya Hospital - Website Appointments Log' will be created. All bookings submitted on your website can be written instantly to Google Sheets so you never lose customer info and can analyze bookings anywhere."
                    : "अपने गूगल शीट्स खाते को कनेक्ट करें। सौभाग्य हॉस्पिटल वेबसाइट पर मरीजों द्वारा बुक की गई सभी अपॉइंटमेंट्स सीधे आपके गूगल शीट में सिंक हो जाएंगी ताकि आप इसे कभी भी देख और व्यवस्थित कर सकें।"}
                </p>

                {connectedSheetUrl && (
                  <div className="pt-2">
                    <a 
                      href={connectedSheetUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-bold text-xs bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-xl"
                    >
                      <span>{language === 'en' ? 'Open Connected Spreadsheet' : 'कनेक्टेड गूगल शीट खोलें'}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 self-start lg:self-center shrink-0">
                {!connectedSheetId ? (
                  <button
                    onClick={handleCreateAndConnectSheet}
                    disabled={isSyncing}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 transition cursor-pointer disabled:opacity-50"
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>{language === 'en' ? 'Create & Connect Sheets' : 'गूगल शीट बनाएं और कनेक्ट करें'}</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSyncData}
                      disabled={isSyncing || unsyncedCount === 0}
                      className="inline-flex items-center gap-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 py-3 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                      <span>{language === 'en' ? `Sync ${unsyncedCount} New Bookings` : `${unsyncedCount} नया डेटा सिंक करें`}</span>
                    </button>
                    <button
                      onClick={handleCreateAndConnectSheet}
                      disabled={isSyncing}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 font-bold text-xs px-4 py-3 border border-slate-800 transition cursor-pointer"
                    >
                      <span>{language === 'en' ? 'Reconnect' : 'पुनः कनेक्ट करें'}</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Sync Progress Alert Panel */}
            <AnimatePresence>
              {syncMessage && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-teal-400 flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4 animate-spin shrink-0" />
                  <span>{syncMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Traffic Logs Charts & Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Chart: Page Views Over Last 7 Days (8 cols) */}
            <div className="lg:col-span-8 bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-sky-400" />
                <span>{language === 'en' ? 'Website Traffic Analytics (Last 7 Days)' : 'वेबसाइट विज़िटर ट्रैफ़िक (पिछले 7 दिन)'}</span>
              </h3>
              
              <div className="h-[260px] w-full">
                {chartData.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs">
                    <Globe className="h-8 w-8 text-slate-700 mb-2" />
                    <span>No page visits recorded yet today. Keep checking in.</span>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChartAndStyle data={chartData} />
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Referrer traffic insights (4 cols) */}
            <div className="lg:col-span-4 bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-400" />
                  <span>{language === 'en' ? 'Visitor Sources' : 'ट्रैफिक का माध्यम'}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'en' ? 'Where patients discover your hospital' : 'मरीजों को आपके हॉस्पिटल का पता कहाँ से चला'}
                </p>

                <div className="mt-6 space-y-3">
                  {referrerData.length === 0 ? (
                    <p className="text-xs text-slate-600 text-center py-8">No source logs found</p>
                  ) : (
                    referrerData.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800/50">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-xs font-bold text-slate-300">{item.name}</span>
                        </div>
                        <span className="text-xs font-bold text-white font-mono">{item.value} visits</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900 text-[11px] text-slate-500 leading-relaxed font-sans">
                {language === 'en' 
                  ? "Referrers are parsed from browser navigator objects automatically to track marketing channels."
                  : "विज़िटर ट्रैफ़िक चैनलों को ट्रैक करने के लिए ब्राउज़र रेफ़रर को स्वचालित रूप से पार्स किया जाता है।"}
              </div>
            </div>

          </div>

          {/* Appointments Master Manager Log Section */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            
            {/* Header / Filter Toolbar */}
            <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                  <Calendar className="h-5.5 w-5.5 text-teal-400" />
                  <span>{language === 'en' ? 'Patient Bookings Directory' : 'मरीज अपॉइंटमेंट डायरेक्टरी'}</span>
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {language === 'en' 
                    ? "Manage and update doctor consultation schedules booked on the website."
                    : "वेबसाइट पर बुक किए गए डॉक्टर परामर्श कार्यक्रमों को देखें और अपडेट करें।"}
                </p>
              </div>

              {/* Filters strip */}
              <div className="flex flex-wrap items-center gap-3">
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'en' ? 'Search patient, phone...' : 'मरीज, फोन खोजें...'}
                    className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs focus:border-teal-500 focus:outline-hidden text-white placeholder-slate-500 font-sans"
                  />
                </div>

                {/* Dept Filter */}
                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:border-teal-500 focus:outline-hidden text-slate-300 font-sans"
                >
                  <option value="ALL">{language === 'en' ? 'All Departments' : 'सभी विभाग'}</option>
                  {DEPARTMENTS.map(d => (
                    <option key={d.id} value={d.id}>{d.name[language]}</option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:border-teal-500 focus:outline-hidden text-slate-300 font-sans"
                >
                  <option value="ALL">{language === 'en' ? 'All Status' : 'सभी स्थिति'}</option>
                  <option value="Scheduled">{language === 'en' ? 'Scheduled' : 'आरक्षित'}</option>
                  <option value="Cancelled">{language === 'en' ? 'Cancelled' : 'रद्द'}</option>
                </select>

              </div>
            </div>

            {/* List Table container */}
            <div className="overflow-x-auto">
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-16 text-slate-500 space-y-3">
                  <Calendar className="h-10 w-10 mx-auto text-slate-700" />
                  <p className="text-sm font-medium font-sans">
                    {language === 'en' ? 'No matching appointments found' : 'कोई अपॉइंटमेंट नहीं मिला'}
                  </p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="p-4 pl-6 font-semibold">Booking ID</th>
                      <th className="p-4 font-semibold">{language === 'en' ? 'Patient Details' : 'मरीज का विवरण'}</th>
                      <th className="p-4 font-semibold">{language === 'en' ? 'Department' : 'विभाग'}</th>
                      <th className="p-4 font-semibold">{language === 'en' ? 'Consultation Slot' : 'अपॉइंटमेंट स्लॉट'}</th>
                      <th className="p-4 font-semibold">{language === 'en' ? 'Symptoms / Notes' : 'लक्षण / टिप्पणी'}</th>
                      <th className="p-4 font-semibold">Sheets Status</th>
                      <th className="p-4 font-semibold">Status</th>
                      <th className="p-4 pr-6 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {filteredAppointments.map((appt) => {
                      const isSynced = syncedApptIds.includes(appt.id);
                      return (
                        <tr key={appt.id} className="hover:bg-slate-900/40 transition">
                          <td className="p-4 pl-6 font-bold font-mono text-slate-400">{appt.id}</td>
                          <td className="p-4">
                            <p className="font-bold text-white text-sm">{appt.patientName}</p>
                            <p className="text-slate-400 text-[11px] mt-0.5">
                              {appt.patientAge} Years • {appt.patientGender} • <a href={`tel:${appt.patientPhone}`} className="text-teal-400 hover:underline">{appt.patientPhone}</a>
                            </p>
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-teal-400">{appt.departmentName}</span>
                          </td>
                          <td className="p-4 space-y-1">
                            <div className="flex items-center gap-1.5 font-bold text-slate-200">
                              <Calendar className="h-3.5 w-3.5 text-slate-500" />
                              <span>{appt.date}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <Clock className="h-3.5 w-3.5 text-slate-600" />
                              <span>{appt.timeSlot}</span>
                            </div>
                          </td>
                          <td className="p-4 max-w-xs truncate text-slate-400" title={appt.symptoms}>
                            {appt.symptoms}
                          </td>
                          <td className="p-4">
                            {isSynced ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                                <Check className="h-3 w-3" /> Synced
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full animate-pulse">
                                Pending Sync
                              </span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                              appt.status === 'Scheduled' 
                                ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' 
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}>
                              ● {appt.status === 'Scheduled' ? (language === 'en' ? 'Scheduled' : 'आरक्षित') : (language === 'en' ? 'Cancelled' : 'रद्द')}
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleToggleStatus(appt)}
                                className={`px-2.5 py-1 rounded-md font-bold text-[10px] uppercase transition cursor-pointer ${
                                  appt.status === 'Scheduled'
                                    ? 'bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border border-rose-500/20'
                                    : 'bg-teal-500/10 hover:bg-teal-500/25 text-teal-400 border border-teal-500/20'
                                }`}
                              >
                                {appt.status === 'Scheduled' 
                                  ? (language === 'en' ? 'Cancel' : 'रद्द करें') 
                                  : (language === 'en' ? 'Restore' : 'बहाल करें')}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

// Separate Mini Component for Line Chart to simplify types
import { AreaChart, Area } from 'recharts';

function AreaChartAndStyle({ data }: { data: any[] }) {
  return (
    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <defs>
        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
      <Tooltip 
        contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
        labelStyle={{ color: '#fff', fontWeight: 'bold' }}
      />
      <Area type="monotone" dataKey="views" stroke="#0ea5e9" strokeWidth={2.5} fillOpacity={1} fill="url(#colorViews)" />
    </AreaChart>
  );
}
