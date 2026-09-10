import React from 'react';
import { ArrowUpRight, Github, Mail, Terminal, Layers, BookOpen, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAudio } from '../context/AudioContext';

export function AboutPage() {
  const { playClick, playHover } = useAudio();

  return (
    <div className="pt-32 pb-32 px-6 md:px-12 max-w-5xl mx-auto min-h-screen text-[#F2F0EA]">
      {/* 1. Personal Header */}
      <div className="border-b border-[#F2F0EA]/10 pb-16 mb-16">
        <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-4">
          // ABOUT ME
        </span>

        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.95] mb-8 text-[#F2F0EA]">
          BUILDING, EXPERIMENTING & LEARNING BY DOING<span className="text-[#E10600]">.</span>
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl font-sans font-light text-[#A3A39B] leading-relaxed max-w-3xl">
          I'm Vatsal, a Computer Science & Engineering student at Symbiosis Institute of Technology in Pune.
        </p>
      </div>

      {/* 2. Personal Student Introduction */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 text-base sm:text-lg font-sans font-light text-[#A3A39B] leading-relaxed">
        <div className="md:col-span-4 font-mono text-xs text-[#E10600] uppercase tracking-widest">
          // WHO I AM
        </div>
        <div className="md:col-span-8 space-y-6">
          <p>
            I like building projects and learning by actually making things. A lot of what I learn starts with wanting to build something and figuring out the rest along the way. Rather than studying concepts purely in the abstract, I learn best by writing code, breaking things, and seeing how they actually behave.
          </p>
          <p>
            I also enjoy hackathons because they force me to stop overthinking, work quickly, experiment with ideas, and build with other people under real time constraints. Having 24 to 48 hours to solve a problem with a team teaches you practical engineering decisions faster than almost anything else.
          </p>
          <p className="text-[#F2F0EA]">
            Currently working with <strong className="font-semibold text-white">C, C++, Java, HTML, and CSS</strong>. I'm always open to participating in hackathons, teaming up on interesting projects, and collaborating with other builders.
          </p>
        </div>
      </div>

      {/* 3. Small Personal Reflections / The Approach */}
      <div className="p-8 md:p-10 bg-[#111111] border border-[#F2F0EA]/10 rounded-xl mb-20 space-y-6">
        <span className="font-mono text-xs text-[#E10600] uppercase tracking-widest block">
          // HOW I WORK
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="space-y-2 border-l-2 border-[#E10600] pl-4">
            <p className="text-base sm:text-lg font-medium text-[#F2F0EA] leading-snug">
              "I usually start with a question and end up with a project."
            </p>
            <p className="text-xs text-[#8E8E8E] leading-relaxed">
              Curiosity drives what I build. If I don't understand how something works, I write a prototype to see it in action.
            </p>
          </div>
          <div className="space-y-2 border-l-2 border-[#F2F0EA]/20 pl-4">
            <p className="text-base sm:text-lg font-medium text-[#F2F0EA] leading-snug">
              "I learn best when I'm building something."
            </p>
            <p className="text-xs text-[#8E8E8E] leading-relaxed">
              Theory is good, but building real tools, catching compiler errors, and fixing bugs is where concepts truly stick.
            </p>
          </div>
          <div className="space-y-2 border-l-2 border-[#F2F0EA]/20 pl-4">
            <p className="text-base sm:text-lg font-medium text-[#F2F0EA] leading-snug">
              "Hackathons force me to stop overthinking and start building."
            </p>
            <p className="text-xs text-[#8E8E8E] leading-relaxed">
              Constraints cut out unnecessary perfectionism and push you to deliver a working demo on time.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Structured Details: Education, Skills, Open To */}
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
              Symbiosis Institute of Technology, Pune (2023 – 2027)
            </p>
            <p className="text-xs text-[#8E8E8E] pt-1">
              Focus: Data Structures, Algorithms, Systems Programming, Web Development
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
                    className="px-3 py-1 bg-[#141414] border border-[#F2F0EA]/10 text-[#F2F0EA] text-xs font-semibold rounded-sm"
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
                    className="px-3 py-1 bg-[#141414] border border-[#F2F0EA]/10 text-[#F2F0EA] text-xs font-semibold rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
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
              <span className="px-3 py-1.5 bg-[#171717] border border-[#E10600]/40 text-[#E10600] font-bold text-xs rounded-sm">
                ● Hackathons
              </span>
              <span className="px-3 py-1.5 bg-[#171717] border border-[#F2F0EA]/15 text-[#F2F0EA] font-semibold text-xs rounded-sm">
                Collaborations
              </span>
              <span className="px-3 py-1.5 bg-[#171717] border border-[#F2F0EA]/15 text-[#F2F0EA] font-semibold text-xs rounded-sm">
                Interesting Projects
              </span>
            </div>
            <p className="font-sans text-sm text-[#8E8E8E] pt-2">
              Always eager to connect with other students and developers looking for a teammate.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Contact CTA */}
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
            className="px-6 py-3 bg-[#E10600] text-white font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#B00500] transition-colors rounded-sm"
          >
            GET IN TOUCH
          </Link>
          <a
            href="https://github.com/vatsalost"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 bg-[#141414] border border-[#F2F0EA]/10 text-[#F2F0EA] font-mono text-xs uppercase tracking-wider hover:border-[#E10600] transition-colors rounded-sm"
          >
            GITHUB ↗
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
