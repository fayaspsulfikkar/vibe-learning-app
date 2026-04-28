import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Clock, TrendingUp, Award } from 'lucide-react';
import { ActivityCalendar } from 'react-activity-calendar';
import { subDays, format } from 'date-fns';

export default function Attendance() {
  const { attendance, studyTime, user } = useAuth();
  const [taskData, setTaskData] = useState({});

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem(`vibe_tasks_${user.email}`) || '{}');
    setTaskData(savedTasks);
  }, [user]);

  const maxMinutes = Math.max(...attendance.map(a => a.minutes), 60);
  const totalTasksDone = Object.keys(taskData).filter(k => taskData[k]).length;
  
  const getActivityData = () => {
    const dateCounts = {};
    Object.values(taskData).forEach(dateStr => {
       if (typeof dateStr === 'string' && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
          dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;
       }
    });

    const data = [];
    const today = new Date();
    for (let i = 180; i >= 0; i--) {
      const d = subDays(today, i);
      const dateStr = format(d, 'yyyy-MM-dd');
      const count = dateCounts[dateStr] || 0;
      
      let level = 0;
      if (count === 1) level = 1;
      else if (count === 2) level = 2;
      else if (count >= 3 && count <= 4) level = 3;
      else if (count > 4) level = 4;

      data.push({ date: dateStr, count: count, level: level });
    }
    return data;
  };

  const activityData = getActivityData();

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '56px', marginTop: '8px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 300, marginBottom: '12px', letterSpacing: '-0.02em' }}>Analytics & Progress</h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px', fontWeight: 400, letterSpacing: '0.01em' }}>Measure your consistency through active study time and modules completed.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginBottom: '48px' }}>
        <div className="glass-panel" style={{ padding: '36px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '10px', background: 'var(--primary-glow)', borderRadius: 'var(--radius-sm)' }}>
              <Clock size={20} color="var(--primary)" />
            </div>
            <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: '14px', letterSpacing: '0.02em' }}>Total Study Minutes</span>
          </div>
          <h2 style={{ fontSize: '48px', fontWeight: 300, letterSpacing: '-0.03em' }}>{studyTime}</h2>
        </div>
        
        <div className="glass-panel" style={{ padding: '36px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '10px', background: 'rgba(52, 211, 153, 0.1)', borderRadius: 'var(--radius-sm)' }}>
              <Award size={20} color="var(--success)" />
            </div>
            <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: '14px', letterSpacing: '0.02em' }}>Modules Finished</span>
          </div>
          <h2 style={{ fontSize: '48px', fontWeight: 300, letterSpacing: '-0.03em' }}>{totalTasksDone}</h2>
        </div>
        
        <div className="glass-panel" style={{ padding: '36px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '10px', background: 'var(--accent-glow)', borderRadius: 'var(--radius-sm)' }}>
              <TrendingUp size={20} color="var(--accent)" />
            </div>
            <span style={{ color: 'var(--muted)', fontWeight: 400, fontSize: '14px', letterSpacing: '0.02em' }}>Best Session</span>
          </div>
          <h2 style={{ fontSize: '48px', fontWeight: 300, letterSpacing: '-0.03em' }}>{Math.max(...attendance.map(a => a.minutes), 0)}m</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '48px' }}>
        <div className="glass-panel" style={{ padding: '40px', overflowX: 'auto' }}>
           <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '12px' }}>Module Completions</h3>
           <p style={{ color: 'var(--muted)', fontSize: '14px', fontWeight: 400, marginBottom: '40px' }}>A daily record of course checklist items completed.</p>
           
           <div style={{ display: 'flex', justifyContent: 'center' }}>
             <ActivityCalendar 
               data={activityData} 
               theme={{
                 light: ['#1a1a1a', '#4ade80', '#22c55e', '#16a34a', '#15803d'],
                 dark: ['rgba(255,255,255,0.02)', '#e8f7b5', '#c8f060', '#a4d12a', '#789c1c'],
               }}
               colorScheme="dark"
               blockSize={16}
               blockMargin={6}
               fontSize={14}
               labels={{
                 totalCount: `{{count}} modules completed in the last half-year`,
               }}
             />
           </div>
        </div>

        <div className="glass-panel" style={{ padding: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '12px' }}>Active Attendance History</h3>
          <p style={{ color: 'var(--muted)', fontSize: '14px', fontWeight: 400, marginBottom: '48px' }}>Charted active minutes logged into the learning platform daily.</p>
          
          {attendance.length === 0 ? (
            <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '60px 0', fontWeight: 300 }}>No attendance sessions recorded yet. Start learning!</p>
          ) : (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', height: '240px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {attendance.slice(-14).map((record, idx) => {
                const heightPct = Math.max((record.minutes / maxMinutes) * 100, 5);
                return (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <div style={{ 
                      width: '100%', 
                      maxWidth: '40px',
                      height: `${heightPct}%`, 
                      background: 'rgba(96, 184, 240, 0.15)', 
                      borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                      transition: 'height 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative'
                    }}>
                       <span style={{ position: 'absolute', top: '-32px', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', color: 'var(--text)', fontWeight: 400 }}>
                          {record.minutes}
                       </span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--muted2)', transform: 'rotate(-45deg)', transformOrigin: 'top left', marginTop: '16px', whiteSpace: 'nowrap' }}>
                      {record.date.slice(0, 5)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
