import React, { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const DUMMY_QUIZ = [
  { question: "What does JSX stand for?", options: ["JavaScript XML", "Java Syntax Extension", "JSON X-Query"], correct: 0 },
  { question: "Which hook is used to manage state in React?", options: ["useEffect", "useState", "useContext"], correct: 1 }
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleNext = () => {
    if (selected === DUMMY_QUIZ[current].correct) setScore(s => s + 1);
    if (current + 1 < DUMMY_QUIZ.length) { setCurrent(current + 1); setSelected(null); }
    else { setFinished(true); }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      {!finished ? (
        <div className="glass-panel" style={{ width: '100%', maxWidth: '640px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }} className="panel-label">
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Question {current + 1} / {DUMMY_QUIZ.length}</span>
            <span>Score: {score}</span>
          </div>

          <h2 className="page-title" style={{ marginBottom: '40px', lineHeight: 1.4 }}>{DUMMY_QUIZ[current].question}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
            {DUMMY_QUIZ[current].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(idx)}
                style={{
                  padding: '16px 20px', textAlign: 'left',
                  background: selected === idx ? 'var(--primary-glow)' : 'rgba(0,0,0,0.2)',
                  border: `1px solid ${selected === idx ? 'var(--primary)' : 'rgba(255,255,255,0.03)'}`,
                  borderRadius: 'var(--radius-sm)', color: selected === idx ? 'var(--primary)' : 'var(--text)',
                  fontSize: '15px', fontWeight: 300, transition: 'all 0.2s ease', cursor: 'pointer'
                }}
              >
                {opt}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
             <button 
              onClick={handleNext} disabled={selected === null}
              className="btn-primary" 
              style={{ opacity: selected === null ? 0.3 : 1 }}
             >
               {current === DUMMY_QUIZ.length - 1 ? 'Finish Quiz' : 'Next Question'}
               <ArrowRight size={18} />
             </button>
          </div>
        </div>
      ) : (
        <div className="glass-panel fade-in" style={{ width: '100%', maxWidth: '640px', textAlign: 'center' }}>
           <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: score === DUMMY_QUIZ.length ? 'rgba(93, 216, 168, 0.1)' : 'rgba(251, 146, 60, 0.1)', color: score === DUMMY_QUIZ.length ? 'var(--success)' : 'var(--warn)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              {score === DUMMY_QUIZ.length ? <CheckCircle2 size={40} strokeWidth={1} /> : <XCircle size={40} strokeWidth={1} />}
           </div>
           <h2 className="page-title">Quiz Completed</h2>
           <p className="page-desc" style={{ marginBottom: '40px' }}>
              You scored <strong style={{ color: 'var(--text)', fontSize: '20px', fontWeight: 300, margin: '0 8px' }}>{score}</strong> out of {DUMMY_QUIZ.length}.
           </p>
           <div style={{ display: 'flex', justifyContent: 'center' }}>
             <button onClick={() => { setCurrent(0); setSelected(null); setScore(0); setFinished(false); }} className="btn-accent">Retake Module Quiz</button>
           </div>
        </div>
      )}
    </div>
  );
}
