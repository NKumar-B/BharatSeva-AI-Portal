import React from 'react';
import { Menu } from 'lucide-react';

export default function Header({ 
  user, menuOpen, setMenuOpen, scrollToSection, 
  setIsSignUp, setShowAuthModal, handleLogout, activeSection 
}) {
  const navItems = [
    { name: 'Home', id: 'carousel-banner' },
    { name: 'About', id: 'about-section' },
    { name: 'Specifications', id: 'specifications-section' },
    { name: 'Government Portals', id: 'links-section' },
    { name: 'Contact', id: 'contact-section' },
    { name: 'FAQs', id: 'faq-section' }
  ];

  return (
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
            <h1 className="text-lg font-black text-[#0f172a] tracking-tight">BharatSeva AI</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Portal Workspace</p>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 text-slate-700" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="h-6 w-6" />
        </button>

        {/* Nav Links (Includes active section styling) */}
        <nav className={`${menuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row absolute lg:static top-20 left-0 w-full lg:w-auto bg-white p-6 lg:p-0 border-b lg:border-none shadow-xl lg:shadow-none space-y-4 lg:space-y-0 lg:space-x-1.5 text-xs font-bold uppercase tracking-wider`}>
          {navItems.map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => { scrollToSection(item.id); setMenuOpen(false); }} 
              className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                activeSection === item.id 
                  ? 'bg-[#1e3a8a] text-white shadow-[0_0_12px_rgba(30,58,138,0.4)] border border-[#1e3a8a]' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#1e3a8a]'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Auth Button */}
        <div className="hidden lg:flex items-center space-x-3">
          {!user ? (
            <div className="flex items-center space-x-2">
                <button onClick={() => { setIsSignUp(false); setShowAuthModal(true); }} className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 px-3 py-2 rounded-lg transition">Login</button>
                <button onClick={() => { setIsSignUp(true); setShowAuthModal(true); }} className="text-xs font-bold uppercase tracking-wider text-white bg-[#1e3a8a] px-4 py-2 rounded-xl transition shadow-xs hover:shadow-[0_0_15px_rgba(30,58,138,0.3)]">Sign Up</button>
            </div>
          ) : (
            <button onClick={handleLogout} className="text-xs font-bold text-red-500">Logout</button>
          )}
        </div>
      </div>
    </header>
  );
}