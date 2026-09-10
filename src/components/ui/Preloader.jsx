import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function Preloader({ onComplete }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const redCurtainRef = useRef(null);
  const blackCurtainRef = useRef(null);
  const textRef = useRef(null);
  const monogramRef = useRef(null);

  useEffect(() => {
    // Fast, non-blocking counter
    const counterObj = { value: 0 };
    
    const tl = gsap.timeline({
      onComplete: () => {
        const exitTl = gsap.timeline({
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });

        exitTl
          .to(textRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in'
          })
          .to(redCurtainRef.current, {
            yPercent: -100,
            duration: 0.35,
            ease: 'power3.inOut'
          }, 'curtain')
          .to(blackCurtainRef.current, {
            yPercent: -100,
            duration: 0.4,
            ease: 'power3.inOut',
            delay: 0.04
          }, 'curtain')
          .to(containerRef.current, {
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.15
          });
      }
    });

    tl.to(counterObj, {
      value: 100,
      duration: 0.35,
      ease: 'power2.out',
      onUpdate: () => {
        setCount(Math.floor(counterObj.value));
      }
    });

    // Instant dismiss on click or keypress
    const dismiss = () => {
      tl.progress(1);
      if (onComplete) onComplete();
    };

    window.addEventListener('keydown', dismiss, { once: true });
    window.addEventListener('click', dismiss, { once: true });

    return () => {
      tl.kill();
      window.removeEventListener('keydown', dismiss);
      window.removeEventListener('click', dismiss);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99990] flex items-center justify-center overflow-hidden pointer-events-auto select-none"
    >
      {/* Red Transition Curtain */}
      <div
        ref={redCurtainRef}
        className="absolute inset-0 bg-[#E10600] z-10"
      />

      {/* Main Dark Obsidian Curtain */}
      <div
        ref={blackCurtainRef}
        className="absolute inset-0 bg-[#0A0A0A] z-20 flex flex-col justify-between p-8 md:p-16"
      >
        {/* Top bar info */}
        <div className="flex items-center justify-between text-xs font-mono tracking-widest text-[#8E8E8E] uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-ping" />
            SYSTEM // INITIALIZING
          </span>
          <span>B.TECH CSE // SIT PUNE</span>
        </div>

        {/* Center Content: Monogram + Kinetic title */}
        <div className="flex flex-col items-center justify-center gap-6">
          <div
            ref={monogramRef}
            className="w-24 h-24 border border-[#F5F5F0]/20 flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E10600]/20 to-transparent" />
            <span className="font-display font-black text-5xl tracking-tighter text-[#F5F5F0]">
              V<span className="text-[#E10600]">.</span>
            </span>
            <div className="absolute bottom-1 right-2 text-[8px] font-mono text-[#8E8E8E]">SIT.CSE</div>
          </div>

          <div ref={textRef} className="text-center">
            <h1 className="font-display font-extrabold text-2xl md:text-4xl tracking-tight text-[#F5F5F0]">
              VATSAL CHAUDHARY
            </h1>
            <p className="font-mono text-xs tracking-widest text-[#8E8E8E] mt-2 uppercase">
              B.Tech Computer Science & Engineering // SIT Pune
            </p>
          </div>
        </div>

        {/* Bottom Bar: Monospace Progress & Counter */}
        <div className="flex items-end justify-between border-t border-[#F5F5F0]/10 pt-4">
          <div className="font-mono text-xs text-[#8E8E8E] hidden sm:block">
            SYMBIOSIS INSTITUTE OF TECHNOLOGY, PUNE
          </div>
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-xs text-[#E10600] tracking-widest">LOADING</span>
            <span className="text-4xl md:text-5xl font-bold tracking-tighter text-[#F5F5F0]">
              {count < 10 ? `0${count}` : count}
            </span>
            <span className="text-xs text-[#8E8E8E]">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
