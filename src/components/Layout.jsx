import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Clock, BrainCircuit, User, LogOut } from 'lucide-react';
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
      <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ fontSize: '18px', color: 'var(--text)', marginBottom: '4px' }}>Vibe LMS</h1>
        <div style={{ fontSize: '11px', color: 'var(--muted2)', letterSpacing: '0.05em' }}>
          LEARNING PLATFORM
        </div>
      </div>
      
      <div style={{ padding: '24px 24px', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
           <span style={{ fontSize: '28px', fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-head)', letterSpacing: '-0.02em' }}>
             {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
           </span>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--success)', fontWeight: 600, letterSpacing: '0.05em' }}>
             <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', animation: 'pulse 2s infinite alternate', boxShadow: '0 0 8px var(--success)' }} />
             ATTENDANCE ACTIVE
           </div>
         </div>
         
         <div>
            <div style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', justifyContent: 'space-between', marginBottom: '8px', letterSpacing: '0.05em', fontWeight: 600 }}>
              <span>CURRENT SESSION</span>
              <span style={{ color: 'var(--text)' }}>{formatStudyTime(studyTime)}</span>
            </div>
            <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
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
      
      <div style={{ padding: '16px', borderTop: '1px solid var(--border)' }}>
        <button 
          onClick={handleLogout}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', color: 'var(--muted)', borderRadius: 'var(--radius-sm)', transition: 'background 0.2s' }}
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
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          color: var(--muted);
          font-weight: 500;
          transition: all 0.2s;
        }
        .nav-item:hover {
          background: var(--surface);
          color: var(--text);
        }
        .nav-item.active {
          background: var(--primary-glow);
          color: var(--primary);
          border-left: 3px solid var(--primary);
        }
        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: var(--danger);
        }
        @keyframes pulse {
          from { opacity: 0.6; }
          to { opacity: 1; }
        }
      `}</style>
    </aside>
  );
}

export function Layout() {
  const { user } = useAuth();
  
  return (
    <div className="app-layout">
      {user && <Sidebar />}
      <main className="main-content" style={{ marginLeft: user ? '260px' : '0' }}>
        <div style={{ padding: '32px 48px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
