import React, { useState, useEffect } from 'react';
// import { Toaster, toast } from 'sonner';
import { 
  Briefcase, Key, Lock, MapPin, RefreshCw, 
  Clock, CheckCircle2, Activity, Send, Building2, ShieldAlert, ArrowLeft
} from 'lucide-react';

const FlagIcon = () => (
  <div className="w-7 h-7 rounded-lg overflow-hidden flex flex-col shadow-sm border border-slate-700">
    <div className="flex-1 bg-[#FF9933]"></div>
    <div className="flex-1 bg-white flex items-center justify-center">
      <div className="w-1.5 h-1.5 rounded-full border border-[#000080]"></div>
    </div>
    <div className="flex-1 bg-[#138808]"></div>
  </div>
);

export default function Admin({ onBack }) {

    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const [currentView, setCurrentView] = useState('auth'); // 'auth' or 'dashboard'
  const [secretInput, setSecretInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [dbComplaints, setDbComplaints] = useState([]);
  const [dbAlerts, setDbAlerts] = useState([]); // Dynamic state array for SOS payloads
  const [loading, setLoading] = useState(false);

  // Add to your state declarations in admin.jsx
const [userQuestions, setUserQuestions] = useState([]);

  // Fetch data pools from both Spring Boot REST API endpoints simultaneously
  const fetchAllSystemData = async () => {
    setLoading(true);
    try {
      // 1. Fetch complaints
      const response = await fetch(`${BASE_URL}/api/complaints/all`);
      if (response.ok) {
        const data = await response.json();
        setDbComplaints(data);
      }

      // 2. Fetch live SOS alerts
      const alertResponse = await fetch(`${BASE_URL}/api/emergency/all`);
      if (alertResponse.ok) {
        const alertData = await alertResponse.json();
        setDbAlerts(alertData);
      }

      // 3. Fetch user-submitted questions for the dashboard Q&A section
      const questionResponse = await fetch(`${BASE_URL}/api/questions/all`);
    if (questionResponse.ok) {
      setUserQuestions(await questionResponse.json());
    }

    } catch (err) {
      console.error("Failed fetching database records:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentView === 'dashboard') {
      fetchAllSystemData();
    }
  }, [currentView]);

  const handleAnswerQuestion = async (id, answerText) => {
  try {
    const response = await fetch(`${BASE_URL}/api/questions/${id}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer: answerText })
    });
    if (response.ok) {
      toast.success("Response Sent", { description: "Citizen inquiry has been updated." });
      fetchAllSystemData(); // Refresh list
    }
  } catch (err) {
    toast.error("Failed", { description: "Could not post answer to database." });
  }
};

  // Administrative verification gateway loop
  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (secretInput === 'Nithin@7893') {
      setAuthError('');
      setSecretInput('');
      setCurrentView('dashboard');
    } else {
      setAuthError('Access Denied: Invalid Security Clearance Code.');
    }
  };

  // Government Employee Status Modifier Action
  const handleUpdateStatus = async (id, status) => {
  try {
    const response = await fetch(`${BASE_URL}/api/complaints/${id}/status?newStatus=${status}`, {
      method: 'PUT'
    });
    if (response.ok) {
      toast.success(`Issue ${status === 'RESOLVED' ? 'Resolved' : 'Updated'}`, {
        description: `Grievance #${id} has been marked as ${status}.`
      });
      fetchAllSystemData(); 
    }
  } catch (err) {
    toast.error("Update Failed", {
      description: "Could not write status update package to database."
    });
  }
};

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col antialiased">
      {/* <Toaster position="top-right" richColors /> */}
      {/* Top Sovereign Tri-Color Banner Accent */}
      <div className="bg-gradient-to-r from-orange-600 via-white to-emerald-600 h-1.5 w-full" />

     {/* Official Gov Header */}
      <header className="bg-white border-b border-slate-200 shadow-xs sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* The Back Button added here */}
            {/* <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg transition">
              <ArrowLeft className="h-6 w-6 text-slate-600" />
            </button> */}
            
            <div className="bg-slate-900 p-1.5 rounded-xl shadow-xs">
              <FlagIcon />
            </div>
            
            <div>
              <h1 className="text-xl font-extrabold text-[#0f172a] tracking-tight flex items-center gap-2">
                BharatSeva AI 
                <span className="text-[10px] bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">
                  Internal Gov Portal
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">
                One Nation, One Citizen Service Platform
              </p>
            </div>
          </div>
          
          <div className="text-xs text-slate-400 font-mono font-bold uppercase">
            {currentView === 'dashboard' ? '🔴 Secure Session Active' : '🔒 Secure Node'}
          </div>
        </div>
      </header>

      {/* Main Content Workspace View Switcher */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW A: AUTHENTICATION CHALLENGE FORM */}
        {currentView === 'auth' && (
          <div className="max-w-md mx-auto mt-16 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-slate-900 p-6 text-center text-white">
              <Key className="h-8 w-8 mx-auto mb-2 text-purple-400" />
              <h3 className="text-base font-bold uppercase tracking-wider">National Security Gateway</h3>
              <p className="text-xs text-slate-400 mt-1">Authorized Department Personnel Credentials Required.</p>
            </div>
            <form onSubmit={handleAdminAuth} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Secret Access Key</label>
                <input 
                  type="password" 
                  value={secretInput} 
                  onChange={(e) => setSecretInput(e.target.value)} 
                  className="w-full text-sm px-3 py-2.5 border rounded-xl bg-slate-50 focus:outline-slate-900 font-mono tracking-widest"
                  placeholder="••••••••••••"
                  required 
                />
              </div>
              {authError && <p className="text-xs text-red-600 font-bold bg-red-50 p-2.5 rounded-lg border border-red-100">{authError}</p>}
              <button type="submit" className="w-full bg-slate-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition shadow-xs">
                Verify Credentials
              </button>
            </form>
          </div>
        )}

        {/* VIEW B: ISOLATED AUTHORIZED GOVERNMENT LEDGER DASHBOARD */}
        {currentView === 'dashboard' && (
          <div className="space-y-6">
            {/* Control Panel Header Row */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xs flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold tracking-tight">Centralized Command & Redressal Ledger</h2>
                <p className="text-xs text-slate-400 mt-1">Official Municipal Response Workspace Node — Authorized Credentials Profile.</p>
              </div>
              <button onClick={fetchAllSystemData} className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition">
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* CRITICAL LIVE SOS BROADCAST NODE FEED */}
            <div className="bg-red-50/50 border border-red-200 rounded-2xl p-5 shadow-inner">
              <div className="flex items-center space-x-2 text-red-700 mb-4">
                <ShieldAlert className="h-5 w-5 animate-pulse" />
                <h3 className="text-xs font-black uppercase tracking-wider">Active Incoming SOS Emergency Broadcasts ({dbAlerts.length})</h3>
              </div>
              
              {dbAlerts.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No incoming geolocation emergency triggers detected in current queue session.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {dbAlerts.map((alert) => (
                    <div key={alert.id} className="bg-white border border-red-200 p-4 rounded-xl shadow-xs flex flex-col justify-between space-y-2 border-l-4 border-l-red-600">
                      <div>
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-mono bg-red-100 text-red-800 px-2 py-0.5 rounded font-bold uppercase">Critical SOS</span>
                          <span className="text-[9px] text-slate-400 font-semibold">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-sm font-bold text-slate-900 mt-1">Emergency Dispatch Node</p>
                      </div>
                      <div className="text-xs font-mono text-slate-600 bg-slate-50 p-2 rounded-lg flex items-center gap-1.5 border">
                        <MapPin className="h-3.5 w-3.5 text-red-600" />
                        <span>{alert.latitude} | {alert.longitude}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Metrics Indicators Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 border rounded-xl flex items-center justify-between shadow-xs">
                <div><p className="text-slate-400 font-bold text-[10px] uppercase">Pending Triage</p><p className="text-xl font-black text-slate-900">{dbComplaints.filter(c => c.status === 'PENDING').length}</p></div>
                <Clock className="text-amber-500 h-5 w-5" />
              </div>
              <div className="bg-white p-4 border rounded-xl flex items-center justify-between shadow-xs">
                <div><p className="text-slate-400 font-bold text-[10px] uppercase">Active Investigation</p><p className="text-xl font-black text-slate-900">{dbComplaints.filter(c => c.status === 'IN_PROGRESS').length}</p></div>
                <Activity className="text-blue-500 h-5 w-5" />
              </div>
              <div className="bg-white p-4 border rounded-xl flex items-center justify-between shadow-xs">
                <div><p className="text-slate-400 font-bold text-[10px] uppercase">Resolved Ledger</p><p className="text-xl font-black text-slate-900">{dbComplaints.filter(c => c.status === 'RESOLVED').length}</p></div>
                <CheckCircle2 className="text-emerald-500 h-5 w-5" />
              </div>
            </div>

            {/* Main Interactive Grid Table */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b font-bold text-xs text-slate-500 uppercase tracking-wider">
                Incoming Public Infrastructure Grievance Queue
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-400 font-bold border-b border-slate-100">
                      <th className="p-4">ID</th>
                      <th className="p-4">Issue Description</th>
                      <th className="p-4">Department Classification</th>
                      <th className="p-4">Location/Ward</th>
                      <th className="p-4">Live Status State</th>
                      <th className="p-4 text-right">Administrative Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dbComplaints.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-slate-400">No public complaints currently assigned to this grid pipeline.</td>
                      </tr>
                    ) : (
                      dbComplaints.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition">
                          <td className="p-4 font-mono font-bold text-slate-400">#BS-{item.id}</td>
                          <td className="p-4">
                            <p className="font-bold text-slate-900">{item.title}</p>
                            <p className="text-[11px] text-slate-400 max-w-xs truncate">{item.description}</p>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 bg-slate-100 border text-slate-700 rounded font-semibold">{item.category}</span>
                          </td>
                          <td className="p-4 text-slate-500 font-medium flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-slate-400" /> {item.location}
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide ${
                              item.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                              item.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                            <button 
                              onClick={() => handleUpdateStatus(item.id, 'IN_PROGRESS')}
                              className="px-2.5 py-1.5 bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 rounded-md transition"
                              disabled={item.status === 'RESOLVED'}
                            >
                              Investigate
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(item.id, 'RESOLVED')}
                              className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100 rounded-md transition"
                              disabled={item.status === 'RESOLVED'}
                            >
                              Resolve Issue
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>


            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mt-8">
  <div className="p-4 bg-slate-50 border-b font-bold text-xs text-slate-500 uppercase tracking-wider">
    Citizen Inquiry Registry
  </div>
  <table className="w-full text-left text-xs">
    <tbody className="divide-y">
      {userQuestions.map((q) => (
        <tr key={q.id}>
          <td className="p-4 font-bold">{q.userName}</td>
          <td className="p-4 text-slate-600">{q.queryText}</td>
          <td className="p-4">
  {q.status === 'UNANSWERED' ? (
    <div className="flex gap-2">
      <input 
        type="text" 
        placeholder="Type answer..." 
        className="border rounded p-1.5 text-xs w-48"
        // Use a local state for the input if you prefer, 
        // or just grab the value via a button click as shown below
        id={`answer-input-${q.id}`}
      />
      <button 
        onClick={() => {
          const val = document.getElementById(`answer-input-${q.id}`).value;
          if(val) handleAnswerQuestion(q.id, val);
        }}
        className="bg-[#1e3a8a] text-white px-3 py-1 rounded text-[10px] font-bold uppercase hover:bg-blue-950"
      >
        Send
      </button>
    </div>
  ) : (
    <span className="text-emerald-600 font-bold text-[10px]">
      Responded: {q.answerText}
    </span>
  )}
</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

          </div>

          
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-semibold text-slate-300">© 2026 BharatSeva AI Portal. Internal Municipal Service Network Architecture.</p>
        </div>
      </footer>
    </div>
  );
}