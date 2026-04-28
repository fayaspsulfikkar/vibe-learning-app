import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vibe_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  // Track continuous study time in minutes
  const [studyTime, setStudyTime] = useState(() => {
    return parseInt(localStorage.getItem('vibe_study_time')) || 0;
  });

  // Track daily login/attendance history
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('vibe_attendance');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('vibe_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('vibe_user');
    }
  }, [user]);

  // Handle continuous study time counting using a 60-second interval
  useEffect(() => {
    let interval;
    if (user) {
      interval = setInterval(() => {
        setStudyTime(prev => {
          const newTime = prev + 1;
          localStorage.setItem('vibe_study_time', newTime);
          
          // Also record today's attendance session
          const today = new Date().toLocaleDateString();
          setAttendance(prevAtt => {
            const updated = [...prevAtt];
            const todayRecord = updated.find(r => r.date === today);
            if (todayRecord) {
              todayRecord.minutes += 1;
            } else {
              updated.push({ date: today, minutes: 1 });
            }
            localStorage.setItem('vibe_attendance', JSON.stringify(updated));
            return updated;
          });
          
          return newTime;
        });
      }, 60000);
    }
    return () => clearInterval(interval);
  }, [user]);

  const login = (name, email) => {
    const today = new Date().toISOString();
    setUser({ name, email, joinedAt: today, id: Math.random().toString(36).substr(2, 9) });
    
    // Add login instance
    const dateStr = new Date().toLocaleDateString();
    setAttendance(prev => {
      const updated = [...prev];
      if (!updated.find(r => r.date === dateStr)) {
         updated.push({ date: dateStr, minutes: 0 });
         localStorage.setItem('vibe_attendance', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, studyTime, attendance }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
