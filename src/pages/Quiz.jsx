import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

const DUMMY_QUIZ = [
  {
    question: "What does JSX stand for?",
    options: ["JavaScript XML", "Java Syntax Extension", "JSON X-Query"],
    correct: 0
  },
  {
    question: "Which hook is used to manage state in React?",
    options: ["useEffect", "useState", "useContext"],
    correct: 1
  }
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (idx) => {
    setSelected(idx);
  };

  const handleNext = () => {
    if (selected === DUMMY_QUIZ[current].correct) {
      setScore(s => s + 1);
    }
    
    if (current + 1 < DUMMY_QUIZ.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      
      {!finished ? (
        <div className="glass-panel" style={{ padding: '40px', width: '100%', maxWidth: '600px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: 'var(--muted)', fontSize: '14px' }}>
            <span>Question {current + 1} of {DUMMY_QUIZ.length}</span>
            <span>Current Score: {score}</span>
          </div>

          <h2 style={{ fontSize: '24px', marginBottom: '32px' }}>{DUMMY_QUIZ[current].question}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            {DUMMY_QUIZ[current].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                style={{
                  padding: '16px',
                  textAlign: 'left',
                  background: selected === idx ? 'var(--primary-glow)' : 'var(--surface2)',
                  border: `1px solid ${selected === idx ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-sm)',
                  color: selected === idx ? 'var(--primary)' : 'var(--text)',
                  fontSize: '16px'
                }}
              >
                {opt}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
             <button 
              onClick={handleNext} 
              disabled={selected === null}
              className="btn-primary" 
              style={{ opacity: selected === null ? 0.5 : 1 }}
             >
               {current === DUMMY_QUIZ.length - 1 ? 'Finish Quiz' : 'Next Question'}
             </button>
          </div>
        </div>
      ) : (
        <div className="glass-panel fade-in" style={{ padding: '48px', width: '100%', maxWidth: '600px', textAlign: 'center' }}>
           <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: score === DUMMY_QUIZ.length ? 'var(--done-bg)' : 'rgba(251, 146, 60, 0.1)', color: score === DUMMY_QUIZ.length ? 'var(--success)' : 'var(--warn)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              {score === DUMMY_QUIZ.length ? <CheckCircle2 size={40} /> : <XCircle size={40} />}
           </div>
           
           <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Quiz Completed!</h2>
           <p style={{ color: 'var(--muted)', fontSize: '18px', marginBottom: '32px' }}>
              You scored <strong style={{ color: 'var(--text)' }}>{score}</strong> out of {DUMMY_QUIZ.length}.
           </p>

           <button onClick={restart} className="btn-accent">Retake Quiz</button>
        </div>
      )}
    </div>
  );
}
