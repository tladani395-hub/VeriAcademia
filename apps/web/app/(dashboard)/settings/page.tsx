'use client';
import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences'>('profile');

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'preferences', label: 'Preferences' }
  ];

  return (
    <div>
      <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', margin: '0 0 32px' }}>Settings</h1>

      <div style={{ display: 'flex', gap: 20, marginBottom: 32, borderBottom: '1px solid var(--line)' }}>
        {tabs.map(tab => (
           <button
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             style={{
               padding: '12px 0',
               border: 'none',
               background: 'none',
               color: activeTab === tab.id ? 'var(--brand)' : 'var(--muted)',
               fontWeight: 600,
               borderBottom: activeTab === tab.id ? '2px solid var(--brand)' : 'none',
               cursor: 'pointer'
             }}
           >
             {tab.label}
           </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className="research-card">
          <h3 style={{ margin: '0 0 20px' }}>Profile Information</h3>
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontWeight: 600, marginBottom: 5 }}>Profile Completion: 75%</p>
            <div style={{ width: '100%', height: 8, background: 'var(--line)', borderRadius: 4 }}>
              <div style={{ width: '75%', height: '100%', background: 'var(--brand)', borderRadius: 4 }}></div>
            </div>
          </div>
          {/* ... more profile fields ... */}
        </div>
      )}

      {activeTab === 'preferences' && (
        <div className="research-card">
          <h3 style={{ margin: '0 0 20px' }}>Preferences</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20, borderBottom: '1px solid var(--line)' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontWeight: 600 }}>Email Notifications</p>
                <p className="muted" style={{ margin: 0, fontSize: 14 }}>Receive daily summaries of your account activity.</p>
              </div>
              <label className="check">
                <input type="checkbox" defaultChecked /> Enabled
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20, borderBottom: '1px solid var(--line)' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontWeight: 600 }}>Public Profile Visibility</p>
                <p className="muted" style={{ margin: 0, fontSize: 14 }}>Allow your profile to be found in search engines outside VeriAcademia.</p>
              </div>
              <label className="check">
                <input type="checkbox" defaultChecked /> Enabled
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 4px', fontWeight: 600 }}>Auto-approve Access Requests</p>
                <p className="muted" style={{ margin: 0, fontSize: 14 }}>Automatically grant access to verified peers from trusted universities.</p>
              </div>
              <label className="check">
                <input type="checkbox" /> Enabled
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
