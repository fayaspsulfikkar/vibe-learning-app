import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vibe_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [studyTime, setStudyTime] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem('vibe_user'));
    if (savedUser?.email) {
      return parseInt(localStorage.getItem(`vibe_study_time_${savedUser.email}`)) || 0;
    }
    return 0;
  });

  const [attendance, setAttendance] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem('vibe_user'));
    if (savedUser?.email) {
       const saved = localStorage.getItem(`vibe_attendance_${savedUser.email}`);
       return saved ? JSON.parse(saved) : [];
    }
    return [];
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
    if (user && user.email) {
      interval = setInterval(() => {
        setStudyTime(prev => {
          const newTime = prev + 1;
          localStorage.setItem(`vibe_study_time_${user.email}`, newTime);
          
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
            localStorage.setItem(`vibe_attendance_${user.email}`, JSON.stringify(updated));
            return updated;
          });
          
          return newTime;
        });
      }, 60000);
    }
    return () => clearInterval(interval);
  }, [user]);

  const login = (name, email) => {
    const emailKey = email.toLowerCase().trim();
    const existing = JSON.parse(localStorage.getItem(`vibe_profile_${emailKey}`));
    let authUser = { name, email: emailKey, joinedAt: new Date().toISOString() };
    
    if (existing) {
       authUser = existing;
    } else {
       localStorage.setItem(`vibe_profile_${emailKey}`, JSON.stringify(authUser));
    }
    
    setUser(authUser);
    localStorage.setItem('vibe_user', JSON.stringify(authUser));
    
    // Add login instance dynamically
    const dateStr = new Date().toLocaleDateString();
    const savedAtt = localStorage.getItem(`vibe_attendance_${emailKey}`);
    let attArray = savedAtt ? JSON.parse(savedAtt) : [];
    
    if (!attArray.find(r => r.date === dateStr)) {
       attArray.push({ date: dateStr, minutes: 0 });
       localStorage.setItem(`vibe_attendance_${emailKey}`, JSON.stringify(attArray));
    }
    setAttendance(attArray);
    
    // Resume their global standard study time
    setStudyTime(parseInt(localStorage.getItem(`vibe_study_time_${emailKey}`)) || 0);
  };

  const logout = () => {
    setUser(null);
    setStudyTime(0);
    setAttendance([]);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, studyTime, attendance }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
