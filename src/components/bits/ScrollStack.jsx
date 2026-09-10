import React, { useLayoutEffect, useRef, useCallback, useEffect } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '', className = '', ...props }) => (
  <div className={`scroll-stack-card-wrapper ${itemClassName} ${className}`.trim()} {...props}>
    <div className="scroll-stack-card">
      {children}
    </div>
  </div>
);

export function ScrollStack({
  children,
  className = '',
  itemDistance = 40,
  itemScale = 0.035,
  itemStackDistance = 26,
  stackPosition = '12%',
  scaleEndPosition = '6%',
  baseScale = 0.91,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete
}) {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY || document.documentElement.scrollTop || 0,
        containerHeight: window.innerHeight || 800,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) {
        return { scrollTop: 0, containerHeight: 600, scrollContainer: null };
      }
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element) => {
      if (!element) return 0;
      if (useWindowScroll) {
        const rect = element.getBoundingClientRect();
        return rect.top + (window.scrollY || document.documentElement.scrollTop || 0);
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = scrollerRef.current?.querySelector('.scroll-stack-end');
    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = getElementOffset(card.parentElement || card);
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      // Calculate scale relative to subsequent cards stacking over it
      let topCardIndex = 0;
      for (let j = 0; j < cardsRef.current.length; j++) {
        const jCard = cardsRef.current[j];
        const jCardTop = getElementOffset(jCard.parentElement || jCard);
        const jPinStart = jCardTop - stackPositionPx - itemStackDistance * j;
        if (scrollTop >= jPinStart) {
          topCardIndex = j;
        }
      }

      let scale = 1;
      let opacity = 1;
      if (i < topCardIndex) {
        const depth = topCardIndex - i;
        scale = Math.max(baseScale, 1 - depth * itemScale);
        opacity = Math.max(0.7, 1 - depth * 0.08);
      } else if (i === topCardIndex) {
        scale = 1;
        opacity = 1;
      }

      const rotation = rotationAmount ? i * rotationAmount : 0;
      const blur = blurAmount && i < topCardIndex ? (topCardIndex - i) * blurAmount : 0;

      const newTransform = {
        translateY: Math.round(translateY * 10) / 10,
        scale: Math.round(scale * 1000) / 1000,
        opacity: Math.round(opacity * 100) / 100,
        rotation: Math.round(rotation * 10) / 10,
        blur: Math.round(blur * 10) / 10
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.5 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.002 ||
        Math.abs(lastTransform.opacity - newTransform.opacity) > 0.01;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale})`;
        card.style.opacity = `${newTransform.opacity}`;
        if (newTransform.blur > 0) {
          card.style.filter = `blur(${newTransform.blur}px)`;
        } else {
          card.style.filter = '';
        }
        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const requestUpdate = useCallback(() => {
    if (animationFrameRef.current !== null) return;
    animationFrameRef.current = requestAnimationFrame(() => {
      updateCardTransforms();
      animationFrameRef.current = null;
    });
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card'));
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      card.style.willChange = 'transform, opacity';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
    });

    // Initial calculation
    requestUpdate();

    const scrollTarget = useWindowScroll ? window : scroller;
    scrollTarget.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });

    return () => {
      scrollTarget.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [useWindowScroll, requestUpdate]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
}

export default ScrollStack;
