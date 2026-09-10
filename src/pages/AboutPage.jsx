import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { VariableProximity } from '../components/bits/VariableProximity';
import { ScrollReveal } from '../components/bits/ScrollReveal';
import { AnimatedList } from '../components/bits/AnimatedList';
import { SpotlightCard } from '../components/bits/SpotlightCard';

const RIGHT_NOW_ITEMS = [
  {
    number: '01',
    label: 'BUILDING',
    description: 'Small web projects and experiments.',
  },
  {
    number: '02',
    label: 'LEARNING',
    description: 'Data structures, systems, and whatever I happen to get curious about.',
  },
  {
    number: '03',
    label: 'HACKATHONS',
    description: 'Building quickly, trying ideas, and working with other people.',
  },
  {
    number: '04',
    label: 'BREAKING THINGS',
    description: 'Trying things just to see what happens.',
  },
];

const WORK_STEPS = [
  {
    number: '01',
    title: 'START WITH A QUESTION',
    description: 'I usually start by wondering if I can build something.',
  },
  {
    number: '02',
    title: 'BUILD IT',
    description: 'Then I figure things out as I go, usually by breaking something at least once.',
  },
  {
    number: '03',
    title: 'SEE WHAT HAPPENS',
    description: 'The interesting part is finding out whether the idea actually works.',
  },
];

const UP_FOR_ITEMS = [
  'Hackathons',
  'Building something with a team',
  'Random project ideas',
  'Helping another builder figure something out',
];

