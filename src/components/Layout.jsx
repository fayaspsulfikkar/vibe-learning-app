import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Clock, BrainCircuit, User, LogOut, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Sidebar() {
  const { user, studyTime, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!user) return null;

  const navLinks = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/course', icon: <BookOpen size={20} />, label: 'My Courses' },
    { to: '/attendance', icon: <Clock size={20} />, label: 'Attendance' },
    { to: '/quiz', icon: <BrainCircuit size={20} />, label: 'Quizzes' },
    { to: '/account', icon: <User size={20} />, label: 'Account' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  const formatStudyTime = (mins) => {
    if (mins < 60) return `${mins}m`;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  return (
    <aside className="sidebar fade-in">
      <div style={{ padding: '28px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.5)' }}>
        <h1 style={{ fontSize: '17px', color: '#1a1a2e', marginBottom: '4px', fontWeight: 600 }}>Vibe LMS</h1>
        <div style={{ fontSize: '10px', color: '#9898b8', letterSpacing: '0.05em' }}>
          LEARNING PLATFORM
        </div>
      </div>
      
      <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
           <span style={{ fontSize: '26px', fontWeight: 600, color: '#1a1a2e', fontFamily: 'var(--font-head)', letterSpacing: '-0.03em' }}>
             {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
           </span>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', color: '#10b981', fontWeight: 600, letterSpacing: '0.05em' }}>
             <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', animation: 'pulse 2s infinite alternate', boxShadow: '0 0 8px var(--success)' }} />
             ATTENDANCE ACTIVE
           </div>
         </div>
         
         <div>
             <div style={{ fontSize: '10px', color: '#9898b8', display: 'flex', justifyContent: 'space-between', marginBottom: '6px', letterSpacing: '0.04em', fontWeight: 500 }}
             >
               <span>CURRENT SESSION</span>
               <span style={{ color: '#1a1a2e' }}>{formatStudyTime(studyTime)}</span>
             </div>
             <div style={{ height: '3px', background: 'rgba(99,102,241,0.12)', borderRadius: '2px', overflow: 'hidden' }}>
               <div style={{ height: '100%', width: '100%', background: 'var(--success)', animation: 'pulse 2s infinite alternate' }} />
             </div>
         </div>
      </div>

      <nav style={{ padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => 
              isActive 
                ? 'nav-item active' 
                : 'nav-item'
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.5)' }}>
        <button 
          onClick={() => window.dispatchEvent(new Event('trigger-pwa-install'))}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', color: '#6366f1', background: 'rgba(99,102,241,0.08)', borderRadius: '10px', transition: 'all 0.2s', marginBottom: '8px', border: '1px solid rgba(99,102,241,0.2)' }}
          className="install-btn"
        >
          <Download size={18} color="var(--primary)" />
          <span style={{ fontWeight: 600 }}>Install as App</span>
        </button>
        <button 
          onClick={handleLogout}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', color: '#9898b8', borderRadius: '10px', transition: 'background 0.2s', fontSize: '13px' }}
          className="logout-btn"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      <style>{`
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 10px;
          color: #6b6b8a;
          font-weight: 400;
          transition: all 0.25s cubic-bezier(0.34, 1.2, 0.64, 1);
          font-size: 13px;
        }
        .nav-item:hover {
          background: rgba(255,255,255,0.5);
          color: #1a1a2e;
        }
        .nav-item.active {
          background: rgba(99,102,241,0.12);
          color: #6366f1;
          border-left: 2px solid #6366f1;
          padding-left: 12px;
        }
        .install-btn:hover {
          background: rgba(99,102,241,0.1) !important;
        }
        .logout-btn:hover {
          background: rgba(239,68,68,0.08);
          color: #ef4444;
        }
        @keyframes pulse {
          from { opacity: 0.6; box-shadow: 0 0 4px var(--success); }
          to   { opacity: 1; box-shadow: 0 0 10px var(--success); }
        }
      `}</style>
    </aside>
  );
}

function BottomNav() {
  const navLinks = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Home' },
    { to: '/course', icon: <BookOpen size={20} />, label: 'Course' },
    { to: '/attendance', icon: <Clock size={20} />, label: 'Insights' },
    { to: '/quiz', icon: <BrainCircuit size={20} />, label: 'Quiz' },
    { to: '/account', icon: <User size={20} />, label: 'Profile' }
  ];

  return (
    <nav className="bottom-nav">
      {navLinks.map(link => (
        <NavLink key={link.to} to={link.to} className={({isActive}) => isActive ? 'b-nav-item active' : 'b-nav-item'}>
           {link.icon}
           <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export function Layout() {
  const { user } = useAuth();
  
  return (
    <div className="app-layout">
      {user && <Sidebar />}
      <main className={user ? "main-content auth-main" : "main-content"}>
        <div className="page-container">
          <Outlet />
        </div>
      </main>
      {user && <BottomNav />}
    </div>
  );
}
