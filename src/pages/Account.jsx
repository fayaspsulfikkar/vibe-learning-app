import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Key } from 'lucide-react';

export default function Account() {
  const { user } = useAuth();
  if (!user) return null;

  const joinDate = new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="fade-in">
      <header className="header-spacing">
        <h1 className="page-title">Account Settings</h1>
        <p className="page-desc">Manage your personal information and preferences.</p>
      </header>

      <div className="stat-grid">
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(200, 240, 96, 0.08)', border: '1px solid rgba(200, 240, 96, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 300, color: 'var(--accent)', marginBottom: '24px' }}>
             {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '8px' }}>{user.name}</h2>
          <p className="panel-label" style={{ marginBottom: '16px' }}>{user.email}</p>
          <div className="badge badge-accent" style={{ marginTop: '16px', padding: '6px 16px', borderRadius: '20px', fontWeight: 500 }}>Pro Student</div>
        </div>

        <div className="glass-panel">
          <h3 className="panel-label" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '32px' }}>Personal Details</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', marginBottom: '8px', color: 'var(--muted)' }}>
                <User size={16} opacity={0.6} /> Full Name
              </label>
              <input type="text" defaultValue={user.name} style={{ width: '100%', pointerEvents: 'none' }} disabled />
            </div>
            
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', marginBottom: '8px', color: 'var(--muted)' }}>
                <Mail size={16} opacity={0.6} /> Email Address
              </label>
              <input type="email" defaultValue={user.email} style={{ width: '100%', pointerEvents: 'none' }} disabled />
            </div>
            
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', marginBottom: '8px', color: 'var(--muted)' }}>
                <Calendar size={16} opacity={0.6} /> Member Since
              </label>
              <input type="text" defaultValue={joinDate} style={{ width: '100%', pointerEvents: 'none' }} disabled />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
