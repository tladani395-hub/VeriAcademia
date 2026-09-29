'use client';
import { useRef } from 'react';
import { StatusChip } from './StatusChip';

export function Card3D() {
  const sceneRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!sceneRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    sceneRef.current.style.transform = `rotateX(${8 - y * 20}deg) rotateY(${-18 + x * 26}deg)`;
  };

  const handlePointerLeave = () => {
    if (!sceneRef.current) return;
    sceneRef.current.style.transform = 'rotateX(8deg) rotateY(-18deg)';
  };

  return (
    <div
      className="stage"
      aria-label="Illustration of a verified publication record"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="scene" ref={sceneRef}>
        <div className="card3d c1">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="mono">UNIVERSITY</span>
            <StatusChip type="ok" label="Verified" />
          </div>
          <h3 style={{ fontSize: 19, margin: '6px 0' }}>Charotar University of Science & Tech</h3>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14 }}>Verified domains · 9 institutes · 24 departments</p>
        </div>

        <div className="card3d c2">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="mono">doi:10.1016/j.smartsys.2026</span>
            <StatusChip type="req" label="Request required" />
          </div>
          <h3 style={{ fontSize: 19, margin: '6px 0' }}>Groundwater recovery in semi-arid basins</h3>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14 }}>Tirth Ladani, A. Patel · CHARUSAT University · 2026</p>
        </div>

        <div className="card3d c3">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="mono">EVIDENCE</span>
            <span className="mono" style={{ color: 'var(--muted)' }}>Reviewed 28 Sep 2026</span>
          </div>
          <p style={{ marginTop: 8, color: 'var(--muted)', fontSize: 14 }}>
            Affiliation confirmed by university reviewer. Linked to the canonical record. Revision history available.
          </p>
        </div>

        <svg className="seal" viewBox="0 0 92 92" aria-hidden="true">
          <circle cx="46" cy="46" r="42" fill="var(--gold)" />
          <circle cx="46" cy="46" r="34" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="3 4" />
          <path d="m28 47 12 12 24-27" stroke="#fff" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="mono" style={{ position: 'absolute', bottom: -10, left: 0, right: 0, textAlign: 'center', color: 'var(--muted)', fontSize: 13 }}>
          Sample verified record for illustration
        </div>
      </div>
    </div>
  );
}
