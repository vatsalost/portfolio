import React, { useEffect, useRef, useCallback, Children, isValidElement } from 'react';
import './ScrollStack.css';

/**
 * ScrollStackItem
 * Individual card wrapper with sticky positioning and scroll distance margin.
 */
export const ScrollStackItem = ({
  children,
  className = '',
  itemClassName = '',
  ...props
}) => (
  <div
    className={`scroll-stack-item-wrapper ${itemClassName} ${className}`.trim()}
    {...props}
  >
    <div className="scroll-stack-card">
      {children}
    </div>
  </div>
);

/**
 * ScrollStack
 * ReactBits-inspired smooth scrolling card deck that pins and stacks cards progressively.
 * As newer cards slide in, preceding cards scale down, darken slightly, and tuck into a 3D deck.
 */
export function ScrollStack({
  children,
  className = '',
  topOffset = 92,          // px distance from viewport top for the first card
  itemStackDistance = 34,  // px vertical offset between stacked card tabs
  itemScale = 0.045,       // scale reduction per stack layer
  baseScale = 0.88,        // minimum scale for deeply stacked cards
  scrollRunway = 42,       // vh distance between cards to scroll through
  blurAmount = 0,          // optional blur for underlying cards
  onStackComplete,
}) {
  const containerRef = useRef(null);
  const wrapperRefs = useRef([]);
  const animFrameRef = useRef(null);
  const isCompletedRef = useRef(false);

  // Collect valid children into an array
  const childArray = Children.toArray(children).filter(isValidElement);

  const updateCardTransforms = useCallback(() => {
    const wrappers = wrapperRefs.current.filter(Boolean);
    if (!wrappers.length) return;

    const total = wrappers.length;
    const vh = window.innerHeight || 800;

    wrappers.forEach((wrapper, i) => {
      const cardInner = wrapper.querySelector('.scroll-stack-card');
      if (!cardInner) return;

      const targetStickyTop = topOffset + i * itemStackDistance;

      // Check how many cards after card i are stacking onto it
      let cumulativeDepth = 0;

      for (let j = i + 1; j < total; j++) {
        const nextWrapper = wrappers[j];
        if (!nextWrapper) continue;

        const nextStickyTop = topOffset + j * itemStackDistance;
        const nextRect = nextWrapper.getBoundingClientRect();

        // Distance from next card's current top to its sticky resting position
        const currentDist = nextRect.top - nextStickyTop;
        const arrivalSpan = vh * 0.75; // travel distance over which transition occurs

        if (currentDist <= 0) {
          // next card has fully reached or passed its sticky position
          cumulativeDepth += 1;
        } else if (currentDist < arrivalSpan) {
          // next card is in the process of gliding into the stack
          const p = 1 - currentDist / arrivalSpan;
          // Smooth ease-out curve
          const easeOut = 1 - Math.pow(1 - p, 2);
          cumulativeDepth += easeOut;
        }
      }

      // Calculate scale, brightness, opacity, and subtle vertical tuck
      const clampedDepth = Math.min(cumulativeDepth, 4);
      const scale = Math.max(baseScale, 1 - clampedDepth * itemScale);
      const brightness = Math.max(0.45, 1 - clampedDepth * 0.22);
      const opacity = Math.max(0.65, 1 - clampedDepth * 0.12);
      const translateY = -clampedDepth * 8; // subtle upward compression

      let filterString = `brightness(${brightness.toFixed(3)})`;
      if (blurAmount > 0 && clampedDepth > 0) {
        filterString += ` blur(${(clampedDepth * blurAmount).toFixed(1)}px)`;
      }

      cardInner.style.transform = `scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1) translateY(${translateY.toFixed(1)}px)`;
      cardInner.style.filter = filterString;
      cardInner.style.opacity = `${opacity.toFixed(3)}`;
    });

    // Check completion when the last card has reached its sticky position
    if (total > 0 && onStackComplete) {
      const lastWrapper = wrappers[total - 1];
      if (lastWrapper) {
        const lastStickyTop = topOffset + (total - 1) * itemStackDistance;
        const lastRect = lastWrapper.getBoundingClientRect();
        const isDone = lastRect.top <= lastStickyTop + 5;
        if (isDone && !isCompletedRef.current) {
          isCompletedRef.current = true;
          onStackComplete();
        } else if (!isDone && isCompletedRef.current) {
          isCompletedRef.current = false;
        }
      }
    }
  }, [topOffset, itemStackDistance, itemScale, baseScale, blurAmount, onStackComplete]);

  const scheduleUpdate = useCallback(() => {
    if (animFrameRef.current !== null) return;
    animFrameRef.current = requestAnimationFrame(() => {
      updateCardTransforms();
      animFrameRef.current = null;
    });
  }, [updateCardTransforms]);

  useEffect(() => {
    // Initial layout calculation
    scheduleUpdate();

    // Listen to window scroll (smoothly coordinated with Lenis or native)
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    // Periodic safety check for dynamic font/image layout stabilization
    const timer = setTimeout(scheduleUpdate, 300);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      clearTimeout(timer);
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [scheduleUpdate]);

  return (
    <div className={`scroll-stack-container ${className}`.trim()} ref={containerRef}>
      {childArray.map((child, idx) => {
        const isLast = idx === childArray.length - 1;
        const stickyTop = topOffset + idx * itemStackDistance;
        const marginBottom = isLast ? '12vh' : `${scrollRunway}vh`;

        // If the child is already a ScrollStackItem, clone it with props
        if (child.type === ScrollStackItem) {
          return React.cloneElement(child, {
            key: child.key || idx,
            ref: (el) => { wrapperRefs.current[idx] = el; },
            style: {
              top: `${stickyTop}px`,
              zIndex: idx + 1,
              marginBottom,
              ...child.props.style,
            },
          });
        }

        // Otherwise wrap it in a ScrollStackItem
        return (
          <div
            key={child.key || idx}
            ref={(el) => { wrapperRefs.current[idx] = el; }}
            className="scroll-stack-item-wrapper"
            style={{
              top: `${stickyTop}px`,
              zIndex: idx + 1,
              marginBottom,
            }}
          >
            <div className="scroll-stack-card">
              {child}
            </div>
          </div>
        );
      })}
      {/* Runway spacer ensuring the bottom card clears cleanly before leaving */}
      <div className="scroll-stack-runway-end" />
    </div>
  );
}

export default ScrollStack;
