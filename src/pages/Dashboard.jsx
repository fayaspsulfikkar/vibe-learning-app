import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Clock, BookOpen, Flame, BrainCircuit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, studyTime, attendance } = useAuth();
  const navigate = useNavigate();

  const getTodayMinutes = () => {
    const today = new Date().toLocaleDateString();
    const record = attendance.find(r => r.date === today);
    return record ? record.minutes : 0;
  };

  const formatMins = (m) => {
    if (m < 60) return `${m}m`;
    return `${Math.floor(m / 60)}h ${m % 60}m`;
  };

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Hello, {user?.name.split(' ')[0]} 👋</h1>
        <p style={{ color: 'var(--muted)', fontSize: '16px' }}>Ready to continue your learning journey today?</p>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ padding: '10px', background: 'var(--primary-glow)', borderRadius: 'var(--radius-sm)', color: 'var(--primary)' }}>
              <Clock size={24} />
            </div>
            <span style={{ color: 'var(--muted)', fontWeight: 600 }}>Total Study Time</span>
          </div>
          <h2 style={{ fontSize: '32px' }}>{formatMins(studyTime)}</h2>
        </div>
        
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ padding: '10px', background: 'var(--accent-glow)', borderRadius: 'var(--radius-sm)', color: 'var(--accent)' }}>
              <Flame size={24} />
            </div>
            <span style={{ color: 'var(--muted)', fontWeight: 600 }}>Today's Focus</span>
          </div>
          <h2 style={{ fontSize: '32px' }}>{formatMins(getTodayMinutes())}</h2>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
             <div style={{ padding: '10px', background: 'rgba(56, 189, 248, 0.2)', borderRadius: 'var(--radius-sm)', color: 'var(--info)' }}>
              <BookOpen size={24} />
            </div>
            <span style={{ color: 'var(--muted)', fontWeight: 600 }}>Active Courses</span>
          </div>
          <h2 style={{ fontSize: '32px' }}>1 <span style={{ fontSize: '16px', color: 'var(--muted)', fontWeight: 400 }}>/ 1 Enrolled</span></h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '32px' }}>
           <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>Continue Learning</h2>
           
           <div style={{ padding: '24px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span className="badge badge-accent">In Progress</span>
                <span style={{ color: 'var(--muted)' }}>Week 1</span>
              </div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>6-Month Coding Roadmap</h3>
              <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>Vibe Coder to Job-Ready Developer</p>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => navigate('/course')} className="btn-primary" style={{ flex: 1 }}>Resume Course</button>
              </div>
           </div>
        </div>

        <div className="glass-panel" style={{ padding: '32px' }}>
          <h2 style={{ marginBottom: '24px', fontSize: '24px' }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={() => navigate('/attendance')} style={{ padding: '16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '16px' }}>
               <Clock size={20} color="var(--primary)" />
               <span style={{ fontWeight: 600, color: 'var(--text)' }}>View Attendance Insights</span>
            </button>
            <button onClick={() => navigate('/quiz')} style={{ padding: '16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '16px' }}>
               <BrainCircuit size={20} color="var(--accent)" />
               <span style={{ fontWeight: 600, color: 'var(--text)' }}>Take a Quick Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
