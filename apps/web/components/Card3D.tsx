'use client';

import React, { useRef, useState } from 'react';
import { StatusChip } from './StatusChip';

export function Card3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<'record' | 'proof' | 'chain'>('record');

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!sceneRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Calculate rotation angles (-20 to +20 degrees)
    const rotX = (0.5 - y) * 24;
    const rotY = (x - 0.5) * 28;

    sceneRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Move glare specular spotlight
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${
        y * 100
      }%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%)`;
    }
  };

  const handlePointerLeave = () => {
    if (!sceneRef.current) return;
    sceneRef.current.style.transform = 'rotateX(8deg) rotateY(-14deg) scale3d(1, 1, 1)';
    if (glareRef.current) {
      glareRef.current.style.background = 'none';
    }
  };

  return (
    <div
      ref={containerRef}
      className="stage"
      style={{ perspective: '1200px', cursor: 'pointer' }}
      aria-label="Illustration of a verified publication record"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className="scene"
        ref={sceneRef}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        {/* Dynamic Glare Overlay */}
        <div
          ref={glareRef}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '20px',
            pointerEvents: 'none',
            zIndex: 10,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Back Card: University Verification */}
        <div
          className="card3d c1"
          style={{
            transform: 'translateZ(-60px) translateX(28px)',
            opacity: 0.94,
            borderColor: 'var(--brand)',
            boxShadow: '0 20px 40px rgba(2, 132, 199, 0.15)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="mono" style={{ color: 'var(--brand)', fontWeight: 600 }}>INSTITUTION VERIFIED</span>
            <StatusChip type="ok" label="Active Node" />
          </div>
          <h3 style={{ fontSize: 18, margin: '8px 0 4px', color: 'var(--ink)' }}>
            Charotar University of Science & Tech
          </h3>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: 13.5 }}>
            Verified Domain Signature · 9 Institutes · 24 Research Depts
          </p>
        </div>

        {/* Middle Card: Publication Main Data */}
        <div
          className="card3d c2"
          style={{
            transform: 'translateZ(20px)',
            background: 'var(--surface)',
            boxShadow: '0 25px 60px -10px var(--shadow-lg)',
            border: '1px solid var(--line)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="mono" style={{ fontSize: 12, color: 'var(--brand)', fontWeight: 600 }}>
              DOI: 10.1016/j.smartsys.2026
            </span>
            <StatusChip type="req" label="Open Access" />
          </div>
          <h3 style={{ fontSize: 19, margin: '10px 0 6px', fontWeight: 700, lineHeight: 1.3 }}>
            Groundwater Recovery & AI Sensor Networks in Semi-Arid Basins
          </h3>
          <p style={{ margin: '0 0 12px', color: 'var(--muted)', fontSize: 14 }}>
            Student · CHARUSAT University · Published Sep 2026
          </p>

          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <button
              onClick={() => setActiveTab('record')}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: 'none',
                fontSize: 12,
                fontWeight: 600,
                background: activeTab === 'record' ? 'var(--brand)' : 'var(--paper)',
                color: activeTab === 'record' ? '#fff' : 'var(--muted)',
                cursor: 'pointer',
              }}
            >
              Record Data
            </button>
            <button
              onClick={() => setActiveTab('proof')}
              style={{
                padding: '4px 10px',
                borderRadius: 6,
                border: 'none',
                fontSize: 12,
                fontWeight: 600,
                background: activeTab === 'proof' ? 'var(--brand)' : 'var(--paper)',
                color: activeTab === 'proof' ? '#fff' : 'var(--muted)',
                cursor: 'pointer',
              }}
            >
              Institutional Proof
            </button>
          </div>
        </div>

        {/* Front Layer: Proof Evidence Badge */}
        <div
          className="card3d c3"
          style={{
            transform: 'translateZ(85px) translateX(-22px)',
            background: 'var(--surface)',
            borderLeft: '5px solid var(--brand)',
            boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="mono" style={{ color: 'var(--brand)', fontWeight: 700, fontSize: 12 }}>
              EVIDENCE PROTOCOL
            </span>
            <span className="mono" style={{ color: 'var(--success)', fontSize: 12, fontWeight: 600 }}>
              ✓ Immutable
            </span>
          </div>
          <p style={{ marginTop: 8, margin: '8px 0 0', color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.45 }}>
            {activeTab === 'record' && 'Affiliation confirmed by university registrar key. Peer-review audit chain signed.'}
            {activeTab === 'proof' && 'Cryptographic digest matches original repository timestamp 2026-09-28T10:14:00Z.'}
            {activeTab === 'chain' && 'Distributed node verification consensus reached across 14 partner universities.'}
          </p>
        </div>

        <div
          className="mono"
          style={{
            position: 'absolute',
            bottom: -24,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'var(--muted)',
            fontSize: 12,
            letterSpacing: '0.04em',
          }}
        >
          ✦ Interactive 3D Verified Node Proof
        </div>
      </div>
    </div>
  );
}
