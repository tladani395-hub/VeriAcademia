'use client';

import { useState } from 'react';
import { StatusChip } from '@/components/StatusChip';

export default function MyProfilePage() {
  const [fullName, setFullName] = useState('Dr. Tirth Ladani');
  const [roleTitle, setRoleTitle] = useState('Professor & Lead AI Researcher');
  const [department, setDepartment] = useState('Department of Computer Science & Engineering');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: 840 }}>
      {/* Profile Header Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 16,
          padding: 32,
          marginBottom: 32,
          boxShadow: '0 4px 6px -1px var(--shadow)',
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--brand-strong), var(--brand))',
            color: '#ffffff',
            display: 'grid',
            placeItems: 'center',
            fontSize: 28,
            fontWeight: 700,
            fontFamily: 'var(--display)',
            boxShadow: '0 10px 25px -5px var(--shadow-lg)',
          }}
        >
          TL
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <h1 style={{ fontSize: 26, margin: 0, fontFamily: 'var(--display)' }}>{fullName}</h1>
            <StatusChip type="ok" label="Verified Scholar" />
          </div>
          <p style={{ margin: '0 0 6px', color: 'var(--muted)', fontSize: 15 }}>
            {roleTitle} · Charotar University of Science & Tech
          </p>
          <div className="mono" style={{ fontSize: 13, color: 'var(--brand)' }}>
            ORCID: 0000-0002-1825-0097 · Verified Node #741
          </div>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="research-card" style={{ padding: 32, marginBottom: 24 }}>
        <h3 style={{ fontSize: 20, margin: '0 0 24px', fontFamily: 'var(--display)' }}>Personal & Institutional Details</h3>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '1px solid var(--line)',
                  background: 'var(--surface)',
                  color: 'var(--ink)',
                  fontSize: 15,
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Institutional Email</label>
              <input
                type="email"
                defaultValue="tirth.ladani@charusat.edu.in"
                disabled
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '1px solid var(--line)',
                  background: 'var(--paper)',
                  color: 'var(--muted)',
                  fontSize: 15,
                }}
              />
              <span style={{ fontSize: 12.5, color: 'var(--muted)', display: 'block', marginTop: 4 }}>
                * Institutional address verified via CHARUSAT domain key.
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Academic Title</label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '1px solid var(--line)',
                  background: 'var(--surface)',
                  color: 'var(--ink)',
                  fontSize: 15,
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '1px solid var(--line)',
                  background: 'var(--surface)',
                  color: 'var(--ink)',
                  fontSize: 15,
                }}
              />
            </div>
          </div>

          {saved && (
            <div style={{ padding: 12, background: 'rgba(22, 163, 74, 0.1)', color: 'var(--success)', borderRadius: 8, fontSize: 14 }}>
              ✓ Profile information updated successfully.
            </div>
          )}

          <div style={{ marginTop: 8 }}>
            <button className="btn primary" type="submit" style={{ padding: '0 24px', height: 44 }}>
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Security & Access Section */}
      <div className="research-card" style={{ padding: 32 }}>
        <h3 style={{ fontSize: 20, margin: '0 0 12px', fontFamily: 'var(--display)' }}>Security & Provenance Keys</h3>
        <p className="muted" style={{ fontSize: 14.5, marginBottom: 24 }}>
          Manage your account credentials, institutional 2FA keys, and signing certificates.
        </p>

        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button type="button" className="btn">Change Password</button>
          <button type="button" className="btn">Configure Hardware 2FA Key</button>
          <button type="button" className="btn" style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
            Export Audit Digest
          </button>
        </div>
      </div>
    </div>
  );
}
