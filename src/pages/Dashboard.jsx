import React, { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Clock, BookOpen, Flame, BrainCircuit, Target, Trophy, ChevronRight } from 'lucide-react';
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

  // Pre-calculate progress
  const { percentage, solvedTasksCount, totalTasks } = useMemo(() => {
    let total = 0;
    courseData.forEach(p => p.weeks.forEach(w => total += w.tasks.length));
    
    // Read user explicit data
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
    return "Job Ready Engineer";
  };

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Hello, {user?.name.split(' ')[0]} 👋</h1>
        <p style={{ color: 'var(--muted)', fontSize: '16px' }}>Ready to conquer your learning goals today?</p>
      </header>

      {/* Main Insights Panel */}
      <div className="glass-panel" style={{ padding: '36px', marginBottom: '40px', borderTop: '4px solid var(--accent)' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
           <Target color="var(--accent)" />
           Course Completion Insights
        </h2>

        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
           {/* Progress Tracker */}
           <div style={{ flex: '1 1 300px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'flex-end' }}>
                <span style={{ fontWeight: 600, fontSize: '18px' }}>Total Progress</span>
                <span style={{ color: 'var(--text)', fontWeight: 800, fontSize: '32px', lineHeight: 1 }}>{percentage}%</span>
              </div>
              <div style={{ height: '10px', background: 'var(--border)', borderRadius: '5px', overflow: 'hidden', marginBottom: '16px' }}>
                 <div style={{ height: '100%', width: `${percentage}%`, background: 'var(--accent)', transition: 'width 1s ease-in-out', boxShadow: '0 0 10px var(--accent)' }} />
              </div>
              <p style={{ color: 'var(--muted)', fontSize: '15px', margin: 0 }}>
                 You have conquered <strong style={{ color: 'var(--text)' }}>{solvedTasksCount}</strong> out of <strong style={{ color: 'var(--text)' }}>{totalTasks}</strong> roadmap milestones.
              </p>
           </div>
           
           {/* Dynamic Badges */}
           <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ padding: '20px 24px', background: 'var(--surface2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                 <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dedication Level</div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', fontSize: '18px' }}>
                   <Flame size={22} fill="var(--primary)" fillOpacity={0.2} />
                   <span style={{ fontWeight: 600 }}>{getDedicationLevel()}</span>
                 </div>
              </div>

              <div style={{ padding: '20px 24px', background: 'var(--surface2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                 <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Proficiency Level</div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--info)', fontSize: '18px' }}>
                   <Trophy size={22} fill="var(--info)" fillOpacity={0.2} />
                   <span style={{ fontWeight: 600 }}>{getProficiencyLevel()}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

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

        <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', position: 'relative', zIndex: 2 }}>
             <div style={{ padding: '10px', background: 'rgba(56, 189, 248, 0.2)', borderRadius: 'var(--radius-sm)', color: 'var(--info)' }}>
              <BookOpen size={24} />
            </div>
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>Jump back in</span>
          </div>
          <button 
            onClick={() => navigate('/course')}
            style={{ position: 'relative', zIndex: 2, padding: '12px 20px', background: 'var(--info)', color: '#000', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 'auto', cursor: 'pointer' }}
          >
            <span>Resume Module</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
