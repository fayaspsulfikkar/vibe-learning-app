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
      <div className="glass-panel fade-in" style={{ width: '100%', maxWidth: '460px', textAlign: 'center' }}>
        <h1 className="page-title" style={{ marginBottom: '16px' }}>Welcome back.</h1>
        <p className="page-desc" style={{ marginBottom: '40px' }}>Vibe LMS Premium Platform</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px', textAlign: 'left' }}>
          <div>
            <label className="panel-label" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', display: 'block' }}>Full Name</label>
            <input 
              type="text" value={name} onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. John Doe"
              style={{ width: '100%' }}
              required
            />
          </div>
          <div>
            <label className="panel-label" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', display: 'block' }}>Email Address</label>
            <input 
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
              placeholder="you@example.com"
              style={{ width: '100%' }}
              required
            />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '16px' }}>
            Continue to Dashboard
            <LogIn size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
