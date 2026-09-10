import React, { useEffect, useRef } from 'react';

export function ReactiveCanvas({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0;
    let height = 0;

    const updateSize = () => {
      const parent = canvas.parentElement;
      width = canvas.width = parent ? parent.clientWidth : window.innerWidth;
      height = canvas.height = parent ? parent.clientHeight : window.innerHeight;
    };

    updateSize();

    // Mouse coordinates with easing
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false
    };

    const handleResize = () => {
      updateSize();
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
      mouse.isHovered = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Grid lines for topographic / kinetic horizon
    const cols = 26;
    const rows = 16;
    let time = 0;

    const render = () => {
      time += 0.015;

      // Mouse smoothing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Subtle ambient glow near mouse
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 10,
        mouse.x, mouse.y, 350
      );
      gradient.addColorStop(0, 'rgba(225, 6, 0, 0.08)');
      gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Undulating topographic grid lines
      const spacingX = width / Math.max(1, cols - 1);
      const spacingY = (height * 0.75) / Math.max(1, rows - 1);
      const startY = height * 0.18;

      ctx.lineWidth = 1;

      // Calculate grid points
      const points = [];
      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const baseX = c * spacingX;
          const baseY = startY + r * spacingY;

          const dx = baseX - mouse.x;
          const dy = baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseFactor = Math.max(0, 1 - dist / 320);

          const wave = Math.sin(c * 0.3 + time + r * 0.2) * 16 * Math.cos(r * 0.2 + time * 0.8);
          const mouseDisplaceY = -Math.sin(dist * 0.015 - time * 2) * (mouseFactor * 40);
          const mouseDisplaceX = (dx / (dist || 1)) * (mouseFactor * 20);

          points[r][c] = {
            x: baseX + mouseDisplaceX,
            y: baseY + wave + mouseDisplaceY,
            factor: mouseFactor
          };
        }
      }

      // Render horizontal wave curves
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          if (c === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            const prev = points[r][c - 1];
            const cx = (prev.x + p.x) / 2;
            const cy = (prev.y + p.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
          }
        }

        const rowFactor = r / rows;
        const alpha = 0.04 + rowFactor * 0.1;
        ctx.strokeStyle = `rgba(245, 245, 240, ${alpha})`;
        ctx.stroke();
      }

      // Draw connecting nodes near the mouse
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const p = points[r][c];
          if (p.factor > 0.3) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.factor * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(225, 6, 0, ${p.factor * 0.8})`;
            ctx.fill();

            if (p.factor > 0.6) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = `rgba(225, 6, 0, ${(p.factor - 0.6) * 0.25})`;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
}
