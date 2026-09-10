import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function Magnet({
  children,
  className = '',
  strength = 0.35,
  reach = 45,
  disableOnMobile = true,
  as: Component = 'div',
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    // Only check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Disable on mobile/touch screens for reliable button tapping
    if (disableOnMobile && (window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024))) {
      return;
    }

    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power2.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power2.out' });

    const handlePointerMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Check if within bounds of the element plus magnetic reach
      const maxReachX = rect.width / 2 + reach;
      const maxReachY = rect.height / 2 + reach;

      if (Math.abs(deltaX) <= maxReachX && Math.abs(deltaY) <= maxReachY) {
        xTo(deltaX * strength);
        yTo(deltaY * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handlePointerLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    el.addEventListener('pointerleave', handlePointerLeave);
    el.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('mousemove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
      el.removeEventListener('mouseleave', handlePointerLeave);
      xTo(0);
      yTo(0);
    };
  }, [strength, reach]);

  return (
    <Component ref={ref} className={`inline-block ${className}`} {...props}>
      {children}
    </Component>
  );
}

export default Magnet;
