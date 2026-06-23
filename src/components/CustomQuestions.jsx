import React, { useState, useEffect } from 'react';
import { Send, MessageSquare, Clock, CheckCircle2, User, HelpCircle, RefreshCw } from 'lucide-react';

export default function CustomQuestions({ user }) {
  const [questions, setQuestions] = useState([]);
  const [inputText, setInputText] = useState('');
  const [syncing, setSyncing] = useState(false);

  // Fetch only this specific user's submitted questions from Spring Boot
  const fetchUserQuestions = async () => {
    setSyncing(true);
    try {
      const response = await fetch(`http://localhost:8080/api/questions/user/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      }
    } catch (err) {
      console.error("Failed synchronizing personal query stream:", err);
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    fetchUserQuestions();
    // Auto polling check loop every 8 seconds to catch console admin replies live
    const interval = setInterval(fetchUserQuestions, 8000);
    return () => clearInterval(interval);
  }, [user.id]);

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const payload = {
      userId: user.id,
      userName: user.name,
      queryText: inputText,
      status: "UNANSWERED",
      answerText: "Awaiting triage inside the internal Government Console..."
    };

    try {
      const response = await fetch('http://localhost:8080/api/questions/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setInputText('');
        fetchUserQuestions();
      }
    } catch (err) {
      alert("Failed transmission payload. Persistence server down.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 my-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold text-xs uppercase">
            {user.name.substring(0,2)}
          </div>
          <div>
            <h4 className="text-xs text-slate-400 uppercase font-mono font-semibold">Active Citizen Profile</h4>
            <p className="text-sm font-extrabold text-slate-800">{user.name} ({user.email})</p>
          </div>
        </div>
        <button onClick={fetchUserQuestions} className="p-2 text-slate-400 hover:text-[#1e3a8a] transition" title="Refresh Query Table">
          <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Form: Query Submission Block */}
        <form onSubmit={handleQuestionSubmit} className="md:col-span-5 bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-[#1e3a8a]" />
              <span>Submit Inquiry to Admin</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Your issue routes directly onto the Gov Console database rows.</p>
          </div>
          <textarea
            rows="4"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your detailed query regarding scholarship conditions, ward divisions, or tracking metrics..."
            className="w-full text-xs p-3 border rounded-xl focus:outline-[#1e3a8a] bg-slate-50 leading-relaxed"
            required
          />
          <button type="submit" className="w-full bg-[#1e3a8a] hover:bg-blue-950 text-white font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs">
            <Send className="h-3 w-3" /> Transmit Inquiry
          </button>
        </form>

        {/* Right Section: Streamed Query & Response Logs */}
        <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs h-[360px] flex flex-col">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider border-b pb-2 mb-3 flex justify-between items-center">
            <span>Your Personal Query Registry</span>
            <span className="text-[10px] font-mono bg-blue-50 text-[#1e3a8a] px-2 py-0.5 rounded-md font-bold uppercase">{questions.length} Tickets</span>
          </h3>

          <div className="overflow-y-auto flex-1 space-y-4 pr-1">
            {questions.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-24">No custom inquiries tracked for this citizen payload context profile key yet.</p>
            ) : (
              questions.map((q) => (
                <div key={q.id} className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3 text-xs">
                  <div className="flex justify-between items-start gap-4">
                    <p className="font-extrabold text-slate-800 leading-relaxed">{q.queryText}</p>
                    <span className={`text-[9px] font-black tracking-wide px-2 py-0.5 uppercase rounded-sm shrink-0 ${
                      q.status === 'ANSWERED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {q.status}
                    </span>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-lg p-3 space-y-1.5">
                    <p className="text-[10px] text-[#1e3a8a] font-bold uppercase tracking-wider flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" /> Admin Desk Response:
                    </p>
                    <p className="text-slate-600 font-medium leading-relaxed">{q.answerText}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}