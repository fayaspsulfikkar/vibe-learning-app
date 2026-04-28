import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Key } from 'lucide-react';

export default function Account() {
  const { user } = useAuth();
  if (!user) return null;

  const joinDate = new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '56px', marginTop: '8px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 300, marginBottom: '12px', letterSpacing: '-0.02em' }}>Account Settings</h1>
        <p style={{ color: 'var(--muted)', fontSize: '15px', fontWeight: 400, letterSpacing: '0.01em' }}>Manage your personal information and preferences.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
        <div className="glass-panel" style={{ padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(200, 240, 96, 0.08)', border: '1px solid rgba(200, 240, 96, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 300, color: 'var(--accent)', marginBottom: '24px' }}>
             {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 300, marginBottom: '8px' }}>{user.name}</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '16px', fontSize: '14px', fontWeight: 400 }}>{user.email}</p>
          <div className="badge badge-accent" style={{ marginTop: '16px', padding: '6px 16px', borderRadius: '20px', fontWeight: 500 }}>Pro Student</div>
        </div>

        <div className="glass-panel" style={{ padding: '48px 40px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 500, marginBottom: '40px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Personal Details</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', marginBottom: '12px', color: 'var(--muted)', fontWeight: 400 }}>
                <User size={16} opacity={0.6} /> Full Name
              </label>
              <input type="text" defaultValue={user.name} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '8px 0', fontSize: '16px', fontWeight: 300, borderRadius: 0, color: 'var(--text)' }} disabled />
            </div>
            
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', marginBottom: '12px', color: 'var(--muted)', fontWeight: 400 }}>
                <Mail size={16} opacity={0.6} /> Email Address
              </label>
              <input type="email" defaultValue={user.email} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '8px 0', fontSize: '16px', fontWeight: 300, borderRadius: 0, color: 'var(--text)' }} disabled />
            </div>
            
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', marginBottom: '12px', color: 'var(--muted)', fontWeight: 400 }}>
                <Calendar size={16} opacity={0.6} /> Member Since
              </label>
              <input type="text" defaultValue={joinDate} style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '8px 0', fontSize: '16px', fontWeight: 300, borderRadius: 0, color: 'var(--text)' }} disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
