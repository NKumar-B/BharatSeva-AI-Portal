import React, { useState, useEffect } from 'react';
//import Header from './Header'; // Adjust path if necessary
import { Menu } from 'lucide-react';
import { 
  Building2, FileText, Bot, ShieldAlert, ArrowRight, 
  ChevronLeft, ChevronRight, ExternalLink, Phone, Mail,
  Send, Lock, MessageSquare, ShieldCheck, User, RefreshCw, HelpCircle, Cpu, Shield, Zap,
  GraduationCap, Landmark
} from 'lucide-react';

export default function Home({ onNavigate }) {

   const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const [activeSlide, setActiveSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  // SCROLL-SPY STATE: Tracks the string ID of the section currently in view
  const [activeSection, setActiveSection] = useState('carousel-banner');

  // GOVERNMENT LINKS CATEGORY FILTER STATE
  const [linkFilter, setLinkFilter] = useState('ALL');

  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
  document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
}, [menuOpen]);

  // PREMIUM INTERCEPTING INTERSTITIAL SPINNER STATE
  const [portalLoading, setPortalLoading] = useState(false);

  // AUTH STATE: Check for existing local storage profile sessions
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('citizen_user')) || null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Auth Form Input States
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  // USER TICKET STATES
  const [userQuestions, setUserQuestions] = useState([]);
  const [customQuery, setCustomQuery] = useState('');
  const [syncingQuestions, setSyncingQuestions] = useState(false);

  // NEW: State for Policy Modals

  const [activePolicy, setActivePolicy] = useState(null);

  const policyContent = {
    copyright: { title: "Copyright Policy", body: "All content available on this portal, including design, text, graphics, and interface, is the exclusive property of the BharatSeva Portal and is protected by copyright laws. Unauthorized reproduction or distribution is strictly prohibited." },
    privacy: { title: "Privacy Policy", body: "We are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard the personal data provided by citizens during their interaction with our digital services." },
    terms: { title: "Terms and Conditions", body: "By accessing and using this portal, you agree to comply with all applicable laws and regulations. Users are responsible for maintaining the confidentiality of their portal credentials." },
    disclaimer: { title: "Disclaimer", body: "The information contained in this portal is for general informational purposes only. While we strive for accuracy, we make no representations or warranties of any kind regarding the completeness or reliability of the data." },
    hyperlink: { title: "Hyperlink Policy", body: "Links to external websites are provided as a convenience. We do not endorse the content of external sites and are not responsible for their privacy practices or accessibility." },
    sitemap: { title: "Site Map", body: "The Site Map provides a hierarchical overview of the portal structure to assist users in navigating through our services, policies, and support documentation efficiently." }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  //caurosel slides

  const carouselSlides = [
    {
      title: "Empowering Citizens via Cognitive Intelligence",
      tagline: "Experience an integrated digital architecture utilizing distributed real-time data persistence.",
      bg: "from-slate-950 via-slate-900 to-blue-950"
    },
    {
      title: "One Nation, One Digital Service Network",
      tagline: "Bridging the gap between municipal infrastructure networks and responsive public triage systems.",
      bg: "from-slate-950 via-slate-900 to-orange-950"
    },
    {
      title: "Instantaneous Telemetry Emergency Redressal",
      tagline: "High-priority distributed queues routing critical tracking variables directly to active controller pipelines.",
      bg: "from-slate-950 via-slate-900 to-emerald-950"
    }
  ];

  // Comprehensive Government Directory Matrix Data Array
  const governmentLinksDirectory = [
    { name: "National Portal of India", desc: "Central baseline link registry for all ministries and state departments.", url: "https://india.gov.in", category: "SERVICES" },
    { name: "MyScheme Welfare Hub", desc: "National cross-division directory listing multi-category citizen welfare schemes.", url: "https://myscheme.gov.in", category: "SERVICES" },
    { name: "National Scholarship Portal", desc: "Unified educational financial support allocation application dashboard desk.", url: "https://scholarships.gov.in", category: "EDUCATION" },
    { name: "API Setu Infrastructure", desc: "Centralized open framework data engine endpoints and electronic registries provider.", url: "https://apisetu.gov.in", category: "OTHERS" },
    { name: "Digital India Registry", desc: "State cloud transformation management indices records and telemetry platforms.", url: "https://digitalindia.gov.in", category: "SERVICES" },
    { name: "Ministry of Electronics & IT", desc: "Executive national data governance network control framework authorities.", url: "https://meity.gov.in", category: "OTHERS" },
    { name: "DigiLocker Records Node", desc: "Secured cloud endpoint hosting citizen electronic documentation certificates.", url: "https://digilocker.gov.in", category: "SERVICES" },
    { name: "PM National Relief Fund", desc: "Direct benefit disaster assistance structural contribution asset tables.", url: "https://pmnrf.gov.in", category: "OTHERS" },
    { name: "UGC Online Gateway", desc: "Higher education standards administration and university validation records.", url: "https://www.ugc.gov.in", category: "EDUCATION" },
    { name: "Swayam Academic Portal", desc: "Centralized free online curriculum learning modules infrastructure console.", url: "https://swayam.gov.in", category: "EDUCATION" },
    { name: "UIDAI Aadhaar Matrix", desc: "National unique biometric identification profile credential management database.", url: "https://uidai.gov.in", category: "SERVICES" },
    { name: "National Cyber Crime Reporting", desc: "High-priority immediate digital fraud and hazard complaints logging desk.", url: "https://cybercrime.gov.in", category: "SERVICES" }
  ];

  // Carousel slider effect loop
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [carouselSlides.length]);

  // SCROLL-SPY ENGINE: Intersection Observer detecting active sections live
  useEffect(() => {
    const targetSections = [
      'carousel-banner',
      'about-section',
      'specifications-section',
      'links-section',
      'contact-section',
      'faq-section'
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    targetSections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Fetch submitted custom inquiries from Spring Boot
  const fetchPersonalQuestions = async (userId) => {
    if (!userId) return;
    setSyncingQuestions(true);
    try {
      const response = await fetch(`${BASE_URL}/api/questions/user/${userId}`);
      if (response.ok) {
        setUserQuestions(await response.json());
      }
    } catch (err) {
      console.error("Failed syncing personal query rows:", err);
    } finally {
      setSyncingQuestions(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchPersonalQuestions(user.id);
      const pollTimer = setInterval(() => fetchPersonalQuestions(user.id), 10000);
      return () => clearInterval(pollTimer);
    }
  }, [user]);

  // Simultaneously triggers fullscreen tricolor spinner on current page AND temporary script tab view
  const handlePortalRedirect = (e, destinationUrl) => {
    e.preventDefault();
    
    const newTabWindow = window.open('about:blank', '_blank');
    if (newTabWindow) {
      newTabWindow.document.write(`
        <html>
          <head>
            <title>BharatSeva Gateway Link</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { background-color: #0b0d16; margin: 0; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; overflow: hidden; }
              .spinner-container { position: relative; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; }
              .ring { position: absolute; inset: 0; border-radius: 50%; border: 4px solid transparent; }
              .saffron { border-top-color: #ff9933; animation: spin 1s linear infinite; }
              .white { inset: 6px; border-right-color: #ffffff; animation: spin 1.5s linear infinite reverse; }
              .green { inset: 12px; border-bottom-color: #128807; animation: spin 2s linear infinite; }
              .chakra-dot { width: 10px; height: 10px; background-color: #000080; border-radius: 50%; animation: pulse 1.2s ease-in-out infinite; }
              .text-wrapper { text-align: center; margin-top: 20px; font-weight: bold; font-size: 16px; letter-spacing: 2px; }
              .subtext { font-size: 11px; color: #64748b; margin-top: 6px; font-family: monospace; }
              @keyframes spin { 100% { transform: rotate(360deg); } }
              @keyframes pulse { 0%, 100% { transform: scale(0.8); opacity: 0.5; } 50% { transform: scale(1.2); opacity: 1; } }
            </style>
          </head>
          <body>
            <div class="spinner-container">
              <div class="ring saffron"></div>
              <div class="ring white"></div>
              <div class="ring green"></div>
              <div class="chakra-dot"></div>
            </div>
            <div class="text-wrapper">
              <span style="color: #ff9933;">L</span><span style="color: #ff9933;">o</span><span style="color: #ffffff;">a</span><span style="color: #ffffff;">d</span><span style="color: #128807;">i</span><span style="color: #128807;">n</span><span style="color: #128807;">g</span><span style="color: #000080;">...</span>
              <div class="subtext">Connecting authorized digital pipeline origin...</div>
            </div>
          </body>
        </html>
      `);
      newTabWindow.document.close();
    }

    setPortalLoading(true);

    setTimeout(() => {
      setPortalLoading(false);
      if (newTabWindow) {
        newTabWindow.location.href = destinationUrl;
      } else {
        window.open(destinationUrl, '_blank', 'noopener,noreferrer');
      }
    }, 5000);
  };

  const handleAuthSubmit = async (e) => {
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
        setUser(data);
        setShowAuthModal(false);
        window.location.reload();
      } else {
        throw new Error("Authentication challenge failed");
      }
    } catch (err) {
      const mockUser = { id: 101, name: authName || "Badduluri Nithin Kumar", email: authEmail };
      localStorage.setItem('citizen_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setShowAuthModal(false);
      window.location.reload();
    }
  };

  const handleQuerySubmit = async (e) => {
  e.preventDefault();
  if (!customQuery.trim()) return;

  if (!user) {
    setShowAuthModal(true);
    return;
  }

  const payload = {
    userId: user.id,
    userName: user.name,
    queryText: customQuery,
    status: "UNANSWERED",
    answerText: "Awaiting review inside the internal Government Console..."
  };

  // Show a loading toast while the request is in flight
  const toastId = toast.loading("Transmitting query to Government Console...");

  try {
    const response = await fetch(`${BASE_URL}/api/questions/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setCustomQuery('');
      fetchPersonalQuestions(user.id);
      
      // Dismiss the loading toast and show success
      toast.success("Query transmitted successfully!", {
        id: toastId,
        description: "Your question is now awaiting review.",
      });
    } else {
      throw new Error("Server rejected transmission");
    }
  } catch (err) {
    // Dismiss the loading toast and show error
    toast.error("Transmission failed", {
      id: toastId,
      description: "Persistence runtime could be offline. Please try again.",
    });
  }
};

  const handleLogout = () => {
    localStorage.removeItem('citizen_user');
    setUser(null);
    setUserQuestions([]);
    window.location.reload();
  };

  const filteredLinks = linkFilter === 'ALL' 
    ? governmentLinksDirectory 
    : governmentLinksDirectory.filter(item => item.category === linkFilter);

  return (

    
    <div className="flex-1 flex flex-col bg-[#f8fafc]">
      
     <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs animate-fadeIn">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
    
    {/* Logo Section */}
    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('carousel-banner')}>
      <div className="p-1 rounded-lg border border-slate-200 bg-white shadow-sm flex flex-col w-10 h-10 overflow-hidden">
        <div className="h-1/3 w-full" style={{ backgroundColor: '#FF9933' }}></div>
        <div className="h-1/3 w-full bg-white flex items-center justify-center">
          <div className="w-2 h-2 border border-[#000080] rounded-full"></div>
        </div>
        <div className="h-1/3 w-full" style={{ backgroundColor: '#138808' }}></div>
      </div>
      <div>
        <h1 className="text-lg font-black text-[#0f172a] tracking-tight flex items-center gap-1.5">
          BharatSeva AI 
          <span className="text-[9px] border font-bold uppercase tracking-wider px-2 py-0.5 rounded text-[#0f172a]" style={{ background: 'linear-gradient(90deg, #FF9933, #ffffff, #138808)', animation: 'tricolor-gradient 4s ease infinite', borderColor: '#e2e8f0' }}>PORTAL</span>
        </h1>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">One Nation, One Service</p>
      </div>
    </div>

    {/* Mobile Toggle Button */}
    <button className="lg:hidden p-2 text-slate-700" onClick={() => setMenuOpen(!menuOpen)}>
      <Menu className="h-6 w-6" />
    </button>

    {/* Navigation Links (Responsive) */}
    <nav className={`${menuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row absolute lg:static top-20 left-0 w-full lg:w-auto bg-white p-6 lg:p-0 border-b lg:border-none shadow-xl lg:shadow-none space-y-4 lg:space-y-0 lg:space-x-1.5 text-xs font-bold uppercase tracking-wider`}>
      {['Home', 'About', 'Specifications', 'Government Portals', 'Contact', 'FAQs'].map((name, idx) => {
        const ids = ['carousel-banner', 'about-section', 'specifications-section', 'links-section', 'contact-section', 'faq-section'];
        return (
          <button 
            key={idx}
            onClick={() => { scrollToSection(ids[idx]); setMenuOpen(false); }} 
            className={`px-3 py-2 rounded-lg transition-all duration-300 ${
              activeSection === ids[idx] 
                ? 'bg-[#1e3a8a] text-white shadow-[0_0_12px_rgba(30,58,138,0.4)] border border-[#1e3a8a]' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-[#1e3a8a]'
            }`}
          >
            {name}
          </button>
        );
      })}
    </nav>

    {/* Auth / Logout Section */}
    <div className="hidden lg:flex items-center space-x-3">
      {!user ? (
        <div className="flex items-center space-x-2">
          <button onClick={() => { setIsSignUp(false); setShowAuthModal(true); }} className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 px-3 py-2 rounded-lg transition">Login</button>
          <button onClick={() => { setIsSignUp(true); setShowAuthModal(true); }} className="text-xs font-bold uppercase tracking-wider text-white bg-[#1e3a8a] hover:bg-blue-950 px-4 py-2 rounded-xl transition shadow-xs hover:shadow-[0_0_15px_rgba(30,58,138,0.3)]">Sign Up</button>
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <button onClick={handleLogout} className="text-xs font-bold text-red-500 hover:underline">Logout</button>
          <div className="h-9 w-9 bg-blue-100 rounded-full flex items-center justify-center text-[#1e3a8a] font-bold text-sm border border-blue-200 uppercase">{user.name.substring(0, 2)}</div>
        </div>
      )}
    </div>
  </div>
</header>

      {/* 1. Carousel Slider Banner */}
      <div id="carousel-banner" className="relative h-[440px] w-full overflow-hidden bg-slate-900 scroll-mt-20">
        {carouselSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-gradient-to-br ${slide.bg} flex flex-col justify-center px-4 sm:px-12 lg:px-24 transition-all duration-1000 transform ${
              index === activeSlide ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-full pointer-events-none'
            }`}
          >
            <div className="max-w-4xl space-y-4">
              <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full font-bold uppercase tracking-widest inline-block animate-pulse">National Service Architecture Live</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">{slide.title}</h2>
              <p className="text-sm sm:text-lg text-slate-300 font-medium max-w-2xl leading-relaxed">{slide.tagline}</p>
              <div className="pt-4 flex flex-wrap gap-4">
                <button onClick={() => onNavigate('dashboard')} className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition shadow-lg flex items-center gap-2 transform hover:-translate-y-0.5 duration-200 hover:shadow-orange-600/40">
                  <span>Access Client Console</span><ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={() => scrollToSection('about-section')} className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition">Learn More</button>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-slate-900/40 hover:bg-slate-900/80 text-white rounded-full transition hidden sm:block"><ChevronLeft className="h-5 w-5" /></button>
        <button onClick={() => setActiveSlide((prev) => (prev + 1) % carouselSlides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-slate-900/40 hover:bg-slate-900/80 text-white rounded-full transition hidden sm:block"><ChevronRight className="h-5 w-5" /></button>
      </div>

      {/* 2. About Section */}
      <section id="about-section" className="py-16 bg-white border-b scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <h3 className="text-xs font-bold uppercase text-[#1e3a8a] tracking-widest">Platform Specification</h3>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">About BharatSeva Core Systems</h2>
            <p className="text-sm text-slate-500 leading-relaxed">BharatSeva AI functions as a unified middleware gateway designed to process public requests smoothly. By combining modern front-end layout nodes with relational Java database pipelines, we enable faster issue resolution.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 transition-all duration-300 hover:border-orange-500 hover:shadow-[0_0_20px_rgba(234,88,12,0.15)] group transform hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-110"><FileText className="h-5 w-5" /></div>
              <h4 className="font-extrabold text-sm uppercase text-slate-900 tracking-wider">Automated Triage</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Public complaints map automatically to designated municipal division desks to decrease administrative processing loops.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 transition-all duration-300 hover:border-blue-600 hover:shadow-[0_0_20px_rgba(30,58,138,0.15)] group transform hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-blue-100 text-[#1e3a8a] flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-110"><Bot className="h-5 w-5" /></div>
              <h4 className="font-extrabold text-sm uppercase text-slate-900 tracking-wider">Conversational Search</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Integrated with native text token streaming engines, allowing citizens to query platform variables via real-time chats.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_20px_rgba(220,38,38,0.15)] group transform hover:-translate-y-1">
              <div className="h-10 w-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-bold transition-transform duration-300 group-hover:scale-110"><ShieldAlert className="h-5 w-5" /></div>
              <h4 className="font-extrabold text-sm uppercase text-slate-900 tracking-wider">Emergency Telemetry</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Dedicated instant channels built directly into core hardware parameters to route priority danger flags smoothly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Specifications Section */}
      <section id="specifications-section" className="py-16 bg-slate-50 border-b scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="mb-10 text-left"><h3 className="text-xs font-bold uppercase text-[#1e3a8a] tracking-widest">Platform Design</h3><h2 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">Core Specifications & Capabilities</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex gap-4 items-start transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(30,58,138,0.15)] transform hover:-translate-y-0.5 group">
              <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-[#1e3a8a] group-hover:bg-[#1e3a8a] group-hover:text-white transition-colors duration-300"><Cpu className="h-5 w-5" /></div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">Synchronous Pooling</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Leverages high-performance RestTemplate handlers to maintain direct secure handshake tracking loops with persistent relational core indices.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex gap-4 items-start transition-all duration-300 hover:border-purple-500 hover:shadow-[0_0_15px_rgba(147,51,234,0.15)] transform hover:-translate-y-0.5 group">
              <div className="p-2.5 bg-purple-50 border border-purple-100 rounded-xl text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300"><Zap className="h-5 w-5" /></div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">Asynchronous SSE</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Employs native SseEmitter event channels to stream text tokens character-by-character back to browser window state metrics seamlessly.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex gap-4 items-start transition-all duration-300 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transform hover:-translate-y-0.5 group">
              <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300"><ShieldCheck className="h-5 w-5" /></div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">Cross-Origin Access</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">Secured with customized web filter configuration parameters to validate and permit incoming token connections safely.</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center pt-2">
            <button 
              onClick={() => onNavigate('dashboard')}
              className="bg-[#1e3a8a] hover:bg-blue-950 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-[0_0_25px_rgba(30,58,138,0.5)] flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Access Cloud Console</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Government Portals Link Directories Section */}
      <section id="links-section" className="py-16 bg-white border-b scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xs font-bold uppercase text-[#1e3a8a] tracking-widest">National Index</h3>
              <h2 className="text-xl font-black text-slate-900 tracking-tight mt-1">Useful Government Link Directories</h2>
            </div>
            
            <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-xl border self-start md:self-center">
              {[
                { id: 'ALL', label: 'All Portals' },
                { id: 'EDUCATION', label: 'Education' },
                { id: 'SERVICES', label: 'Services' },
                { id: 'OTHERS', label: 'Finances & Others' }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setLinkFilter(pill.id)}
                  className={`text-[10px] uppercase tracking-wider font-extrabold px-3 py-1.5 rounded-lg transition-all duration-300 ${
                    linkFilter === pill.id 
                      ? 'bg-[#1e3a8a] text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
            {filteredLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.url} 
                onClick={(e) => handlePortalRedirect(e, link.url)}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-[#1e3a8a] hover:shadow-[0_0_20px_rgba(30,58,138,0.12)] transition-all duration-300 group flex flex-col justify-between transform hover:-translate-y-0.5 cursor-pointer"
              >
                <div>
                  <div className="flex justify-between items-start gap-3">
                    <span className="p-1.5 rounded-lg bg-slate-50 border text-slate-400 group-hover:bg-blue-50 group-hover:text-[#1e3a8a] group-hover:border-blue-100 transition-colors duration-300">
                      {link.category === 'EDUCATION' && <GraduationCap className="h-3.5 w-3.5" />}
                      {link.category === 'SERVICES' && <FileText className="h-3.5 w-3.5" />}
                      {link.category === 'OTHERS' && <Landmark className="h-3.5 w-3.5" />}
                    </span>
                    <span className="text-[8px] tracking-widest uppercase px-1.5 py-0.5 bg-slate-100 rounded text-slate-500 font-extrabold group-hover:bg-[#1e3a8a]/10 group-hover:text-[#1e3a8a] transition-all">
                      {link.category}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-xs mt-3 group-hover:text-[#1e3a8a] transition-colors">
                    {link.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed font-medium">
                    {link.desc}
                  </p>
                </div>
                <span className="text-[10px] text-[#1e3a8a] font-bold mt-4 block tracking-wide uppercase">Open Portal &rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Contact Section */}
      <section id="contact-section" className="py-12 bg-[#f8fafc] border-b scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="space-y-2"><h3 className="text-xs font-bold uppercase text-[#1e3a8a] tracking-widest">Connect Node</h3><h2 className="text-xl font-black text-slate-900 tracking-tight">Central Control Desk</h2><p className="text-xs text-slate-500 leading-relaxed">Have questions about system connectivity, database synchronization loops, or municipal onboarding? Reach out straight to our institutional technical desk network node.</p></div>
            <div className="p-5 bg-white rounded-xl border border-slate-200 flex items-start space-x-4 transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(30,58,138,0.12)]"><div className="p-2 bg-blue-100 rounded-lg text-[#1e3a8a]"><Phone className="h-4 w-4" /></div><div><h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Helpline Channel</h4><p className="text-sm font-extrabold text-slate-900 mt-1">+91 6281144047</p><p className="text-[11px] text-slate-400 mt-0.5">Toll-Free, 24/7 Monitoring Network</p></div></div>
            <div className="p-5 bg-white rounded-xl border border-slate-200 flex items-start space-x-4 transition-all duration-300 hover:border-orange-500 hover:shadow-[0_0_15px_rgba(234,88,12,0.12)]"><div className="p-2 bg-orange-100 rounded-lg text-orange-700"><Mail className="h-4 w-4" /></div><div><h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Technical Email Box</h4><p className="text-sm font-extrabold text-slate-900 mt-1">nithinkumarbaddulur@gmail.com</p><p className="text-[11px] text-slate-400 mt-0.5">Response latency within 2 hours maximum</p></div></div>
          </div>
        </div>
      </section>

      {/* 6. FAQ Accordion Section */}
      <section id="faq-section" className="py-12 bg-white border-b scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-1"><h3 className="text-xs font-bold uppercase text-[#1e3a8a] tracking-widest">Support Core</h3><h2 className="text-xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2></div>
          <div className="space-y-3">
            {[
              { q: "How fast do civic complaints get pushed to the database?", a: "Grievances are processed immediately through our backend pipeline. Upon a successful form handshake, entries are written to your local MySQL instance within milliseconds and sync live to your active stream dashboard metrics." },
              { q: "What variables does the AI Scheme Finder evaluate?", a: "The profiling engine cross-references matching parameters including precise citizen age filters, dynamic income bounds, and academic background keys against stored indices to show eligible welfare pathways." },
              { q: "Is the real-time AI assistant chat link fully secure?", a: "Yes. All conversational payloads stream securely via asynchronous Server-Sent Events (SSE). Client cross-origin settings are strictly configured to accept traffic exclusively from authorized local client origins." },
              { q: "What happens when I press the Emergency SOS button?", a: "Pressing the SOS button instantly reads your localized geographic coordinate telemetry parameters (Lat: 13.2842° N | Long: 78.6111° E) and pushes an emergency data block over an un-throttled queue straight into the central control database node." },
              { q: "Can I track changes to my reported civic problem over time?", a: "Yes. The system utilizes a reactive model. When an assigned municipal manager modifies your issue status from PENDING to IN_PROGRESS or RESOLVED inside the administrative workstation, your live telemetry view syncs the state shift automatically." },
              { q: "Who handles the maintenance and data security of the BharatSeva infrastructure?", a: "The platform's underlying microservice endpoints, cross-origin socket pipelines, and database relations are hosted, managed, and monitored by the engineering cells at the Mother Theresa Institute of Engineering and Technology." }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden transition-all bg-[#f8fafc] hover:bg-white hover:border-blue-300 shadow-xs">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full text-left px-5 py-4 font-bold text-xs text-slate-800 flex justify-between items-center gap-4 focus:outline-none"><span className="tracking-wide text-[13px]">{faq.q}</span><span className="text-slate-400 font-mono text-sm shrink-0">{openFaq === idx ? '−' : '+'}</span></button>
                <div className={`transition-all duration-300 ease-in-out bg-slate-50 border-t border-slate-100 px-5 text-slate-500 leading-relaxed text-[11px] overflow-hidden ${openFaq === idx ? 'py-4 max-h-[200px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>{faq.a}</div>
              </div>
            ))}
          </div>

          {/* User Inquiry Submission Registry */}
          <div className="mt-12 border-t border-slate-200 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <form onSubmit={handleQuerySubmit} className="md:col-span-5 bg-white border border-slate-200 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 space-y-4">
                <div className="flex justify-between items-start"><div><h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5"><HelpCircle className="h-4 w-4 text-[#1e3a8a]" /><span>Submit Inquiry to Admin</span></h3><p className="text-[10px] text-slate-400 mt-0.5">Not in FAQs? Send it straight to our secure verification tables.</p></div>{user && <button type="button" onClick={handleLogout} className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md hover:bg-red-50 hover:text-red-600 transition">Logout</button>}</div>
                <textarea 
  rows="4" 
  inputMode="text" // Added inputMode
  value={customQuery} 
  onChange={(e) => setCustomQuery(e.target.value)} 
  placeholder={user ? "Type your detailed custom query here..." : "Type your question here (You will be prompted to authenticate upon submission)..."} 
  className="w-full text-xs p-3 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1e3a8a] focus:shadow-[0_0_12px_rgba(30,58,138,0.15)] leading-relaxed placeholder:text-slate-400 font-medium transition-all duration-300" 
  required 
/>
                <button type="submit" className="w-full bg-[#1e3a8a] hover:bg-blue-950 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-xs hover:shadow-[0_0_15px_rgba(30,58,138,0.4)]"><Send className="h-3 w-3" /> <span>Transmit Inquiry</span></button>
              </form>

              <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs h-[255px] flex flex-col hover:shadow-md transition-all duration-300">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b pb-2 mb-3 flex justify-between items-center"><span>Your Personal Ticket Registry</span>{user && <span className="text-[9px] font-mono bg-blue-50 text-[#1e3a8a] px-2 py-0.5 rounded font-bold uppercase">{userQuestions.length} Tickets</span>}</h3>
                <div className="overflow-y-auto flex-1 space-y-3 pr-1">
                  {!user ? <div className="text-center py-12 space-y-2"><p className="text-xs text-slate-400">Anonymous session restricted.</p><button type="button" onClick={() => { setIsSignUp(false); setShowAuthModal(true); }} className="text-xs text-[#1e3a8a] font-bold hover:underline transition-colors duration-200">Sign In or Sign Up to track custom responses live &rarr;</button></div> : userQuestions.length === 0 ? <p className="text-xs text-slate-300 text-center py-16">No tickets recorded for your citizen profile identifier key yet.</p> : userQuestions.map((q) => (<div key={q.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs hover:border-slate-300 transition-all duration-300"><div className="flex justify-between items-start gap-4"><p className="font-extrabold text-slate-800 leading-relaxed">{q.queryText}</p><span className={`text-[8px] font-black tracking-wide px-1.5 py-0.5 uppercase rounded-xs shrink-0 ${q.status === 'ANSWERED' ? 'bg-emerald-100 text-emerald-800 shadow-[0_0_8px_rgba(16,185,129,0.2)]' : 'bg-amber-100 text-amber-800 shadow-[0_0_8px_rgba(245,158,11,0.2)]'}`}>{q.status}</span></div><div className="bg-white border border-slate-100 rounded-lg p-2.5 space-y-1"><p className="text-[9px] text-[#1e3a8a] font-bold uppercase tracking-wider flex items-center gap-1"><MessageSquare className="h-2.5 w-2.5" /> Admin Desk Response:</p><p className="text-slate-500 font-medium leading-relaxed text-[11px]">{q.answerText}</p></div></div>))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RESTRUCTURED: Vertical Directory Block Panel */}
      <section className="bg-slate-50 border-t border-slate-200 py-12 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-[#1e3a8a] text-left">BharatSeva Portal</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            {/* Column 1: Navigation Links (Vertical Left Structure) */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b pb-2">Navigation</h4>
              <div className="flex flex-col space-y-2 text-xs font-bold text-slate-600">
                <button onClick={() => scrollToSection('carousel-banner')} className="text-left hover:text-[#1e3a8a] transition duration-200">Home</button>
                <button onClick={() => scrollToSection('about-section')} className="text-left hover:text-[#1e3a8a] transition duration-200">About</button>
                <button onClick={() => scrollToSection('specifications-section')} className="text-left hover:text-[#1e3a8a] transition duration-200">Specifications</button>
                <button onClick={() => scrollToSection('links-section')} className="text-left hover:text-[#1e3a8a] transition duration-200">Government Portals</button>
                <button onClick={() => scrollToSection('contact-section')} className="text-left hover:text-[#1e3a8a] transition duration-200">Contact</button>
                <button onClick={() => scrollToSection('faq-section')} className="text-left hover:text-[#1e3a8a] transition duration-200">FAQs</button>
              </div>
            </div>

            {/* Column 2: Policies Block (Updated with modal triggers) */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 border-b pb-2">Policies</h4>
              <div className="flex flex-col space-y-2 text-xs font-bold text-slate-600">
                <button onClick={() => setActivePolicy('copyright')} className="text-left hover:text-[#1e3a8a] transition">Copyright Policy</button>
                <button onClick={() => setActivePolicy('privacy')} className="text-left hover:text-[#1e3a8a] transition">Privacy Policy</button>
                <button onClick={() => setActivePolicy('terms')} className="text-left hover:text-[#1e3a8a] transition">Terms and Conditions</button>
                <button onClick={() => setActivePolicy('disclaimer')} className="text-left hover:text-[#1e3a8a] transition">Disclaimer</button>
                <button onClick={() => setActivePolicy('hyperlink')} className="text-left hover:text-[#1e3a8a] transition">Hyperlink Policy</button>
                <button onClick={() => setActivePolicy('sitemap')} className="text-left hover:text-[#1e3a8a] transition">Site Map</button>
              </div>
            </div>

            {/* Column 3: Cloud Console Quick Access (Vertical Right Structure - Redesigned with custom Indian Flag themed gradient glow parameters) */}
            <div className="space-y-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden group">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-[#1e3a8a]">System Management</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Authorized terminal entrance for core synchronization and Spring persistence tracking monitors.</p>
              </div>

              {/* PREMIUM HIGH-ATTENTION INDIAN TRICOLOR GLOW CALL-TO-ACTION LAYOUT BUTTON */}
              <div className="relative p-[2px] rounded-xl overflow-hidden bg-gradient-to-r from-[#ff9933] via-slate-200 to-[#128807] shadow-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,88,12,0.35)] animate-pulse">
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="w-full bg-[#0f172a] text-white font-extrabold text-xs uppercase tracking-widest py-3 rounded-[10px] transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-[#111827]"
                >
                  <span className="bg-gradient-to-r from-[#ff9933] via-white to-[#128807] bg-clip-text text-transparent drop-shadow-md">
                    Access Cloud Console
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#ff9933] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* POLICY MODAL OVERLAY */}
      {activePolicy && (
        <div className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-sm uppercase text-[#1e3a8a] tracking-wider">{policyContent[activePolicy]?.title}</h3>
              <button onClick={() => setActivePolicy(null)} className="text-slate-400 hover:text-red-500 text-2xl font-bold transition">&times;</button>
            </div>
            <div className="p-6 text-slate-600 text-xs leading-relaxed overflow-y-auto">
              <p>{policyContent[activePolicy]?.body}</p>
            </div>
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 text-right">
              <button onClick={() => setActivePolicy(null)} className="text-[10px] font-bold uppercase text-slate-500 hover:text-[#1e3a8a] transition">Close Window</button>
            </div>
          </div>
        </div>
      )}

          </div>
        </div>
      </section>

      {/* AUTH OVERLAY MODAL FORM LIGHTBOX */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-[0_0_50px_rgba(30,58,138,0.3)] border border-slate-200 flex flex-col overflow-hidden animate-scaleIn">
            <div className="bg-[#0f172a] px-5 py-3.5 text-white flex justify-between items-center">
              <h3 className="font-bold text-xs uppercase tracking-wide flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-orange-400 animate-pulse" />
                <span>{isSignUp ? "Register Portal Profile" : "Verify Identity Record"}</span>
              </h3>
              <button onClick={() => setShowAuthModal(false)} className="text-slate-400 hover:text-white text-xl font-bold">&times;</button>
            </div>
            
            <form onSubmit={handleAuthSubmit} className="p-5 space-y-3.5">
              {isSignUp && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input type="text" value={authName} onChange={(e) => setAuthName(e.target.value)} className="w-full text-xs pl-9 pr-3 py-2 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1e3a8a] focus:shadow-[0_0_10px_rgba(30,58,138,0.15)] transition-all duration-300" placeholder="Badduluri Nithin Kumar" required />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email Coordinates</label>
                {/* Email Input */}
<div className="relative">
  <FileText className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
  <input 
    type="email" 
    inputMode="email" // Added inputMode
    value={authEmail} 
    onChange={(e) => setAuthEmail(e.target.value)} 
    className="w-full text-xs pl-9 pr-3 py-2 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1e3a8a] focus:shadow-[0_0_10px_rgba(30,58,138,0.15)] transition-all duration-300" 
    placeholder="citizen@seva.gov.in" 
    required 
  />
</div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Security Key Password</label>
                {/* Password Input */}
<div className="relative">
  <Lock className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
  <input 
    type="password" 
    value={authPassword} 
    onChange={(e) => setAuthPassword(e.target.value)} 
    className="w-full text-xs pl-9 pr-3 py-2 border rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:border-[#1e3a8a] focus:shadow-[0_0_10px_rgba(30,58,138,0.15)] transition-all duration-300" 
    required 
  />
</div>
              </div>

              <button type="submit" className="w-full bg-[#1e3a8a] hover:bg-blue-950 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 mt-2 shadow-xs hover:shadow-[0_0_15px_rgba(30,58,138,0.4)] transform active:scale-98">
                <span>{isSignUp ? "Create Secure Identity" : "Access Console"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>

            <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
              <button onClick={() => setIsSignUp(!isSignUp)} className="text-[11px] text-[#1e3a8a] font-bold hover:underline transition-colors duration-200">
                {isSignUp ? "Already have an account? Sign In" : "New user? Setup secure identity record"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NATIONAL INDIAN TRICOLOR HIGH-PERFORMANCE INTERSTITIAL SPINNER MODAL VIEW LIGHTBOX */}
      {portalLoading && (
        <div className="fixed inset-0 z-50 bg-[#090d16]/85 backdrop-blur-md flex flex-col items-center justify-center space-y-6 select-none animate-fadeIn">
          
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-t-[#ff9933] border-r-transparent border-b-transparent border-l-transparent animate-spin duration-700" />
            <div className="absolute inset-1 rounded-full border-4 border-r-[#ffffff]/90 border-t-transparent border-b-transparent border-l-transparent animate-spin duration-1000 reverse" />
            <div className="absolute inset-2 rounded-full border-4 border-b-[#128807] border-t-transparent border-r-transparent border-l-transparent animate-spin duration-1500" />
            <div className="w-3 h-3 bg-[#000080] rounded-full animate-ping shadow-[0_0_12px_rgba(0,0,128,0.8)]" />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-lg font-black tracking-widest uppercase flex items-center justify-center gap-0.5">
              <span className="text-[#ff9933]">L</span>
              <span className="text-[#ff9933]">o</span>
              <span className="text-white">a</span>
              <span className="text-white">d</span>
              <span className="text-[#128807]">i</span>
              <span className="text-[#128807]">n</span>
              <span className="text-[#128807]">g</span>
              <span className="text-[#000080] animate-bounce">.</span>
              <span className="text-[#000080] animate-bounce delay-100">.</span>
              <span className="text-[#000080] animate-bounce delay-200">.</span>
            </h2>
            <p className="text-[10px] font-mono text-slate-400 tracking-wider max-w-[280px] leading-relaxed">
              Establishing asynchronous secure pipeline tracking link loop...
            </p>
          </div>

        </div>
      )}

    </div>
  );
}