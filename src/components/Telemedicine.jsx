import React, { useState } from 'react';

export default function Telemedicine() {

   const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState(null);

  const symptomList = ["Fever", "Cough", "Headache", "Fatigue", "Stomach Pain", "Nausea"];

  const handleDiagnose = async () => {
  const query = symptoms.join(',').toLowerCase();
  console.log("Sending request to:", `${BASE_URL}/api/telemedicine/diagnose?symptoms=${query}`);
  
  try {
    const response = await fetch(`${BASE_URL}/api/telemedicine/diagnose?symptoms=${query}`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.text();
    console.log("Received data:", data); // Check console to see if data arrives
    setResult(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold text-[#0f172a]">Telemedicine Diagnostic Node</h1>
      <div className="bg-white p-6 rounded-2xl border shadow-sm mt-4">
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Select your current symptoms:</label>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {symptomList.map(s => (
            <button 
              key={s}
              onClick={() => setSymptoms([...symptoms, s])}
              className={`p-3 rounded-lg text-xs font-bold border ${symptoms.includes(s) ? 'bg-[#1e3a8a] text-white' : 'bg-white'}`}
            >
              {s}
            </button>
          ))}
        </div>
        <button onClick={handleDiagnose} className="w-full bg-[#FF9933] text-white py-3 rounded-xl font-bold uppercase text-xs">
          Analyze Symptoms
        </button>
        {result && <div className="mt-6 p-4 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-bold">{result}</div>}
      </div>
    </div>
  );
}