import React, { useState, useEffect } from 'react';
import { courseData } from '../data/courseData';

export default function Course() {
  const [data, setData] = useState([]);
  const [taskState, setTaskState] = useState(() => JSON.parse(localStorage.getItem('vibe_tasks') || '{}'));
  const [taskNotes, setTaskNotes] = useState(() => JSON.parse(localStorage.getItem('vibe_notes') || '{}'));

  // By default make phase 1 open, others closed like original
  const [openPhases, setOpenPhases] = useState({ p1: true });
  // Make week 1 open by default
  const [openWeeks, setOpenWeeks] = useState({ 'p1-w0': true });

  useEffect(() => {
    setData(courseData);
  }, []);

  const toggleTask = (taskId) => {
    setTaskState(prev => {
      const updated = { ...prev };
      if (updated[taskId]) {
        delete updated[taskId];
      } else {
        const d = new Date();
        updated[taskId] = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      }
      localStorage.setItem('vibe_tasks', JSON.stringify(updated));
      return updated;
    });
  };

  const updateNote = (taskId, text) => {
    setTaskNotes(prev => {
      const updated = { ...prev, [taskId]: text };
      localStorage.setItem('vibe_notes', JSON.stringify(updated));
      return updated;
    });
  };

  const togglePhase = (phaseId) => {
    setOpenPhases(p => ({ ...p, [phaseId]: !p[phaseId] }));
  };

  const toggleWeek = (weekId) => {
    setOpenWeeks(p => ({ ...p, [weekId]: !p[weekId] }));
  };

  const adjustTextareaHeight = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${Math.max(e.target.scrollHeight, 24)}px`;
  };

  return (
    <div className="fade-in" style={{ padding: '0 0 80px 0', marginLeft: '-48px', marginRight: '-48px', marginTop: '-32px' }}>
      
      <div className="hero">
        <div className="hero-tag">6-Month Self-Learning Plan</div>
        <h1>From vibe coder<br/>to <em>job-ready</em><br/>developer</h1>
        <p className="hero-desc">
          You can build things but can't write code. That's the gap this plan closes.
          24 weeks. Specific tasks. No bootcamp. No ₹3.6L fee.
          Just consistent work — 4 hours a day — and a job at the end.
        </p>
      </div>

      <div>
        {data.map((phase, pIdx) => {
          const isPhaseOpen = openPhases[phase.id];
          
          return (
            <div key={phase.id} className="phase-section">
              <div className="phase-header" onClick={() => togglePhase(phase.id)}>
                <div className="phase-badge" style={{ color: phase.color, background: phase.bgColor, border: `1px solid ${phase.color}33` }}>
                  {phase.label}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="phase-title">{phase.title}</div>
                  <div className="phase-subtitle">{phase.subtitle}</div>
                </div>
                <div className={`phase-toggle ${isPhaseOpen ? 'open' : ''}`}>▼</div>
              </div>

              <div className={`phase-body ${isPhaseOpen ? 'open' : ''}`}>
                {phase.weeks.map((week, wIdx) => {
                  const weekId = `${phase.id}-w${wIdx}`;
                  const isWeekOpen = openWeeks[weekId];
                  let weekDone = 0;
                  week.tasks.forEach((_, tIdx) => {
                    if (taskState[`${weekId}-t${tIdx}`]) weekDone++;
                  });

                  return (
                    <div key={weekId} className="week-card">
                      <div className={`week-head ${isWeekOpen ? 'wh-open' : ''}`} onClick={() => toggleWeek(weekId)}>
                        <span className="week-num-badge">Week {wIdx + 1 + (pIdx * 8)}</span>
                        <span className="week-title">{week.title}</span>
                        <span className={`week-check-count ${weekDone === week.tasks.length ? 'all-done' : ''}`}>
                          {weekDone}/{week.tasks.length}
                        </span>
                        <span className={`week-arrow ${isWeekOpen ? 'open' : ''}`}>▼</span>
                      </div>
                      
                      <div className={`week-body ${isWeekOpen ? 'open' : ''}`}>
                        <span className="sec-label">Tasks for this week</span>
                        <ul className="task-list">
                          {week.tasks.map((task, tIdx) => {
                            const taskId = `${weekId}-t${tIdx}`;
                            const isDone = !!taskState[taskId];
                            return (
                              <li key={taskId} className={`task-item ${isDone ? 'done' : ''}`}>
                                <div className="task-check" onClick={() => toggleTask(taskId)}>
                                  {isDone ? '✓' : ''}
                                </div>
                                <div className="task-text">
                                  <div>{task}</div>
                                  <textarea 
                                    className="minimal-note-input"
                                    placeholder="Add notes..."
                                    value={taskNotes[taskId] || ''}
                                    onChange={(e) => {
                                      updateNote(taskId, e.target.value);
                                      adjustTextareaHeight(e);
                                    }}
                                    onFocus={adjustTextareaHeight}
                                  />
                                </div>
                              </li>
                            );
                          })}
                        </ul>

                        {week.resources && week.resources.length > 0 && (
                          <>
                            <span className="sec-label">Resources</span>
                            <div className="resource-row">
                              {week.resources.map((r, i) => (
                                <a key={i} className="res-pill" href={r.url} target="_blank" rel="noreferrer">
                                  {r.label} <span className="arr">↗</span>
                                </a>
                              ))}
                            </div>
                          </>
                        )}

                        {week.rule && (
                          <div className="rule-box">
                            <strong>Important rule</strong>
                            {week.rule.replace('Rule: ', '')}
                          </div>
                        )}

                        {week.info && (
                          <div className="info-box">
                            <strong>Milestone</strong>
                            {week.info.replace('Milestone: ', '')}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
