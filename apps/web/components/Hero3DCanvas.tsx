'use client';

import React, { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  oz: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
}

export function Hero3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 450;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for 3D rotation parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left - width / 2) * 0.001;
      targetMouseY = (e.clientY - rect.top - height / 2) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Generate 3D nodes representing research nodes & data points
    const count = 55;
    const points: Point3D[] = [];
    const colors = ['#0284c7', '#0369a1', '#65c2c9', '#38bdf8', '#818cf8'];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * width * 1.2;
      const y = (Math.random() - 0.5) * height * 1.2;
      const z = (Math.random() - 0.5) * 400;
      points.push({
        x,
        y,
        z,
        ox: x,
        oy: y,
        oz: z,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const focalLength = 300;

    const render = () => {
      // Smooth interpolation for mouse parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cosX = Math.cos(mouseY);
      const sinX = Math.sin(mouseY);
      const cosY = Math.cos(mouseX);
      const sinY = Math.sin(mouseX);

      const projectedPoints: { px: number; py: number; scale: number; color: string; radius: number }[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Animate drift
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Boundaries bounce
        if (Math.abs(p.x - p.ox) > 60) p.vx *= -1;
        if (Math.abs(p.y - p.oy) > 60) p.vy *= -1;
        if (Math.abs(p.z - p.oz) > 60) p.vz *= -1;

        // 3D Rotation based on mouse position
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        let y1 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        // Perspective projection
        const scale = focalLength / (focalLength + z2 + 250);
        const px = x1 * scale + width / 2;
        const py = y1 * scale + height / 2;

        if (scale > 0) {
          projectedPoints.push({ px, py, scale, color: p.color, radius: p.radius });
        }
      }

      // Draw connecting 3D grid constellation lines
      ctx.lineWidth = 0.6;
      for (let i = 0; i < projectedPoints.length; i++) {
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p1 = projectedPoints[i];
          const p2 = projectedPoints[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.25 * Math.min(p1.scale, p2.scale);
            ctx.strokeStyle = `rgba(2, 132, 199, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw projected node points with depth sizing
      for (let i = 0; i < projectedPoints.length; i++) {
        const p = projectedPoints[i];
        const r = p.radius * p.scale;
        if (r <= 0) continue;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, Math.max(0.2, p.scale));
        ctx.beginPath();
        ctx.arc(p.px, p.py, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.65,
      }}
    />
  );
}
