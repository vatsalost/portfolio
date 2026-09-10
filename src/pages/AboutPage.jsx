import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Terminal, Cpu, GraduationCap, Code2, Layers, BookOpen, Trophy, Zap, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagneticButton } from '../components/ui/MagneticButton';
import { useAudio } from '../context/AudioContext';
import { SpotlightCard } from '../components/bits/SpotlightCard';
import { ParticleText } from '../components/bits/ParticleText';
import { BorderGlow } from '../components/bits/BorderGlow';

gsap.registerPlugin(ScrollTrigger);

export function AboutPage() {
  const timelineRef = useRef(null);
  const { playHover } = useAudio();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = timelineRef.current?.querySelectorAll('.timeline-card');
      if (items) {
        items.forEach((item) => {
          gsap.from(item, {
            opacity: 0,
            x: -30,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-32 pb-32 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* 1. Header & Intro */}
      <div className="border-b border-[#F5F5F0]/10 pb-16 mb-20">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
            // PERSONAL PROFILE
          </span>
          <span className="font-mono text-[10px] text-[#8E8E8E] tracking-widest hidden sm:inline-block">
            [INTERACTIVE • MOVE CURSOR TO SCATTER PARTICLES]
          </span>
        </div>

        {/* Interactive ReactBits Particle Text for Name */}
        <div
          className="w-full h-24 sm:h-32 md:h-40 lg:h-48 mb-2 cursor-crosshair select-none"
          data-cursor="PARTICLES"
        >
          <ParticleText
            text="VATSAL CHAUDHARY"
            color="#F5F5F0"
            highlightColor="#E10600"
            fontFamily="'Syne', sans-serif"
            fontWeight={900}
            fontSize="clamp(2.1rem, 6.2vw, 5.5rem)"
            particleSize={2.1}
            density={3.2}
            pointerRepel={50}
            repelRadius={130}
            idleDrift={0.5}
            align="left"
            className="w-full h-full"
          />
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-[#F5F5F0] tracking-tight uppercase leading-[0.9] mb-8">
          <span className="text-stroke-bone hover:text-[#E10600] transition-colors">ABOUT ME.</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          {/* Terminal Identity Card */}
          <div className="lg:col-span-5">
            <BorderGlow
              borderRadius={16}
              glowRadius={36}
              edgeSensitivity={24}
              glowColor="0 100 50"
              colors={['#E10600', '#FF3333', '#8B0000']}
              backgroundColor="#121212"
              className="p-6 font-mono text-xs"
            >
              {/* Terminal Window Chrome */}
              <div className="flex items-center justify-between border-b border-[#F5F5F0]/10 pb-3 mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E10600]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5F5F0]/20" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F5F5F0]/20" />
                </div>
                <span className="text-[10px] text-[#8E8E8E] tracking-widest">vatsal@sit-pune: ~</span>
              </div>

              {/* Terminal Monogram & Info */}
              <div className="space-y-4">
                <div className="p-4 bg-[#0A0A0A] border border-[#F5F5F0]/5 flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#161616] border border-[#E10600]/40 flex items-center justify-center font-display font-black text-3xl text-[#F5F5F0] shrink-0">
                    V<span className="text-[#E10600]">.</span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#F5F5F0]">Vatsal Chaudhary</div>
                    <div className="text-[11px] text-[#8E8E8E]">B.Tech CSE</div>
                    <div className="text-[10px] text-[#A3A39B]">Symbiosis Institute of Technology, Pune</div>
                    <div className="text-[10px] text-[#E10600] mt-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] animate-pulse" />
                      Status: Open to Hackathons & Collaborations
                    </div>
                  </div>
                </div>

                {/* Shell Details */}
                <div className="space-y-2 text-[11px] leading-relaxed">
                  <div className="flex gap-2">
                    <span className="text-[#E10600]">$</span>
                    <span className="text-[#8E8E8E]">whoami</span>
                  </div>
                  <p className="text-[#F5F5F0] pl-3 border-l border-[#F5F5F0]/10">
                    Computer Science student who enjoys building projects, participating in hackathons, and learning by working on things that challenge me.
                  </p>

                  <div className="flex gap-2 pt-2">
                    <span className="text-[#E10600]">$</span>
                    <span className="text-[#8E8E8E]">cat technical_skills.json</span>
                  </div>
                  <div className="pl-3 border-l border-[#F5F5F0]/10 text-[#8E8E8E] space-y-0.5">
                    <div>• Languages: C, C++, Java</div>
                    <div>• Web: HTML, CSS</div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <span className="text-[#E10600]">$</span>
                    <span className="text-[#8E8E8E]">cat interests.txt</span>
                  </div>
                  <div className="pl-3 border-l border-[#F5F5F0]/10 text-[#8E8E8E] space-y-0.5">
                    <div>• Hackathons & Fast Prototyping</div>
                    <div>• Building Projects & Experimenting</div>
                    <div>• Learning through Hands-on Development</div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <span className="text-[#E10600]">$</span>
                    <span className="text-[#8E8E8E]">echo $CURRENT_MINDSET</span>
                  </div>
                  <div className="pl-3 border-l border-[#E10600] text-[#F5F5F0]">
                    "Build things, try new ideas, and learn by working on real projects."
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F5F5F0]/10 flex justify-between text-[10px] text-[#8E8E8E]">
                  <span>LOCATION: Pune, India</span>
                  <span>OPEN FOR: Hackathons & Collabs</span>
                </div>
              </div>
            </BorderGlow>
          </div>

          {/* Genuine Personal Introduction */}
          <div className="lg:col-span-7 space-y-6 font-sans font-light text-base md:text-lg text-[#8E8E8E] leading-relaxed">
            <p className="text-[#F5F5F0] text-xl md:text-2xl font-normal leading-relaxed">
              I'm Vatsal Chaudhary, currently pursuing a B.Tech in Computer Science & Engineering at Symbiosis Institute of Technology, Pune.
            </p>
            <p>
              I enjoy building projects, participating in hackathons, and learning by working on things that challenge me. Rather than just studying concepts in theory, I prefer writing code, testing ideas, and seeing how things actually work when built.
            </p>
            <p>
              I'm always interested in joining hackathons, meeting people who like building things, and collaborating on interesting ideas. Whether it's a weekend build under time pressure or a software tool to solve a practical problem, I love the process of turning an initial concept into a working project.
            </p>

            <div className="p-4 bg-[#121212] border-l-2 border-[#E10600] font-mono text-xs text-[#F5F5F0]">
              <span className="text-[#E10600] font-bold block mb-1">CORE PASSIONS:</span>
              Hackathons • Building Projects • Experimenting with Technology • Hands-On Learning
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <MagneticButton href="/contact" variant="primary">
                REACH OUT & CONNECT
              </MagneticButton>
              <MagneticButton href="https://github.com/vatsalost" target="_blank" rel="noreferrer" variant="outline">
                GITHUB PROFILE <ArrowUpRight className="w-3.5 h-3.5" />
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Education Section */}
      <div className="mb-24">
        <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-4">
          // ACADEMICS
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-[#F5F5F0] tracking-tight uppercase mb-8">
          EDUCATION
        </h2>

        <div className="p-8 bg-[#121212] border border-[#F5F5F0]/10 rounded-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F5F5F0]/10 pb-4">
            <div>
              <span className="font-mono text-xs text-[#E10600] font-bold uppercase tracking-wider block">
                UNDERGRADUATE DEGREE
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#F5F5F0] mt-1">
                B.Tech — Computer Science & Engineering
              </h3>
            </div>
            <span className="font-mono text-xs text-[#8E8E8E] bg-[#0A0A0A] px-3 py-1.5 border border-[#F5F5F0]/10 self-start sm:self-auto">
              CURRENTLY ENROLLED
            </span>
          </div>

          <div className="flex items-center gap-2 text-base sm:text-lg font-sans text-[#F5F5F0]">
            <GraduationCap className="w-5 h-5 text-[#E10600]" />
            <strong className="font-semibold">Symbiosis Institute of Technology, Pune</strong>
          </div>

          <p className="font-sans text-sm text-[#8E8E8E] leading-relaxed pt-2">
            Focusing on computer science fundamentals, programming logic, object-oriented systems, and hands-on application development.
          </p>
        </div>
      </div>

      {/* 3. Technical Skills Section */}
      <div className="mb-24 border-t border-[#F5F5F0]/10 pt-16">
        <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-4">
          // TECHNICAL SKILLS
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-[#F5F5F0] tracking-tight uppercase mb-8">
          WHAT I KNOW
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Languages */}
          <BorderGlow
            borderRadius={16}
            glowRadius={36}
            edgeSensitivity={24}
            glowColor="0 100 50"
            colors={['#E10600', '#FF3333', '#8B0000']}
            backgroundColor="#121212"
            className="p-8 space-y-4"
          >
            <div className="flex items-center gap-3 border-b border-[#F5F5F0]/10 pb-3">
              <Terminal className="w-5 h-5 text-[#E10600]" />
              <h3 className="font-display font-bold text-xl text-[#F5F5F0]">
                PROGRAMMING LANGUAGES
              </h3>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#0A0A0A] border border-[#F5F5F0]/5 flex justify-between items-center">
                <span className="text-[#F5F5F0] font-bold text-sm">C</span>
                <span className="text-[#8E8E8E]">Procedural & Systems Logic</span>
              </div>
              <div className="p-3 bg-[#0A0A0A] border border-[#F5F5F0]/5 flex justify-between items-center">
                <span className="text-[#F5F5F0] font-bold text-sm">C++</span>
                <span className="text-[#8E8E8E]">OOP & Data Structures</span>
              </div>
              <div className="p-3 bg-[#0A0A0A] border border-[#F5F5F0]/5 flex justify-between items-center">
                <span className="text-[#F5F5F0] font-bold text-sm">Java</span>
                <span className="text-[#8E8E8E]">OOP Principles & Application Logic</span>
              </div>
            </div>
          </BorderGlow>

          {/* Web Technologies */}
          <BorderGlow
            borderRadius={16}
            glowRadius={36}
            edgeSensitivity={24}
            glowColor="0 100 50"
            colors={['#E10600', '#FF3333', '#8B0000']}
            backgroundColor="#121212"
            className="p-8 space-y-4"
          >
            <div className="flex items-center gap-3 border-b border-[#F5F5F0]/10 pb-3">
              <Layers className="w-5 h-5 text-[#E10600]" />
              <h3 className="font-display font-bold text-xl text-[#F5F5F0]">
                WEB TECHNOLOGIES
              </h3>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#0A0A0A] border border-[#F5F5F0]/5 flex justify-between items-center">
                <span className="text-[#F5F5F0] font-bold text-sm">HTML</span>
                <span className="text-[#8E8E8E]">Semantic Markup & Structure</span>
              </div>
              <div className="p-3 bg-[#0A0A0A] border border-[#F5F5F0]/5 flex justify-between items-center">
                <span className="text-[#F5F5F0] font-bold text-sm">CSS</span>
                <span className="text-[#8E8E8E]">Styling, Layouts & Responsive Design</span>
              </div>
            </div>
          </BorderGlow>
        </div>

        <p className="mt-4 font-mono text-xs text-[#8E8E8E]">
          * Note: The technologies listed above represent my core programming skills. Any additional libraries or frameworks used in specific web prototypes and projects are documented separately in individual case studies.
        </p>
      </div>

      {/* 4. Hackathons & Collaboration Section */}
      <div className="border-t border-[#F5F5F0]/10 pt-16">
        <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-4">
          // CULTURE & MINDSET
        </span>
        <h2 className="font-display font-black text-3xl sm:text-5xl text-[#F5F5F0] tracking-tight uppercase mb-8">
          HACKATHONS
        </h2>

        <div className="p-8 md:p-12 bg-[#121212] border-l-4 border-[#E10600] border-y border-r border-[#F5F5F0]/10 rounded-r-xl space-y-6">
          <blockquote className="text-lg md:text-2xl font-light text-[#F5F5F0] font-sans leading-relaxed italic">
            "I enjoy building under pressure, experimenting with ideas, and working with people who like turning ideas into working projects."
          </blockquote>

          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E10600] animate-ping" />
              <h3 className="font-mono text-sm font-bold text-[#E10600] uppercase tracking-wider">
                OPEN TO HACKATHONS
              </h3>
            </div>
            <p className="font-sans text-base text-[#8E8E8E] leading-relaxed max-w-3xl">
              Looking for teammates, ideas, and opportunities to participate in upcoming hackathons. If you're organizing a team or want to brainstorm a project for an upcoming event, I'd love to connect.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <MagneticButton href="/contact" variant="primary">
              LET'S TEAM UP
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
