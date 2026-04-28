import React, { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Clock, BookOpen, Flame, Target, Trophy, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { courseData } from '../data/courseData';

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

  const { percentage, solvedTasksCount, totalTasks } = useMemo(() => {
    let total = 0;
    courseData.forEach(p => p.weeks.forEach(w => total += w.tasks.length));
    const taskData = JSON.parse(localStorage.getItem(`vibe_tasks_${user?.email}`) || '{}');
    const solved = Object.keys(taskData).filter(k => taskData[k]).length;
    const pct = total === 0 ? 0 : Math.round((solved / total) * 100);
    return { percentage: pct, solvedTasksCount: solved, totalTasks: total };
  }, [user]);

  const getDedicationLevel = () => {
    if (attendance.length >= 14) return "Unstoppable";
    if (attendance.length >= 7) return "Highly Dedicated";
    if (studyTime > 300) return "Consistent Worker";
    if (studyTime > 60) return "Gaining Momentum";
    return "Emerging Learner";
  };

  const getProficiencyLevel = () => {
    if (percentage === 0) return "Novice";
    if (percentage < 33) return "Foundational Coder";
    if (percentage < 66) return "React Architect";
    if (percentage < 90) return "Full Stack Dev";
    return "Job Ready";
  };

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '48px', marginTop: '8px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 300, marginBottom: '8px', letterSpacing: '-0.02em' }}>
          Hello, <span style={{ fontWeight: 600 }}>{user?.name.split(' ')[0]}</span>.
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px', fontWeight: 400, letterSpacing: '0.01em' }}>Ready to conquer your learning goals?</p>
      </header>

      <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--muted)' }}>
           <Target size={16} color="var(--accent)" />
           Course Insights
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '40px', alignItems: 'center' }}>
           <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'flex-end' }}>
                <span style={{ fontWeight: 400, fontSize: '14px', color: 'var(--muted)' }}>Total Completion</span>
                <span style={{ color: 'var(--text)', fontWeight: 300, fontSize: '42px', lineHeight: 1, letterSpacing: '-0.03em' }}>
                  {percentage}<span style={{fontSize:'20px', color:'var(--muted)'}}>%</span>
                </span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden', marginBottom: '16px' }}>
                 <div style={{ height: '100%', width: `${percentage}%`, background: 'var(--accent)', transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              </div>
              <p style={{ color: 'var(--muted2)', fontSize: '13px', margin: 0, fontWeight: 400, lineHeight: 1.5 }}>
                 You have conquered <span style={{ color: 'var(--text)', fontWeight: 500 }}>{solvedTasksCount}</span> out of <span style={{ color: 'var(--text)', fontWeight: 500 }}>{totalTasks}</span> roadmap milestones.
              </p>
           </div>
           
           <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <Flame size={16} color="var(--primary)" opacity={0.8} />
                   <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Dedication</span>
                 </div>
                 <span style={{ fontWeight: 500, color: 'var(--text)', fontSize: '14px' }}>{getDedicationLevel()}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <Trophy size={16} color="var(--info)" opacity={0.8} />
                   <span style={{ fontSize: '13px', color: 'var(--muted)' }}>Proficiency</span>
                 </div>
                 <span style={{ fontWeight: 500, color: 'var(--text)', fontSize: '14px' }}>{getProficiencyLevel()}</span>
              </div>
           </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div className="glass-panel" style={{ padding: '28px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ padding: '8px', background: 'var(--primary-glow)', borderRadius: 'var(--radius-sm)', color: 'var(--primary)' }}>
              <Clock size={20} />
            </div>
            <span style={{ color: 'var(--muted)', fontWeight: 500, fontSize: '13px' }}>Study Runtime</span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 300, letterSpacing: '-0.02em' }}>{formatMins(studyTime)}</h2>
        </div>
        
        <div className="glass-panel" style={{ padding: '28px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ padding: '8px', background: 'var(--accent-glow)', borderRadius: 'var(--radius-sm)', color: 'var(--accent)' }}>
              <Flame size={20} />
            </div>
            <span style={{ color: 'var(--muted)', fontWeight: 500, fontSize: '13px' }}>Focus Today</span>
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 300, letterSpacing: '-0.02em' }}>{formatMins(getTodayMinutes())}</h2>
        </div>

        <div className="glass-panel" style={{ padding: '28px 24px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', position: 'relative', zIndex: 2 }}>
             <div style={{ padding: '8px', background: 'rgba(56, 189, 248, 0.15)', borderRadius: 'var(--radius-sm)', color: 'var(--info)' }}>
              <BookOpen size={20} />
            </div>
            <span style={{ color: 'var(--text)', fontWeight: 500, fontSize: '13px' }}>Active Module</span>
          </div>
          <button 
            onClick={() => navigate('/course')}
            style={{ position: 'relative', zIndex: 2, padding: '12px 20px', background: 'var(--info)', color: '#000', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 'auto', cursor: 'pointer', transition: 'opacity 0.2s' }}
            onMouseOver={(e) => e.target.style.opacity = 0.8}
            onMouseOut={(e) => e.target.style.opacity = 1}
          >
            <span>Resume</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
