import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function Magnet({
  children,
  className = '',
  strength = 0.22,
  maxDistance = 75,
  as: Component = 'div',
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    // Disable on touch or small devices or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < maxDistance) {
        xTo(deltaX * strength);
        yTo(deltaY * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      xTo(0);
      yTo(0);
    };
  }, [strength, maxDistance]);

  return (
    <Component ref={ref} className={`inline-block ${className}`} {...props}>
      {children}
    </Component>
  );
}

export default Magnet;
