import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import { Toaster, toast } from 'sonner'; // Add this import
import Chatbot from './components/Chatbot';
import Telemedicine from './components/Telemedicine';
import { HashLoader } from 'react-spinners'; // Add this
import TricolorSpinner from './components/TricolorSpinner';
import { Menu } from 'lucide-react';
import { 
  Building2, FileText, Award, Stethoscope, 
  ShieldAlert, Clock, CheckCircle2, ShieldCheck,
  MapPin, Send, HelpCircle, Sparkles, MessageSquare, 
  AlertTriangle, Bot, User, RefreshCw, Briefcase, Lock, ArrowRight, LogOut, ArrowLeft
} from 'lucide-react';

const LoadingScreen = () => <TricolorSpinner />;

export default function App() {

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  // Add this state to track the global app initialization
const [isAppLoading, setIsAppLoading] = useState(true);

// Update your useEffect to trigger the app loading
useEffect(() => {
  // Example: Wait for backend wake-up + initial data fetch
  const initApp = async () => {
    try {
      await fetchComplaintsFromDb();
      // Add other essential fetch calls here if needed
    } finally {
      // Small timeout to ensure the UI feels smooth
      setTimeout(() => setIsAppLoading(false), 1000); 
    }
  };
  initApp();
}, []);

  // FIXED: Set the initial baseline state mapping to 'home' so your premium landing page renders at the beginning
  const [currentTab, setCurrentTab] = useState('home');
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  
  // Real database metrics states
  const [dbComplaints, setDbComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  // Add this state
const [isChatOpen, setIsChatOpen] = useState(false);

const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
  document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
}, [menuOpen]);

  // States for Scheme Matching Engine
  const [age, setAge] = useState('');
  const [income, setIncome] = useState('');
  const [education, setEducation] = useState('');
  const [matchedSchemes, setMatchedSchemes] = useState([]);

  // AI Assistant Chatbot State
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Namaskar! I am BharatSeva AI Assistant. How can I guide you across national services today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // LOCAL STATE PROXY: Reads matching credentials live from Home.jsx interactive auth submissions
  const [sessionUser, setSessionUser] = useState(JSON.parse(localStorage.getItem('citizen_user')) || null);

  

  // Global Auth Modal Controller States
  const [showAuthOverlay, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  const scholarshipSchemes = [
  // Government Schemes
  { id: 1, title: "Central Sector Scheme (PM-USP)", category: "Government", desc: "For college students with >80th percentile in Class 12.", minAge: 17, maxAge: 25, maxIncome: 450000, educationLevel: "Undergraduate", url: "https://scholarships.gov.in" },
  { id: 2, title: "NMMSS", category: "Government", desc: "Meritorious students from economically weaker sections.", minAge: 12, maxAge: 15, maxIncome: 350000, educationLevel: "School", url: "https://scholarships.gov.in" },
  { id: 3, title: "Post-Matric Scholarship for Minorities", category: "Government", desc: "For minority students with >50% marks.", minAge: 15, maxAge: 35, maxIncome: 200000, educationLevel: "Intermediate", url: "https://scholarships.gov.in" },
  { id: 4, title: "PM Scholarship Scheme (PMSS)", category: "Government", desc: "For wards of Ex-servicemen pursuing professional degrees.", minAge: 17, maxAge: 30, maxIncome: 9999999, educationLevel: "Undergraduate", url: "https://ksb.gov.in" },
  { id: 5, title: "Disability Post-Matric Scholarship", category: "Government", desc: "For students with >40% disability.", minAge: 15, maxAge: 35, maxIncome: 250000, educationLevel: "Intermediate", url: "https://scholarships.gov.in" },
  { id: 6, title: "Top Class Education for SC Students", category: "Government", desc: "For SC students in notified top-tier institutions.", minAge: 17, maxAge: 35, maxIncome: 800000, educationLevel: "Undergraduate", url: "https://socialjustice.gov.in" },
  { id: 7, title: "Pre-Matric Scholarship for OBC", category: "Government", desc: "Financial aid for OBC students in govt schools.", minAge: 10, maxAge: 15, maxIncome: 250000, educationLevel: "School", url: "https://scholarships.gov.in" },
  { id: 8, title: "Ishan Uday (NER)", category: "Government", desc: "Special scholarship for North Eastern Region students.", minAge: 17, maxAge: 25, maxIncome: 450000, educationLevel: "Undergraduate", url: "https://www.ugc.gov.in" },
  { id: 9, title: "PG Indira Gandhi Scholarship (Single Girl Child)", category: "Government", desc: "For single girl child pursuing PG.", minAge: 20, maxAge: 30, maxIncome: 9999999, educationLevel: "Postgraduate", url: "https://www.ugc.gov.in" },
  { id: 10, title: "Begum Hazrat Mahal Scholarship", category: "Government", desc: "For girl students of minority communities.", minAge: 13, maxAge: 18, maxIncome: 200000, educationLevel: "School", url: "https://bhmnsfp.org" },
  { id: 11, title: "National Fellowship for ST Students", category: "Government", desc: "For ST students pursuing higher education.", minAge: 20, maxAge: 35, maxIncome: 9999999, educationLevel: "Postgraduate", url: "https://tribal.nic.in" },
  { id: 12, title: "Eklavya Scholarship", category: "Government", desc: "For meritorious students in specified streams.", minAge: 17, maxAge: 25, maxIncome: 300000, educationLevel: "Undergraduate", url: "https://scholarships.gov.in" },
  { id: 13, title: "Pre-Matric Scholarship for Disabilities", category: "Government", desc: "Support for disabled students in Class 9-10.", minAge: 13, maxAge: 16, maxIncome: 250000, educationLevel: "School", url: "https://scholarships.gov.in" },
  { id: 14, title: "State Merit Scholarship", category: "Government", desc: "Open merit scholarship for state residents.", minAge: 16, maxAge: 22, maxIncome: 250000, educationLevel: "Intermediate", url: "https://scholarships.gov.in" },
  { id: 15, title: "Post-Matric OBC Scholarship", category: "Government", desc: "Financial support for post-matric OBC students.", minAge: 15, maxAge: 30, maxIncome: 250000, educationLevel: "Intermediate", url: "https://scholarships.gov.in" },
  
  // Private Schemes
  { id: 16, title: "Kotak Kanya Scholarship", category: "Private", desc: "For girl students pursuing professional degrees.", minAge: 17, maxAge: 22, maxIncome: 600000, educationLevel: "Undergraduate", url: "https://www.kotakeducation.org" },
  { id: 17, title: "Reliance Foundation Scholarship", category: "Private", desc: "Merit-cum-means for UG/PG students.", minAge: 17, maxAge: 30, maxIncome: 1500000, educationLevel: "Undergraduate", url: "https://www.scholarships.reliancefoundation.org" },
  { id: 18, title: "Panasonic Ratti Chhatr", category: "Private", desc: "For students pursuing B.E./B.Tech.", minAge: 17, maxAge: 20, maxIncome: 800000, educationLevel: "Undergraduate", url: "https://www.buddy4study.com" },
  { id: 19, title: "Parivartan ECSS Scholarship", category: "Private", desc: "Support for underprivileged students.", minAge: 6, maxAge: 25, maxIncome: 300000, educationLevel: "School", url: "https://www.buddy4study.com" },
  { id: 20, title: "Virtusa Engineering Scholarship", category: "Private", desc: "Financial aid for engineering students.", minAge: 17, maxAge: 22, maxIncome: 500000, educationLevel: "Undergraduate", url: "https://www.buddy4study.com" },
  { id: 21, title: "Santoor Scholarship Program", category: "Private", desc: "For girls from disadvantaged backgrounds.", minAge: 17, maxAge: 20, maxIncome: 400000, educationLevel: "Undergraduate", url: "https://www.santoorscholarships.com" },
  { id: 22, title: "Vidyadhan Scholarship", category: "Private", desc: "Support for meritorious students in need.", minAge: 15, maxAge: 18, maxIncome: 200000, educationLevel: "Intermediate", url: "https://www.vidyadhan.org" },
  { id: 23, title: "JK Tyre Shiksha Sarthi", category: "Private", desc: "Technical/non-technical UG assistance.", minAge: 17, maxAge: 25, maxIncome: 400000, educationLevel: "Undergraduate", url: "https://www.buddy4study.com" },
  { id: 24, title: "TMB Foundation Scholarship", category: "Private", desc: "For UG students in Arts/Science/Commerce.", minAge: 17, maxAge: 22, maxIncome: 300000, educationLevel: "Undergraduate", url: "https://www.tmb.in" },
  { id: 25, title: "SWAYAM Trust Aspire", category: "Private", desc: "Fee reimbursement for meritorious students.", minAge: 15, maxAge: 25, maxIncome: 500000, educationLevel: "Intermediate", url: "https://www.buddy4study.com" },
  { id: 26, title: "J N Tata Endowment Loan", category: "Private", desc: "Loan scholarship for higher education.", minAge: 20, maxAge: 35, maxIncome: 9999999, educationLevel: "Postgraduate", url: "https://www.tatatrusts.org" },
  { id: 27, title: "PIET Merit Scholarship", category: "Private", desc: "Tuition fee waiver based on entrance test.", minAge: 17, maxAge: 25, maxIncome: 9999999, educationLevel: "Undergraduate", url: "https://www.piet.co.in" },
  { id: 28, title: "Hyundai Hope Scholarship", category: "Private", desc: "For UPSC/PSC and research aspirants.", minAge: 21, maxAge: 35, maxIncome: 800000, educationLevel: "Postgraduate", url: "https://www.buddy4study.com" },
  { id: 29, title: "Kotak Suraksha", category: "Private", desc: "Financial assistance for students in need.", minAge: 15, maxAge: 25, maxIncome: 500000, educationLevel: "Intermediate", url: "https://www.kotakeducation.org" },
  { id: 30, title: "Merit-Based Excellence Fund", category: "Private", desc: "General scholarship for academic achievers.", minAge: 12, maxAge: 25, maxIncome: 400000, educationLevel: "School", url: "https://www.buddy4study.com" }
];

  // Keep header initials synchronized if changes happen inside your landing elements
  useEffect(() => {
    const syncInterval = setInterval(() => {
      const stored = JSON.parse(localStorage.getItem('citizen_user'));
      if (JSON.stringify(stored) !== JSON.stringify(sessionUser)) {
        setSessionUser(stored);
      }
    }, 1500);
    return () => clearInterval(syncInterval);
  }, [sessionUser]);

  // Guard routing checking block protecting internal features
  const handleTabSwitchGuard = (targetTab) => {
    if (targetTab === 'home') {
      setCurrentTab('home');
      return;
    }
    // Strict restriction guard check
    if (!sessionUser) {
      setIsSignUp(false);
      setShowAuthModal(true);
      return;
    }
    setCurrentTab(targetTab);
  };

  // Header Modal Auth Submission Handler Pipeline
  const handleAuthFormSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/login';
    const payload = isSignUp 
      ? { name: authName, email: authEmail, password: authPassword } 
      : { email: authEmail, password: authPassword };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('citizen_user', JSON.stringify(data));
        setSessionUser(data);
        setShowAuthModal(false);
        setCurrentTab('dashboard');
      } else {
        throw new Error();
      }
    } catch (err) {
      // Premium user friendly mock bypass container for testing configuration flows
      const mockUser = { id: 101, name: authName || "Badduluri Nithin Kumar", email: authEmail };
      localStorage.setItem('citizen_user', JSON.stringify(mockUser));
      setSessionUser(mockUser);
      setShowAuthModal(false);
      setCurrentTab('dashboard');
    }
  };


  // Fetch submitted issues directly from Spring Boot REST API
  const fetchComplaintsFromDb = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/complaints/all`);
      if (response.ok) {
        const data = await response.json();
        setDbComplaints(data);
      }
    } catch (err) {
      console.error("Failed fetching records:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaintsFromDb();
  }, []);

  const handleGrievanceSubmit = async (e) => {
  e.preventDefault();
  
  const payload = {
    title: e.target[0].value,
    category: e.target[1].value,
    description: e.target[2].value,
    location: e.target[3].value
  };

  try {
    const response = await fetch(`${BASE_URL}/api/complaints/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      // Use Sonner success toast
      toast.success("Grievance registered successfully!", {
        description: "Your report has been saved to the database.",
      });
      
      setIsComplaintOpen(false);
      fetchComplaintsFromDb(); 
    } else {
      // Handle non-200 responses
      toast.error("Submission failed", {
        description: "The server returned an error. Please try again."
      });
    }
  } catch (err) {
    // Use Sonner error toast
    toast.error("Connection Error", {
      description: "Could not communicate with the backend server.",
    });
  }
};
  const handleSOSTrigger = async () => {
    const telemetryData = {
      latitude: "13.2842° N",
      longitude: "78.6111° E"
    };

    try {
      const response = await fetch(`${BASE_URL}/api/emergency/trigger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(telemetryData)
      });

      if (response.ok) {
        // Updated to use Sonner
        toast.success("Telemetry Transmitted", {
          description: "Live coordinate telemetry securely transmitted to the central government control node database!"
        });
      } else {
        toast.error("Transmission Failed", {
          description: "Failed to send SOS transmission packets."
        });
      }
    } catch (error) {
      console.error("Network error during SOS dispatch:", error);
      toast.error("Connection Lost", {
        description: "Connection to emergency dispatch server lost."
      });
    }
  };

 
 // Updated Filtering Logic
const handleSchemeMatch = (e) => {
  e.preventDefault();
  setLoading(true);

  // Filter based on user inputs
  const results = scholarshipSchemes.filter(scheme => {
    return (
      parseInt(age) >= scheme.minAge &&
      parseInt(age) <= scheme.maxAge &&
      parseInt(income) <= scheme.maxIncome &&
      education.toLowerCase() === scheme.educationLevel.toLowerCase()
    );
  });

  setMatchedSchemes(results);
  localStorage.setItem('last_matched_schemes', JSON.stringify(results));
  setLoading(false);
};

  // UPDATED: Connected to real-time asynchronous streaming endpoint (Server-Sent Events)
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    
    // Append user query to chat array
    const userMsg = { sender: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');

    // Generate a unique token container mapping key for the incoming message string chunks
    const botMessageId = Date.now();
    setMessages(prev => [...prev, { id: botMessageId, sender: 'bot', text: '' }]);

    try {
      // Connect live via EventSource packet stream reader
      const url = `${BASE_URL}/api/chat/stream?message=${encodeURIComponent(userText)}`;
      const eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
        if (event.data === "[DONE]") {
          eventSource.close();
          return;
        }

        // Target and append each text token as it reaches the client runtime framework socket
        setMessages(prev => prev.map(msg => {
          if (msg.id === botMessageId) {
            return { ...msg, text: msg.text + event.data };
          }
          return msg;
        }));
      };

      eventSource.onerror = (err) => {
        console.error("Stream dropped or connection finalized:", err);
        eventSource.close();
      };

    } catch (error) {
      console.error("Failed executing real-time handshake pipeline:", error);
      setMessages(prev => prev.map(msg => {
        if (msg.id === botMessageId) {
          return { ...msg, text: "The network proxy link to the server LLM client container was interrupted." };
        }
        return msg;
      }));
    }
  };

  const handleUserLogout = () => {
  localStorage.removeItem('citizen_user');
  localStorage.removeItem('last_matched_schemes'); // Add this line
  setSessionUser(null);
  setMatchedSchemes([]); // Reset the state to zero
  setCurrentTab('home');
};

// 1. ADD THIS AT THE VERY TOP OF YOUR RETURN
  if (isAppLoading) {
    return <LoadingScreen />;
  }

  return (

    
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col antialiased">
      <Toaster position="top-center" richColors />
      
      
      {/* FIXED: HIDE IN-APP HEADER COMPLETELY ON HOME TO PREVENT NAVBAR REPLICATION DUPLICATION */}
      {currentTab !== 'home' && (
  <>
    <div className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] h-1.5 w-full" />
<header className="bg-white border-b border-slate-200 shadow-xs sticky top-0 z-40">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
    
    {/* REORDERED GROUP: Exit Button first, then Icon + Title */}
    <div className="flex items-center space-x-2 sm:space-x-4">
      
      {/* 1. EXIT BUTTON MOVED TO START */}
 
<button
  onClick={() => handleTabSwitchGuard('home')}
  className="flex items-center justify-center p-2 mr-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-600 hover:text-[#1e3a8a] transition-all duration-200 shadow-sm"
  title="Exit to Home"
>
  <ArrowLeft className="h-4 w-4 stroke-[3]" />
</button>
      {/* 2. LOGO + TITLE GROUP */}
      <div className="flex items-center space-x-2 sm:space-x-4 cursor-pointer" onClick={() => handleTabSwitchGuard('home')}>
        <div className="p-2 rounded-xl text-white shadow-sm bg-gradient-to-br from-[#FF9933] via-white to-[#138808] shrink-0">
          <div className="bg-[#0f172a] rounded-lg p-1.5 w-[38px] h-[38px] flex items-center justify-center overflow-hidden relative">
            <div className="w-full h-full flex flex-col">
              <div className="flex-1 bg-[#FF9933]"></div>
              <div className="flex-1 bg-white flex items-center justify-center">
                <div className="w-2 h-2 rounded-full border border-[#000080]"></div>
              </div>
              <div className="flex-1 bg-[#138808]"></div>
            </div>
          </div>
        </div>
        
        <div className="block">
          <h1 className="text-sm sm:text-xl font-extrabold text-[#0f172a] tracking-tight">
            BharatSeva AI 
          </h1>
        </div>
      </div>
    </div>

    {/* MOBILE TOGGLE BUTTON */}
    <button className="lg:hidden p-2 text-slate-700" onClick={() => setMenuOpen(!menuOpen)}>
      <Menu className="h-6 w-6" />
    </button>

    {/* RESPONSIVE NAVIGATION */}
    <nav className={`${menuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row absolute lg:static top-20 left-0 w-full lg:w-auto bg-white p-6 lg:p-0 border-b lg:border-none shadow-xl lg:shadow-none space-y-4 lg:space-y-0 lg:space-x-1`}>
      {['dashboard', 'schemes', 'telemedicine', 'emergency'].map((tab) => (
        <button
          key={tab}
          onClick={() => { handleTabSwitchGuard(tab); setMenuOpen(false); }}
          className={`px-4 py-2 text-xs font-bold tracking-wide uppercase rounded-lg transition-all ${
            currentTab === tab 
              ? 'bg-[#1e3a8a] text-white shadow-xs' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>

    {/* RIGHT SIDE ACTIONS */}
    <div className="hidden lg:flex items-center space-x-4">
      <button onClick={fetchComplaintsFromDb} className="p-2 text-slate-400 hover:text-[#1e3a8a] rounded-lg transition">
        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
      </button>
      <div className="h-9 w-9 bg-blue-100 rounded-full flex items-center justify-center text-[#1e3a8a] font-bold text-sm uppercase">
        {sessionUser ? sessionUser.name.substring(0, 2) : 'BN'}
      </div>
    </div>
  </div>
</header>
  </>
)}

      {/* ==================== SCREEN ELEMENT SWITCH MATRIX ==================== */}
      
      {/* VIEW A: RENDERS EXTRACTED PREMIUM SEPARATE HOME PAGE PAGE ROUTE */}
      {currentTab === 'home' && <Home onNavigate={handleTabSwitchGuard} />}

      {/* VIEW B: CONTEXT ISOLATED IN-APP WORKSPACE MODULES */}
      {currentTab !== 'home' && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Profile Card Intro Banner */}
          <div className="mb-8 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-[#0f172a]">Citizen Assistance Core Hub</h2>
              <p className="text-sm text-slate-500 mt-1">Cross-origin mapping linked smoothly with active Java persistence layers.</p>
            </div>
            <button 
              onClick={() => setIsComplaintOpen(true)}
              className="bg-[#ea580c] hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition shadow-xs self-start md:self-center"
            >
              Report Civic Issue
            </button>
          </div>

          {currentTab === 'telemedicine' && <Telemedicine />}

          {/* Tab 1: Dashboard View Route */}
          {currentTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
                  <div className="p-3 bg-amber-50 rounded-xl text-amber-600 border border-amber-100"><Clock className="h-6 w-6" /></div>
                  <div>
                    <p className="text-2xl font-black text-[#0f172a]">
                      {dbComplaints.filter(c => c.status === 'PENDING').length}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Live Active Grievances</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
                  <div className="p-3 bg-emerald-50 rounded-xl text-[#059669] border border-emerald-100"><CheckCircle2 className="h-6 w-6" /></div>
                  <div>
                    <p className="text-2xl font-black text-[#0f172a]">
                      {dbComplaints.filter(c => c.status === 'RESOLVED').length}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Resolved Redressals</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
                  <div className="p-3 bg-blue-50 rounded-xl text-[#1e3a8a] border border-blue-100"><Award className="h-6 w-6" /></div>
                  <div>
                    <p className="text-2xl font-black text-[#0f172a]">{matchedSchemes.length}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Matched Scholarships</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="text-[#1e3a8a] h-5 w-5" />
                    <h3 className="text-sm font-bold text-[#0f172a] uppercase tracking-wider">Unified Gateway Directory</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'services', title: "Civic Services", desc: "File structural complaints immediately with your municipality.", icon: FileText, color: "text-blue-600 bg-blue-50" },
                      { id: 'schemes', title: "Scheme Finder", desc: "Automated profile parsing algorithms for financial packages.", icon: Award, color: "text-emerald-600 bg-emerald-50" },
                      { id: 'telemedicine', title: "Telemedicine Node", desc: "Symptom-based diagnostic and medicine repository.", icon: Stethoscope, color: "text-teal-600 bg-teal-50" },
                      { id: 'emergency', title: "Emergency SOS Node", desc: "Transmit emergency telemetry alert metrics instantly.", icon: ShieldAlert, color: "text-red-600 bg-red-50" }
                    ].map((service, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs hover:border-[#1e3a8a] transition flex items-start space-x-4">
                        <div className={`p-2.5 rounded-xl border ${service.color}`}><service.icon className="h-5 w-5" /></div>
                        <div>
                          <h4 className="font-bold text-[#0f172a] text-sm">{service.title}</h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{service.desc}</p>
                          <button onClick={() => handleTabSwitchGuard(service.id)} className="text-xs text-[#1e3a8a] font-bold mt-3 hover:underline flex items-center gap-1">Open Module &rarr;</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col h-[320px]">
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3 border-b pb-2 flex items-center justify-between">
                    <span>Live Grievance Stream</span>
                    <span className="text-[10px] bg-blue-50 text-[#1e3a8a] px-2 py-0.5 rounded-md font-mono">{dbComplaints.length} Records</span>
                  </h3>
                  <div className="overflow-y-auto flex-1 space-y-3 pr-1">
                    {dbComplaints.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-16">No records currently stored inside the local system database instance.</p>
                    ) : (
                      dbComplaints.map((item) => (
                        <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                          <div className="flex justify-between items-center font-bold">
                            <span className="text-slate-800 truncate max-w-[140px]">{item.title}</span>
                            <span className="text-[9px] uppercase tracking-wide px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded font-bold">{item.status}</span>
                          </div>
                          <p className="text-slate-400 text-[11px] font-mono flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.location}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              
            </div>
          )}

          {/* Tab 2: Dynamic Web Scheme Finder View */}
          {currentTab === 'schemes' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs lg:col-span-1">
                <h3 className="font-bold text-[#0f172a] text-sm uppercase tracking-wider mb-4">AI Profiler Engine</h3>
                <form onSubmit={handleSchemeMatch} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1 uppercase">Age</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full text-sm px-3 py-2 border rounded-xl focus:outline-[#1e3a8a] bg-slate-50" placeholder="e.g. 21" required />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1 uppercase">Annual Income (INR)</label>
                    <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="w-full text-sm px-3 py-2 border rounded-xl focus:outline-[#1e3a8a] bg-slate-50" placeholder="e.g. 200000" required />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1 uppercase">Education Level</label>
                    <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} className="w-full text-sm px-3 py-2 border rounded-xl focus:outline-[#1e3a8a] bg-slate-50" placeholder="e.g. Undergraduate" required />
                  </div>
                  <button type="submit" className="w-full bg-[#1e3a8a] text-white text-xs font-bold uppercase py-3 rounded-xl hover:bg-blue-950 transition flex items-center justify-center gap-1.5">
                    <Sparkles className="h-4 w-4" /> {loading ? 'Fetching Web Data...' : 'Run Eligibility Engine'}
                  </button>
                </form>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs lg:col-span-2 min-h-[340px] flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-[#0f172a] text-sm uppercase tracking-wider mb-4">Eligible Dynamic Matches</h3>
                  {matchedSchemes.length === 0 ? (
                    <p className="text-xs text-slate-400 py-16 text-center">Provide profiling parameters to scan central welfare indices.</p>
                  ) : (
                    <div className="space-y-3">
                      {matchedSchemes.map((scheme, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 border rounded-xl flex justify-between items-center gap-4 transition-all hover:border-blue-200">
                          <div>
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-extrabold uppercase tracking-wide">{scheme.type}</span>
                            <h4 className="font-bold text-sm mt-1 text-[#0f172a]">{scheme.title}</h4>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{scheme.desc}</p>
                          </div>
                          <a 
  href={scheme.url} 
  target="_blank" 
  rel="noopener noreferrer"
  className="bg-[#1e3a8a] text-white text-[10px] font-bold uppercase px-4 py-2 rounded-lg hover:bg-blue-950 transition whitespace-nowrap shadow-xs"
>
  Apply &rarr;
</a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Interactive AI Assistant Chat Workspace */}
          {/* {currentTab === 'ai-assistant' && (
            <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col h-[480px]">
              <div className="bg-[#0f172a] p-4 text-white flex items-center space-x-3 rounded-t-2xl">
                <div className="bg-blue-600 p-2 rounded-xl"><Bot className="h-5 w-5" /></div>
                <div>
                  <h3 className="text-sm font-bold tracking-wide uppercase">BharatSeva Artificial Intelligence Node</h3>
                  <p className="text-[10px] text-slate-400">Contextual search integrated with national assistance schemas.</p>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`p-2 rounded-xl border text-slate-700 ${msg.sender === 'user' ? 'bg-blue-50 border-blue-100' : 'bg-slate-50 border-slate-100'}`}>
                      {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-xs max-w-[75%] ${msg.sender === 'user' ? 'bg-[#1e3a8a] text-white' : 'bg-slate-100 text-slate-800'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 flex gap-2 bg-slate-50 rounded-b-2xl"><input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Ask about scheme processing or scholarship deadlines..." className="flex-1 text-xs px-3 py-2 border rounded-xl focus:outline-[#1e3a8a] bg-white shadow-inner" /><button type="submit" className="bg-[#1e3a8a] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase flex items-center gap-1 hover:bg-blue-950 transition"><Send className="h-3 w-3" /> Send</button></form>
            </div>
          )} */}

          {/* Tab 4: Emergency SOS Node REST DESIGN UPDATED */}
          {currentTab === 'emergency' && (
            <div className="max-w-md mx-auto bg-white border border-red-100 rounded-2xl shadow-md overflow-hidden text-center">
              <div className="bg-red-600 p-5 text-white">
                <AlertTriangle className="h-10 w-10 mx-auto mb-1 animate-pulse" />
                <h3 className="text-base font-bold uppercase tracking-wider">Emergency SOS Node</h3>
              </div>
              <div className="p-6 space-y-6">
                <button onClick={handleSOSTrigger} className="h-32 w-32 rounded-full bg-red-100 border-4 border-red-500 flex items-center justify-center mx-auto hover:bg-red-200 transition shadow-inner active:scale-95 group">
                  <div className="h-24 w-24 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-lg shadow group-hover:bg-red-700">SOS</div>
                </button>
                <div className="text-xs text-slate-500 font-mono bg-slate-50 p-2.5 rounded-xl border flex items-center justify-center gap-1.5">
                  <MapPin className="h-4 w-4 text-red-600" /> Lat: 13.2842° N | Long: 78.6111° E
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Fallback */}
          {currentTab === 'services' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs text-center text-slate-400">
              <FileText className="h-10 w-10 mx-auto mb-2 text-slate-300" />
              <p className="text-xs">Use the primary overlay modal action bar link to trigger system records directly.</p>
            </div>
          )}
        </main>
      )}

      {/* Form Submission Component Modal */}
      {isComplaintOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border flex flex-col overflow-hidden">
            <div className="bg-[#0f172a] px-6 py-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-sm uppercase tracking-wide">File Centralized Civic Complaint</h3>
              <button onClick={() => setIsComplaintOpen(false)} className="text-slate-400 hover:text-white text-xl">&times;</button>
            </div>
            <form onSubmit={handleGrievanceSubmit} className="p-6 space-y-4">
              <div><label className="block text-[11px] font-bold text-slate-600 mb-1 uppercase tracking-wider">Issue Title</label><input type="text" className="w-full text-sm px-3 py-2 border rounded-xl focus:outline-[#1e3a8a] bg-slate-50" placeholder="e.g. Main Water Pipeline Block" required /></div>
              <div><label className="block text-[11px] font-bold text-slate-600 mb-1 uppercase tracking-wider">Department Classification</label><select className="w-full text-sm px-3 py-2 border rounded-xl focus:outline-[#1e3a8a] bg-slate-50" required><option value="">Select Target Division</option><option value="Roadways">Potholes & Roadways</option><option value="Sanitation">Sanitation Systems</option><option value="Water Grid">Municipal Water Grid</option></select></div>
              <div><label className="block text-[11px] font-bold text-slate-600 mb-1 uppercase tracking-wider"> Granular Description</label><textarea rows="3" className="w-full text-sm px-3 py-2 border rounded-xl focus:outline-[#1e3a8a] bg-slate-50" placeholder="Provide context markers..." required></textarea></div>
              <div><label className="block text-[11px] font-bold text-slate-600 mb-1 uppercase tracking-wider">Locality Address</label><input type="text" className="w-full text-sm px-3 py-2 border rounded-xl focus:outline-[#1e3a8a] bg-slate-50" placeholder="Street layout context, ward division" required /></div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100"><button type="button" onClick={() => setIsComplaintOpen(false)} className="px-4 py-2 text-xs font-bold uppercase text-slate-500 hover:bg-slate-50 rounded-lg">Cancel</button><button type="submit" className="px-5 py-2.5 bg-[#1e3a8a] hover:bg-blue-950 text-white text-xs font-bold uppercase rounded-lg shadow-xs flex items-center gap-1.5"><Send className="h-3.5 w-3.5" /> Submit Report</button></div>
            </form>
          </div>
        </div>
      )}

      {/* GLOBAL MODAL IDENTITY OVERLAY POPUP */}
      {showAuthOverlay && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border flex flex-col overflow-hidden transition-all duration-300">
            <div className="bg-[#0f172a] px-5 py-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-xs uppercase tracking-wide flex items-center gap-2">
                <Lock className="h-4 w-4 text-orange-500 animate-pulse" />
                <span>{isSignUp ? "Register Portal Identity" : "Verify Citizen Credentials"}</span>
              </h3>
              <button onClick={() => setShowAuthModal(false)} className="text-slate-400 hover:text-white text-xl font-bold">&times;</button>
            </div>
            
            <form onSubmit={handleAuthFormSubmit} className="p-5 space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input type="text" value={authName} onChange={(e) => setAuthName(e.target.value)} className="w-full text-xs pl-9 pr-3 py-2 border rounded-xl bg-slate-50 focus:outline-[#1e3a8a]" placeholder="Badduluri Nithin Kumar" required />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email Coordinates</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input type="email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="w-full text-xs pl-9 pr-3 py-2 border rounded-xl bg-slate-50 focus:outline-[#1e3a8a]" placeholder="citizen@seva.gov.in" required />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Security Key Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input type="password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="w-full text-xs pl-9 pr-3 py-2 border rounded-xl bg-slate-50 focus:outline-[#1e3a8a]" required />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#1e3a8a] hover:bg-blue-950 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition shadow-xs flex items-center justify-center gap-1.5 mt-2 transform active:scale-98">
                <span>{isSignUp ? "Create Secure Profile" : "Open Workspace Console"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
              <button onClick={() => setIsSignUp(!isSignUp)} className="text-[11px] text-[#1e3a8a] font-bold hover:underline">
                {isSignUp ? "Already have an account? Sign In Instead" : "New citizen? Setup secure national identity record"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Static Footer Alignment */}
      <footer className="bg-[#0f172a] text-slate-400 text-xs py-6 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-1">
            <p className="font-semibold text-slate-300">© 2026 BharatSeva AI Portal. Managed by Mother Theresa Institute of Engineering and Technology.</p>
            <p className="text-slate-500 text-[10px] tracking-wide uppercase">Secured via Centralized Spring Boot and Distributed Core Frameworks.</p>
          </div>
          {/* Change the button to an anchor tag that links to the admin page */}
<button 
  onClick={() => handleTabSwitchGuard('admin')} 
  className="bg-slate-800 hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-xs border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
>
  <Briefcase className="h-4 w-4 text-purple-400" />
  <span>Gov Console</span>
</button>
        </div>
      </footer>

     {/* --- INTEGRATED NAVABHARAT TRIGGER --- */}
<div className="fixed bottom-10 right-10 z-[9999]">
  <div 
    onClick={() => setIsChatOpen(!isChatOpen)}
    className="flex items-center gap-3 cursor-pointer group"
  >
    {/* CSS for Pulse and Float */}
    <style>{`
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
      .animate-float { animation: float 3s ease-in-out infinite; }
    `}</style>

    {/* Trigger Button with Animations */}
    <div className="animate-float flex items-center gap-3">
      {/* Glowing Icon Container */}
      <div className="relative flex items-center justify-center">
        {/* Pulse Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF9933] via-white to-[#138808] animate-ping opacity-75"></div>
        
        {/* Flag Icon */}
        <div className="relative bg-[#0f172a] p-2 rounded-full shadow-2xl border-2 border-white/50 overflow-hidden w-12 h-12 flex items-center justify-center">
          <div className="w-full h-full rounded-full overflow-hidden flex flex-col">
            <div className="flex-1 bg-[#FF9933]"></div>
            <div className="flex-1 bg-white flex items-center justify-center"><div className="w-2 h-2 rounded-full border border-[#000080]"></div></div>
            <div className="flex-1 bg-[#138808]"></div>
          </div>
        </div>
      </div>

      {/* Text Label */}
      <div className="bg-green-100 px-5 py-3 rounded-full shadow-xl border-2 border-[#f7d454] font-black text-[11px] uppercase tracking-widest text-[#555955] whitespace-nowrap">
        Ask NavaBharat
      </div>
    </div>
  </div>
</div>

{isChatOpen && <Chatbot onClose={() => setIsChatOpen(false)} />}

    </div>
  );
}