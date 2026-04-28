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
      <header className="header-spacing">
        <h1 className="page-title">
          Hello, <span style={{ fontWeight: 600 }}>{user?.name.split(' ')[0]}</span>.
        </h1>
        <p className="page-desc">Ready to conquer your learning goals?</p>
      </header>

      <div className="glass-panel" style={{ marginBottom: '32px' }}>
        <h2 className="panel-title" style={{ color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '10px' }}>
           <Target size={16} color="var(--accent)" />
           Course Insights
        </h2>

        <div className="stat-grid" style={{ marginBottom: 0 }}>
           <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'flex-end' }}>
                <span className="panel-label">Total Completion</span>
                <span className="stat-val" style={{ color: 'var(--text)' }}>
                  {percentage}<span style={{fontSize:'18px', color:'var(--muted)'}}>%</span>
                </span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden', marginBottom: '16px' }}>
                 <div style={{ height: '100%', width: `${percentage}%`, background: 'var(--accent)', transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
              </div>
              <p className="panel-label" style={{ margin: 0, lineHeight: 1.5 }}>
                 You have conquered <span style={{ color: 'var(--text)', fontWeight: 500 }}>{solvedTasksCount}</span> out of <span style={{ color: 'var(--text)', fontWeight: 500 }}>{totalTasks}</span> roadmap milestones.
              </p>
           </div>
           
           <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <Flame size={16} color="var(--primary)" opacity={0.8} />
                   <span className="panel-label">Dedication</span>
                 </div>
                 <span style={{ fontWeight: 500, color: 'var(--text)', fontSize: '13px' }}>{getDedicationLevel()}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <Trophy size={16} color="var(--info)" opacity={0.8} />
                   <span className="panel-label">Proficiency</span>
                 </div>
                 <span style={{ fontWeight: 500, color: 'var(--text)', fontSize: '13px' }}>{getProficiencyLevel()}</span>
              </div>
           </div>
        </div>
      </div>

      <div className="stat-grid" style={{ gap: '24px' }}>
        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ padding: '8px', background: 'var(--primary-glow)', borderRadius: 'var(--radius-sm)', color: 'var(--primary)' }}>
              <Clock size={20} />
            </div>
            <span className="panel-label" style={{ fontWeight: 500 }}>Study Runtime</span>
          </div>
          <h2 className="stat-val" style={{ fontSize: '32px' }}>{formatMins(studyTime)}</h2>
        </div>
        
        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ padding: '8px', background: 'var(--accent-glow)', borderRadius: 'var(--radius-sm)', color: 'var(--accent)' }}>
              <Flame size={20} />
            </div>
            <span className="panel-label" style={{ fontWeight: 500 }}>Focus Today</span>
          </div>
          <h2 className="stat-val" style={{ fontSize: '32px' }}>{formatMins(getTodayMinutes())}</h2>
        </div>

        <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', position: 'relative', zIndex: 2 }}>
             <div style={{ padding: '8px', background: 'rgba(56, 189, 248, 0.15)', borderRadius: 'var(--radius-sm)', color: 'var(--info)' }}>
              <BookOpen size={20} />
            </div>
            <span className="panel-label" style={{ color: 'var(--text)', fontWeight: 500 }}>Active Module</span>
          </div>
          <button 
            onClick={() => navigate('/course')}
            style={{ position: 'relative', zIndex: 2, padding: '12px 20px', background: 'var(--info)', color: '#000', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 'auto', cursor: 'pointer', transition: 'opacity 0.2s', fontSize: '14px' }}
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
