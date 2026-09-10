import React, { useEffect, useRef } from 'react';

export function ReactiveCanvas({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;
    let width = 0;
    let height = 0;

    // Accessibility check: respect user reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
      if (prefersReducedMotion) {
        drawFrame(0);
      }
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

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Dynamic grid resolution: lightweight on mobile, detailed on desktop
    const isMobile = window.innerWidth < 768;
    const cols = isMobile ? 14 : 24;
    const rows = isMobile ? 10 : 16;
    let time = 0;

    const drawFrame = (currentTime) => {
      ctx.clearRect(0, 0, width, height);

      // Ambient crimson glow near mouse
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 10,
        mouse.x, mouse.y, 320
      );
      gradient.addColorStop(0, 'rgba(225, 6, 0, 0.07)');
      gradient.addColorStop(1, 'rgba(10, 10, 10, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

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
          const mouseFactor = Math.max(0, 1 - dist / 300);

          const wave = Math.sin(c * 0.3 + currentTime + r * 0.2) * 14 * Math.cos(r * 0.2 + currentTime * 0.8);
          const mouseDisplaceY = -Math.sin(dist * 0.015 - currentTime * 2) * (mouseFactor * 35);
          const mouseDisplaceX = (dx / (dist || 1)) * (mouseFactor * 18);

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
        const alpha = 0.03 + rowFactor * 0.09;
        ctx.strokeStyle = `rgba(245, 245, 240, ${alpha})`;
        ctx.stroke();
      }

      // Draw connecting nodes near mouse
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const p = points[r][c];
          if (p.factor > 0.35) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.factor * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(225, 6, 0, ${p.factor * 0.75})`;
            ctx.fill();

            if (p.factor > 0.65) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = `rgba(225, 6, 0, ${(p.factor - 0.65) * 0.22})`;
              ctx.stroke();
            }
          }
        }
      }
    };

    const render = () => {
      if (!isVisible) return;

      time += 0.015;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      drawFrame(time);

      animationFrameId = requestAnimationFrame(render);
    };

    // If user prefers reduced motion, draw static frame and stop
    if (prefersReducedMotion) {
      drawFrame(0);
    } else {
      render();
    }

    // IntersectionObserver to pause loop when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;

        if (isVisible && !wasVisible && !prefersReducedMotion) {
          render();
        } else if (!isVisible && animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
