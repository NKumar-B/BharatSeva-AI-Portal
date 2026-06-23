import React, { useState } from 'react';
import { 
  Bot, X, FileText, ShieldAlert, Sparkles, Building2, 
  CreditCard, Search, UserCheck, Inbox, AlertTriangle, Stethoscope 
} from 'lucide-react';

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Namaskar! I am your BharatSeva AI Assistant. How can I facilitate your access to national services today?' }
  ]);

  const options = [
    { label: 'REPORT CIVIC ISSUE', action: 'GRIEVANCE', icon: FileText },
    { label: 'CHECK SCHEME ELIGIBILITY', action: 'SCHEME', icon: Sparkles },
    { label: 'TRACK APPLICATION STATUS', action: 'TRACK', icon: Search },
    { label: 'DBT BENEFIT STATUS', action: 'DBT', icon: CreditCard },
    { label: 'EMERGENCY SOS', action: 'SOS', icon: ShieldAlert },
    { label: 'TELEMEDICINE DIAGNOSTICS', action: 'TELEMEDICINE', icon: Stethoscope },
    { label: 'PLATFORM SPECS', action: 'SPECS', icon: Building2 },
    { label: 'RAISE SUPPORT TICKET', action: 'TICKET', icon: Inbox }
  ];

  const handleOptionClick = (opt) => {
    setMessages(prev => [...prev, { sender: 'user', text: opt.label }]);
    
    const botResponse = getResponse(opt.action);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 600);
  };

  const getResponse = (action) => {
    switch(action) {
      case 'GRIEVANCE': return "You can report municipal or civic issues via the 'Report Civic Issue' section on your dashboard. Our system will route your ticket to the relevant municipal authority.";
      case 'SCHEME': return "Our AI Profiler Engine evaluates your demographic data, income, and educational background to match you with active national welfare schemes.";
      case 'TRACK': return "Please navigate to the 'Application Registry' in your portal dashboard to view the real-time status of your pending requests.";
      case 'DBT': return "You can track the credit status of Direct Benefit Transfers by visiting the 'Financial Records' node in your portal dashboard.";
      case 'SOS': return "In a critical situation, activate the SOS node. This will immediately push your real-time geographic telemetry coordinates to our emergency response control center.";
      case 'TELEMEDICINE': return "The Telemedicine diagnostic node allows you to map symptoms to potential health conditions and suggests preliminary medical guidance. Please navigate to the Telemedicine module to begin your diagnostic session.";
      case 'SPECS': return "BharatSeva AI is built on a distributed microservice architecture, utilizing secure Spring Boot persistence layers and real-time asynchronous event streaming.";
      case 'TICKET': return "If your issue remains unresolved, please open a formal support ticket. Our administrative desk will review your submission and provide an update within 24-48 hours.";
      default: return "How else can I assist with your national service navigation?";
    }
  };

  return (
    <div className="fixed bottom-24 right-8 w-80 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(30,58,138,0.3)] border border-slate-200 flex flex-col overflow-hidden z-[100]">
      
{/* Header with Tricolor accent */}
<div className="bg-[#0f172a] p-4 text-white flex justify-between items-center border-b-4 border-orange-500">
  <div className="flex items-center gap-3">
    {/* Circular Flag Icon replacing the Bot icon */}
    <div className="w-8 h-8 rounded-full overflow-hidden relative border border-white/20">
        <div className="absolute inset-0 bg-[#FF9933] h-1/3"></div>
        <div className="absolute inset-0 top-1/3 bg-white h-1/3 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full border border-[#000080]"></div>
        </div>
        <div className="absolute inset-0 top-2/3 bg-[#138808] h-1/3"></div>
    </div>
    
    {/* Updated Title */}
    <h3 className="text-[14px] font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-400">
      NavaBharat AI
    </h3>
  </div>
  <button onClick={onClose} className="hover:text-red-400 transition"><X className="h-4 w-4" /></button>
</div>

      <div className="p-4 space-y-3 max-h-96 overflow-y-auto bg-slate-50/50">
        {messages.map((msg, i) => (
          <div key={i} className={`p-3 text-[11px] rounded-xl leading-relaxed ${msg.sender === 'bot' ? 'bg-white border shadow-sm' : 'bg-[#1e3a8a] text-white self-end'}`}>
            {msg.text}
          </div>
        ))}
        
        <div className="grid grid-cols-2 gap-2 pt-2">
          {options.map((opt) => (
            <button 
              key={opt.label}
              onClick={() => handleOptionClick(opt)}
              className="flex flex-col items-center gap-2 text-[9px] font-bold border border-slate-200 bg-white text-slate-700 p-3 rounded-xl hover:border-[#1e3a8a] hover:text-[#1e3a8a] transition shadow-sm text-center"
            >
              <opt.icon className="h-4 w-4" />
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}