export function AboutPage() {
  const { playClick, playHover } = useAudio();

  return (
    <div className="pt-28 sm:pt-36 pb-28 px-6 md:px-12 max-w-4xl mx-auto min-h-screen text-[#F2F0EA]">
      {/* 1. HERO */}
      <header className="mb-20 sm:mb-24">
        <ScrollReveal duration={0.6}>
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.95] mb-6 text-[#F2F0EA]">
            <VariableProximity
              label="HEY, I'M VATSAL"
              radius={130}
              maxLift={5}
              maxScale={1.05}
              dotColor="#E10600"
              disableOnMobile={true}
            />
          </h1>
        </ScrollReveal>

        <p className="text-xl sm:text-2xl md:text-3xl font-sans font-light text-[#F2F0EA] leading-snug max-w-2xl">
          I’m a Computer Science & Engineering student at{' '}
          <span className="text-[#A3A39B]">Symbiosis Institute of Technology, Pune.</span>
        </p>

        <p className="text-base sm:text-lg font-sans font-light text-[#8E8E8E] leading-relaxed max-w-2xl mt-4">
          I like building things mostly because I want to understand how they work. Sometimes that means a proper project, sometimes it means a small experiment that probably didn't need to exist in the first place.
        </p>
      </header>

      {/* 2. ABOUT / PERSONAL STORY */}
      <section className="mb-20 sm:mb-24 pt-12 border-t border-[#F2F0EA]/10">
        <ScrollReveal duration={0.6}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
            <div className="md:col-span-3">
              <span className="font-mono text-xs text-[#E10600] block mb-1">01</span>
              <span className="font-mono text-xs text-[#8E8E8E] uppercase tracking-wider block">
                ABOUT
              </span>
              <h2 className="font-display font-bold text-xl text-[#F2F0EA] uppercase mt-2">
                A LITTLE ABOUT ME
              </h2>
            </div>

            <div className="md:col-span-9 space-y-5 text-base sm:text-lg font-sans font-light text-[#A3A39B] leading-relaxed">
              <p>
                I like building projects and learning by actually making things. A lot of what I learn starts with wanting to build something and figuring out the rest along the way.
              </p>
              <p>
                I learn better when I can write the code, break something, fix it, and see what actually happens. That process is usually more interesting to me than just reading about a concept.
              </p>
              <p>
                I also enjoy hackathons for the same reason. They force me to stop overthinking, work quickly, experiment with ideas, and build with other people under a deadline.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. RIGHT NOW */}
      <section className="mb-20 sm:mb-24 pt-12 border-t border-[#F2F0EA]/10">
        <ScrollReveal duration={0.6}>
          <div className="mb-6">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F2F0EA] uppercase">
              RIGHT NOW
            </h2>
            <p className="text-sm font-sans font-light text-[#8E8E8E] mt-1">
              A few things I'm spending time on.
            </p>
          </div>

          <AnimatedList
            items={RIGHT_NOW_ITEMS}
            variant="rows"
            staggerMs={80}
            durationMs={400}
            renderItem={(item) => (
              <div className="p-4 sm:p-5 border border-[#F2F0EA]/10 bg-[#0E0E0E] hover:bg-[#141414] hover:border-[#F2F0EA]/20 transition-colors duration-200 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 rounded-md">
                <div className="font-mono text-xs text-[#F2F0EA] font-medium tracking-wide">
                  {item.number} <span className="text-[#555555]">—</span> {item.label}
                </div>
                <div className="text-sm font-sans font-light text-[#8E8E8E] sm:text-right">
                  {item.description}
                </div>
              </div>
            )}
          />
        </ScrollReveal>
      </section>

      {/* 4. HOW I USUALLY WORK */}
      <section className="mb-20 sm:mb-24 pt-12 border-t border-[#F2F0EA]/10">
        <div className="mb-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F2F0EA] uppercase">
            HOW I USUALLY WORK
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WORK_STEPS.map((step) => (
            <div key={step.number} className="space-y-2.5">
              <span className="font-mono text-xs text-[#E10600] font-bold block">
                {step.number}
              </span>
              <h3 className="font-display font-bold text-base text-[#F2F0EA] uppercase tracking-wide">
                {step.title}
              </h3>
              <p className="text-sm font-sans font-light text-[#8E8E8E] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. THINGS I USE (STACK) */}
      <section className="mb-20 sm:mb-24 pt-12 border-t border-[#F2F0EA]/10">
        <div className="mb-6">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F2F0EA] uppercase">
            THINGS I USE
          </h2>
        </div>

        <SpotlightCard
          spotlightColor="rgba(242, 240, 234, 0.04)"
          borderColor="rgba(242, 240, 234, 0.18)"
          borderRadius="8px"
          disableOnMobile={true}
          className="p-6 sm:p-8 bg-[#0F0F0F]"
        >
          <div className="space-y-6">
            <div>
              <span className="font-mono text-xs text-[#8E8E8E] uppercase tracking-wider block mb-3">
                LANGUAGES
              </span>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {['C', 'C++', 'Java'].map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 bg-[#161616] border border-[#F2F0EA]/10 text-[#F2F0EA] rounded-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#F2F0EA]/10">
              <span className="font-mono text-xs text-[#8E8E8E] uppercase tracking-wider block mb-3">
                WEB
              </span>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {['HTML', 'CSS'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-[#161616] border border-[#F2F0EA]/10 text-[#F2F0EA] rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SpotlightCard>
      </section>

      {/* 6. I'M USUALLY UP FOR */}
      <section className="mb-16 pt-12 border-t border-[#F2F0EA]/10">
        <div className="space-y-4">
          <h2 className="font-display font-bold text-2xl text-[#F2F0EA] uppercase">
            I'M USUALLY UP FOR
          </h2>
          <ul className="space-y-2.5 text-base font-sans font-light text-[#A3A39B]">
            {UP_FOR_ITEMS.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span
                  className={`w-1.5 h-1.5 rounded-full inline-block shrink-0 ${
                    idx === 0 ? 'bg-[#E10600]' : 'bg-[#555555]'
                  }`}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm font-sans font-light text-[#8E8E8E] pt-2">
            If you have an idea that sounds fun, feel free to reach out.
          </p>
        </div>
      </section>

      {/* 7. ONE THING ABOUT ME (PERSONAL DETAIL) */}
      <ScrollReveal duration={0.6}>
        <div className="p-6 sm:p-8 border-l-2 border-[#E10600] bg-[#111111]/80 my-16 rounded-r-md">
          <span className="font-mono text-xs text-[#8E8E8E] uppercase tracking-wider block mb-2">
            ONE THING ABOUT ME
          </span>
          <p className="font-sans text-base sm:text-lg md:text-xl text-[#F2F0EA] leading-relaxed italic font-light">
            “I'd rather spend a few hours trying to build something and figuring it out than spend those same hours wondering whether I could build it.”
          </p>
        </div>
      </ScrollReveal>

      {/* 8. CONTACT CTA */}
      <section className="pt-12 border-t border-[#F2F0EA]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <h3 className="font-display font-black text-2xl text-[#F2F0EA] uppercase">
            HAVE AN IDEA?
          </h3>
          <p className="font-sans text-sm text-[#8E8E8E] mt-1">
            Send me a message. Maybe we can build it.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            onClick={playClick}
            className="px-5 py-2.5 bg-[#E10600] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#B00500] transition-colors rounded-sm"
          >
            GET IN TOUCH
          </Link>
          <a
            href="https://github.com/vatsalost"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-[#141414] border border-[#F2F0EA]/10 text-[#F2F0EA] font-mono text-xs uppercase tracking-wider hover:border-[#E10600] transition-colors rounded-sm inline-flex items-center gap-1.5"
          >
            <span>GITHUB</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
