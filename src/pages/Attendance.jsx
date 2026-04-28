import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, TrendingUp, Award } from 'lucide-react';
import { ActivityCalendar } from 'react-activity-calendar';
import { subDays, format } from 'date-fns';

export default function Attendance() {
  const { attendance, studyTime, user } = useAuth();
  const [taskData, setTaskData] = useState({});

  useEffect(() => {
    // Load explicitly scoped tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem(`vibe_tasks_${user.email}`) || '{}');
    setTaskData(savedTasks);
  }, [user]);

  const maxMinutes = Math.max(...attendance.map(a => a.minutes), 60);
  const totalTasksDone = Object.keys(taskData).filter(k => taskData[k]).length;
  
  // Custom parsing for the Github-style contribution board
  const getActivityData = () => {
    const dateCounts = {};
    
    // Process the exact ISO strings saved by Course.jsx
    Object.values(taskData).forEach(dateStr => {
       if (typeof dateStr === 'string' && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
          dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;
       }
    });

    const data = [];
    const today = new Date();
    // Generate backwards for 180 days to populate a solid block
    for (let i = 180; i >= 0; i--) {
      const d = subDays(today, i);
      const dateStr = format(d, 'yyyy-MM-dd');
      const count = dateCounts[dateStr] || 0;
      
      let level = 0;
      if (count === 1) level = 1;
      else if (count === 2) level = 2;
      else if (count >= 3 && count <= 4) level = 3;
      else if (count > 4) level = 4;

      data.push({
        date: dateStr,
        count: count,
        level: level
      });
    }
    return data;
  };

  const activityData = getActivityData();

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '48px', borderBottom: '1px solid var(--border)', paddingBottom: '24px' }}>
        <h1 style={{ fontSize: '38px', marginBottom: '8px', letterSpacing: '-0.02em' }}>Analytics & Progress</h1>
        <p style={{ color: 'var(--muted)', fontSize: '16px' }}>Measure your consistency through active study time and modules completed.</p>
      </header>

      {/* Hero Tracking Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '12px', background: 'var(--primary-glow)', borderRadius: '12px' }}>
              <Clock size={28} color="var(--primary)" />
            </div>
            <span style={{ color: 'var(--muted)', fontWeight: 600, fontSize: '15px' }}>Total Study Minutes</span>
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: 800 }}>{studyTime}</h2>
        </div>
        
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '12px', background: 'rgba(52, 211, 153, 0.15)', borderRadius: '12px' }}>
              <Award size={28} color="var(--success)" />
            </div>
            <span style={{ color: 'var(--muted)', fontWeight: 600, fontSize: '15px' }}>Modules Finished</span>
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: 800 }}>{totalTasksDone}</h2>
        </div>
        
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '12px', background: 'var(--accent-glow)', borderRadius: '12px' }}>
              <TrendingUp size={28} color="var(--accent)" />
            </div>
            <span style={{ color: 'var(--muted)', fontWeight: 600, fontSize: '15px' }}>Best Session</span>
          </div>
          <h2 style={{ fontSize: '42px', fontWeight: 800 }}>{Math.max(...attendance.map(a => a.minutes), 0)}m</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '40px' }}>
        
        {/* GitHub Contribution Chart */}
        <div className="glass-panel" style={{ padding: '36px', overflowX: 'auto' }}>
           <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Module Completions</h3>
           <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '32px' }}>A daily record of course checklist items completed.</p>
           
           <div style={{ display: 'flex', justifyContent: 'center' }}>
             <ActivityCalendar 
               data={activityData} 
               theme={{
                 light: ['#1a1a1a', '#4ade80', '#22c55e', '#16a34a', '#15803d'],
                 dark: ['var(--surface2)', '#e8f7b5', '#c8f060', '#a4d12a', '#789c1c'],
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

        {/* Study Time Chart */}
        <div className="glass-panel" style={{ padding: '36px' }}>
          <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Active Attendance History</h3>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '40px' }}>Charted active minutes logged into the learning platform daily.</p>
          
          {attendance.length === 0 ? (
            <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '40px 0' }}>No attendance sessions recorded yet. Start learning!</p>
          ) : (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', height: '260px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
              {attendance.slice(-14).map((record, idx) => {
                const heightPct = Math.max((record.minutes / maxMinutes) * 100, 5);
                return (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '100%', 
                      maxWidth: '48px',
                      height: `${heightPct}%`, 
                      background: 'linear-gradient(180deg, var(--primary) 0%, rgba(96, 184, 240, 0.2) 100%)', 
                      borderRadius: '6px 6px 0 0',
                      transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative'
                    }}>
                       <span style={{ position: 'absolute', top: '-28px', left: '50%', transform: 'translateX(-50%)', fontSize: '13px', color: 'var(--text)', fontWeight: 600 }}>
                          {record.minutes}
                       </span>
                    </div>
                    <span style={{ fontSize: '13px', color: 'var(--muted2)', transform: 'rotate(-45deg)', transformOrigin: 'top left', marginTop: '12px', whiteSpace: 'nowrap' }}>
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
