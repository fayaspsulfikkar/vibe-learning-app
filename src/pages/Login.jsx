import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(name.trim() && email.trim()) {
      login(name, email);
      navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="glass-panel fade-in" style={{ padding: '64px 48px', width: '100%', maxWidth: '460px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 300, marginBottom: '16px', letterSpacing: '-0.02em' }}>Welcome back.</h1>
        <p style={{ color: 'var(--muted)', fontWeight: 400, fontSize: '15px', marginBottom: '48px', letterSpacing: '0.01em' }}>Vibe LMS Premium Platform</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '40px', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px', color: 'var(--muted)', fontWeight: 500 }}>Full Name</label>
            <input 
              type="text" value={name} onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. John Doe"
              style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '12px 0', fontSize: '16px', fontWeight: 300, color: 'var(--text)', borderRadius: 0 }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '16px', color: 'var(--muted)', fontWeight: 500 }}>Email Address</label>
            <input 
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
              placeholder="you@example.com"
              style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '12px 0', fontSize: '16px', fontWeight: 300, color: 'var(--text)', borderRadius: 0 }}
              required
            />
          </div>
          <button type="submit" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '24px', padding: '18px', fontWeight: 400, borderRadius: 'var(--radius-sm)', fontSize: '15px' }}>
            Continue to Dashboard
            <LogIn size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
