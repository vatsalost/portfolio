import React, { useRef, useState, useEffect } from 'react';

export function ScrollReveal({
  children,
  className = '',
  threshold = 0.05,
  delay = 0,
  duration = 0.7,
  direction = 'up',
  as: Component = 'div',
  ...props
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    // Check if already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const timer = setTimeout(() => setIsVisible(true), Math.max(delay * 1000, 30));
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [threshold, delay]);

  const translateY = direction === 'up' ? 24 : direction === 'down' ? -24 : 0;

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : `translateY(${translateY}px)`,
    transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
    willChange: isVisible ? 'auto' : 'opacity, transform'
  };

  return (
    <Component ref={ref} style={style} className={className} {...props}>
      {children}
    </Component>
  );
}

export default ScrollReveal;
