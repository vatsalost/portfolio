import React from 'react';
import { ArrowUpRight, Github, Mail, Terminal, Layers, BookOpen, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';
import { ScrollReveal } from '../components/bits/ScrollReveal';

export function AboutPage() {
  const { playClick, playHover } = useAudio();

  return (
    <div className="pt-32 pb-32 px-6 md:px-12 max-w-5xl mx-auto min-h-screen text-[#F2F0EA]">
      {/* 1. Category Tag & Large Statement */}
      <ScrollReveal threshold={0.15}>
        <div className="border-b border-[#F2F0EA]/10 pb-16 mb-16">
          <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-4">
            // ABOUT VATSAL
          </span>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.95] mb-8 text-[#F2F0EA]">
            BUILDING, EXPERIMENTING & LEARNING BY DOING<span className="text-[#E10600]">.</span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl font-sans font-light text-[#A3A39B] leading-relaxed max-w-3xl">
            I am Vatsal Chaudhary, currently pursuing a B.Tech in Computer Science & Engineering at Symbiosis Institute of Technology, Pune.
          </p>
        </div>
      </ScrollReveal>

      {/* 2. Narrative Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 text-base sm:text-lg font-sans font-light text-[#A3A39B] leading-relaxed">
        <div className="md:col-span-4 font-mono text-xs text-[#E10600] uppercase tracking-widest">
          // THE APPROACH
        </div>
        <div className="md:col-span-8 space-y-6">
          <p>
            I like building things I want to understand. Rather than just studying concepts in abstract, I learn best by writing code, breaking things, and figuring out why they work.
          </p>
          <p>
            Hackathons have been one of my favorite ways to grow. Building under tight deadlines forces you to focus on the core problem, collaborate effectively, and turn rough ideas into functioning prototypes.
          </p>
          <p className="text-[#F2F0EA]">
            I am always open to participating in hackathons, collaborating on interesting projects, and teaming up with other builders.
          </p>
        </div>
      </div>

      {/* 3. Editorial Structured Sections */}
      <div className="border-t border-[#F2F0EA]/10 divide-y divide-[#F2F0EA]/10 font-mono text-xs">
        {/* EDUCATION */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-4 text-[#8E8E8E] uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#E10600]" />
            <span>EDUCATION</span>
          </div>
          <div className="md:col-span-8 space-y-1">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F2F0EA]">
              B.Tech Computer Science & Engineering
            </h3>
            <p className="text-[#8E8E8E] font-sans text-sm">
              Symbiosis Institute of Technology, Pune
            </p>
          </div>
        </div>

        {/* SKILLS */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-4 text-[#8E8E8E] uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#E10600]" />
            <span>SKILLS</span>
          </div>
          <div className="md:col-span-8 space-y-4">
            <div>
              <span className="text-[11px] text-[#8E8E8E] block mb-2">LANGUAGES</span>
              <div className="flex flex-wrap gap-2">
                {['C', 'C++', 'Java'].map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 bg-[#141414] border border-[#F2F0EA]/10 text-[#F2F0EA] text-xs font-semibold"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[11px] text-[#8E8E8E] block mb-2">WEB</span>
              <div className="flex flex-wrap gap-2">
                {['HTML', 'CSS'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-[#141414] border border-[#F2F0EA]/10 text-[#F2F0EA] text-xs font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* INTERESTS */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-4 text-[#8E8E8E] uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#E10600]" />
            <span>INTERESTS</span>
          </div>
          <div className="md:col-span-8">
            <div className="flex flex-wrap gap-2">
              {['Building Projects', 'Hackathons', 'Experimentation', 'Hands-on Learning', 'Software Systems'].map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 bg-[#141414] border border-[#F2F0EA]/10 text-[#F2F0EA] text-xs"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* OPEN TO */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-4 text-[#8E8E8E] uppercase tracking-wider flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#E10600]" />
            <span>OPEN TO</span>
          </div>
          <div className="md:col-span-8 space-y-2">
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 bg-[#171717] border border-[#E10600]/40 text-[#E10600] font-bold text-xs">
                ● Hackathons
              </span>
              <span className="px-3 py-1.5 bg-[#171717] border border-[#F2F0EA]/15 text-[#F2F0EA] font-semibold text-xs">
                Collaborations
              </span>
              <span className="px-3 py-1.5 bg-[#171717] border border-[#F2F0EA]/15 text-[#F2F0EA] font-semibold text-xs">
                Interesting Projects
              </span>
            </div>
            <p className="font-sans text-sm text-[#8E8E8E] pt-2">
              Always eager to connect with fellow students, developers, and builders working on compelling problems.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Contact CTA */}
      <div className="mt-20 pt-12 border-t border-[#F2F0EA]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h4 className="font-display font-black text-2xl text-[#F2F0EA] uppercase">
            WANT TO BUILD SOMETHING TOGETHER?
          </h4>
          <p className="font-sans text-sm text-[#8E8E8E]">
            Let's connect for an upcoming hackathon or project.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            onClick={playClick}
            className="px-6 py-3 bg-[#E10600] text-white font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#B00500] transition-colors"
          >
            GET IN TOUCH
          </Link>
          <a
            href="https://github.com/vatsalost"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 bg-[#141414] border border-[#F2F0EA]/10 text-[#F2F0EA] font-mono text-xs uppercase tracking-wider hover:border-[#E10600] transition-colors"
          >
            GITHUB ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
