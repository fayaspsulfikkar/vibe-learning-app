import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Clock, TrendingUp, Award } from 'lucide-react';
import { ActivityCalendar } from 'react-activity-calendar';
import { eachDayOfInterval, format, parseISO } from 'date-fns';

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

    // Start from user's join date; always show at least 180 days (full course)
    // so react-activity-calendar always has enough data to render properly
    const today = new Date();
    const joinDate = user.joinedAt ? parseISO(user.joinedAt.slice(0, 10)) : today;

    // End = whichever is later: today, or join + 180 days
    const courseEnd = new Date(joinDate);
    courseEnd.setDate(courseEnd.getDate() + 180);
    const end = courseEnd > today ? courseEnd : today;

    const days = eachDayOfInterval({ start: joinDate, end });

    return days.map(d => {
      const dateStr = format(d, 'yyyy-MM-dd');
      const count = dateCounts[dateStr] || 0;
      let level = 0;
      if (count === 1) level = 1;
      else if (count === 2) level = 2;
      else if (count >= 3 && count <= 4) level = 3;
      else if (count > 4) level = 4;
      return { date: dateStr, count, level };
    });
  };

  const activityData = getActivityData();

  return (
    <div className="fade-in">
      <header className="header-spacing">
        <h1 className="page-title">Analytics & Progress</h1>
        <p className="page-desc">Measure your consistency through active study time and modules completed.</p>
      </header>

      <div className="stat-grid">
        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '10px', background: 'var(--primary-glow)', borderRadius: 'var(--radius-sm)' }}>
              <Clock size={20} color="var(--primary)" />
            </div>
            <span className="panel-label">Total Study Minutes</span>
          </div>
          <h2 className="stat-val">{studyTime}</h2>
        </div>
        
        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '10px', background: 'rgba(52, 211, 153, 0.1)', borderRadius: 'var(--radius-sm)' }}>
              <Award size={20} color="var(--success)" />
            </div>
            <span className="panel-label">Modules Finished</span>
          </div>
          <h2 className="stat-val">{totalTasksDone}</h2>
        </div>
        
        <div className="glass-panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '10px', background: 'var(--accent-glow)', borderRadius: 'var(--radius-sm)' }}>
              <TrendingUp size={20} color="var(--accent)" />
            </div>
            <span className="panel-label">Best Session</span>
          </div>
          <h2 className="stat-val">{Math.max(...attendance.map(a => a.minutes), 0)}m</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '32px' }}>
        <div className="glass-panel" style={{ overflowX: 'auto' }}>
           <h3 className="panel-title">Module Completions</h3>
           <p className="page-desc" style={{ marginBottom: '32px' }}>A daily record of course checklist items completed.</p>
           
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

        <div className="glass-panel">
          <h3 className="panel-title">Active Attendance History</h3>
          <p className="page-desc" style={{ marginBottom: '32px' }}>Charted active minutes logged into the learning platform daily.</p>
          
          {attendance.length === 0 ? (
            <p className="page-desc" style={{ textAlign: 'center', padding: '60px 0' }}>No attendance sessions recorded yet. Start learning!</p>
          ) : (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '180px', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {attendance.slice(-14).map((record, idx) => {
                const heightPct = Math.max((record.minutes / maxMinutes) * 100, 5);
                // Parse the localized date (e.g. "4/28/2026") into a readable "Apr 28" label
                const dateObj = new Date(record.date);
                const dayLabel = isNaN(dateObj)
                  ? record.date
                  : dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                return (
                  <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ 
                      width: '100%',
                      height: `${heightPct}%`, 
                      background: 'var(--primary-glow)',
                      borderTop: '1px solid var(--primary)',
                      borderRadius: '3px 3px 0 0',
                      transition: 'height 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      minHeight: '4px'
                    }}>
                       <span style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: 'var(--muted2)', whiteSpace: 'nowrap' }}>
                          {record.minutes}m
                       </span>
                    </div>
                    <span style={{ fontSize: '9px', color: 'var(--muted)', marginTop: '8px', whiteSpace: 'nowrap' }}>
                      {dayLabel}
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
