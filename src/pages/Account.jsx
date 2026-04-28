import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Key } from 'lucide-react';

export default function Account() {
  const { user } = useAuth();
  
  if (!user) return null;

  const joinDate = new Date(user.joinedAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });

  return (
    <div className="fade-in">
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Account Settings</h1>
        <p style={{ color: 'var(--muted)', fontSize: '16px' }}>Manage your personal information and preferences.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '32px' }}>
        {/* Profile Card Summary */}
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: 'fit-content' }}>
          <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>
             {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 style={{ fontSize: '24px', marginBottom: '4px' }}>{user.name}</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '8px' }}>{user.email}</p>
          <div className="badge badge-accent" style={{ marginTop: '12px' }}>Pro Student</div>
        </div>

        {/* Details Form */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>Personal Details</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '8px', color: 'var(--muted)', fontWeight: 500 }}>
                <User size={16} /> Full Name
              </label>
              <input type="text" defaultValue={user.name} style={{ width: '100%', background: 'var(--surface2)' }} disabled />
            </div>
            
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '8px', color: 'var(--muted)', fontWeight: 500 }}>
                <Mail size={16} /> Email Address
              </label>
              <input type="email" defaultValue={user.email} style={{ width: '100%', background: 'var(--surface2)' }} disabled />
            </div>
            
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '8px', color: 'var(--muted)', fontWeight: 500 }}>
                <Calendar size={16} /> Member Since
              </label>
              <input type="text" defaultValue={joinDate} style={{ width: '100%', background: 'var(--surface2)' }} disabled />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '8px', color: 'var(--muted)', fontWeight: 500 }}>
                <Key size={16} /> Account ID
              </label>
              <input type="text" defaultValue={user.id} style={{ width: '100%', background: 'var(--surface2)' }} disabled />
            </div>
          </div>
          
          <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
            <button className="btn-primary">Update Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}
