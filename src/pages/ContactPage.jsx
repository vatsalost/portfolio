import React, { useState, useRef } from 'react';
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight, ArrowRight, Send, User, Sparkles } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { BorderGlow } from '../components/bits/BorderGlow';

export function ContactPage() {
  const { playClick, playHover } = useAudio();
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const nameInputRef = useRef(null);

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText('vatslchaudhary@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFocusForm = () => {
    playClick();
    if (nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Basic validation
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please enter a message before sending.');
      return;
    }

    playClick();

    // Legitimate email draft generation via mailto
    const subject = encodeURIComponent(`[Portfolio Inquiry] From ${formData.name.trim()}`);
    const body = encodeURIComponent(
      `Hi Vatsal,\n\n${formData.message.trim()}\n\n---\nSender: ${formData.name.trim()}\nEmail: ${formData.email.trim()}`
    );
    const mailtoUrl = `mailto:vatslchaudhary@gmail.com?subject=${subject}&body=${body}`;

    // Launch email client
    window.location.href = mailtoUrl;
    setFormSubmitted(true);
  };

  const contactMethods = [
    {
      label: 'EMAIL',
      value: 'vatslchaudhary@gmail.com',
      href: 'mailto:vatslchaudhary@gmail.com',
      actionText: 'WRITE EMAIL',
      isPrimary: true,
      allowCopy: true,
      icon: Mail
    },
    {
      label: 'GITHUB',
      value: 'github.com/vatsalost',
      href: 'https://github.com/vatsalost',
      actionText: 'VIEW PROFILE',
      isPrimary: false,
      allowCopy: false,
      icon: Github
    },
    {
      label: 'LINKEDIN',
      value: 'linkedin.com/in/vatsalost',
      href: 'https://linkedin.com',
      actionText: 'CONNECT',
      isPrimary: false,
      allowCopy: false,
      icon: Linkedin
    }
  ];

  return (
    <div className="pt-28 sm:pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen text-[#F2F0EA]">
      {/* 1. Header */}
      <header className="border-b border-[#F2F0EA]/10 pb-10 mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs text-[#E10600] tracking-widest uppercase">
            // INITIATE CONTACT
          </span>
          <span className="h-px w-12 bg-[#F2F0EA]/10" />
          <span className="font-mono text-[10px] text-[#8E8E8E] uppercase tracking-widest hidden sm:inline">
            [ DIRECT CHANNELS ]
          </span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.92] text-[#F2F0EA] mb-5">
          LET'S BUILD<br />
          SOMETHING<span className="text-[#E10600]">.</span>
        </h1>
        <p className="text-base sm:text-lg font-sans font-light text-[#A3A39B] max-w-2xl leading-relaxed">
          I'm open to hackathons, collaborations, and interesting projects. If you have an idea worth building, I'd love to hear about it.
        </p>
      </header>

      {/* 2. Direct Contact Channels (Email Primary) */}
      <section aria-label="Direct contact methods" className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
        {contactMethods.map((method) => {
          const Icon = method.icon;
          return (
            <div
              key={method.label}
              className={`p-6 bg-[#111111] border transition-colors flex flex-col justify-between rounded-lg space-y-5 ${
                method.isPrimary
                  ? 'border-[#E10600]/40 shadow-sm shadow-[#E10600]/10 hover:border-[#E10600]'
                  : 'border-[#F2F0EA]/10 hover:border-[#F2F0EA]/25'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#E10600]" />
                    {method.isPrimary && (
                      <span className="px-2 py-0.5 bg-[#E10600]/15 text-[#E10600] text-[10px] font-mono font-bold tracking-wider rounded-sm">
                        PRIMARY
                      </span>
                    )}
                  </div>
                  {method.allowCopy && (
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="text-xs font-mono text-[#8E8E8E] hover:text-[#F2F0EA] transition-colors flex items-center gap-1.5 px-2 py-1 bg-[#181818] border border-[#F2F0EA]/10 rounded-sm"
                      title="Copy Email Address to Clipboard"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#E10600]" />
                          <span className="text-[#E10600] font-bold">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <span className="font-mono text-[11px] text-[#8E8E8E] uppercase tracking-wider block mb-1">
                  {method.label}
                </span>
                <div className="font-mono text-sm text-[#F2F0EA] truncate font-medium">
                  {method.value}
                </div>
              </div>

              <div className="pt-3 border-t border-[#F2F0EA]/5 flex items-center justify-between">
                <a
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noreferrer' : undefined}
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#F2F0EA] hover:text-[#E10600] transition-colors group"
                >
                  <span>{method.actionText}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8E8E8E] group-hover:text-[#E10600] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Balanced 2-Column Composition: Form (~60%) & Availability Panel (~40%) */}
      <section aria-label="Direct message and collaboration panel" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Message Form (~60%) */}
        <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 bg-[#111111] border border-[#F2F0EA]/10 rounded-xl space-y-6">
          <div>
            <div className="flex items-center gap-2 text-[#E10600] font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />
              <span>// DIRECT INQUIRY</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#F2F0EA] uppercase tracking-tight">
              SEND A DIRECT MESSAGE
            </h2>
            <p className="font-sans text-xs text-[#8E8E8E] mt-1 leading-relaxed">
              Have a project idea, hackathon invite, or just want to connect? Draft a message below to open in your mail client.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 bg-[#161616] border border-[#E10600]/40 rounded-lg space-y-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#E10600] font-bold text-sm">
                <Check className="w-4 h-4" />
                <span>MESSAGE DRAFT CREATED</span>
              </div>
              <p className="font-sans text-sm text-[#D5D3CC] leading-relaxed">
                Your email client was opened with your message pre-formatted for{' '}
                <strong className="text-[#F2F0EA]">vatslchaudhary@gmail.com</strong>.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    setFormSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="px-4 py-2 bg-[#1C1C1C] text-[#F2F0EA] border border-[#F2F0EA]/10 hover:border-[#E10600] transition-colors rounded-sm"
                >
                  DRAFT ANOTHER MESSAGE
                </button>
                <a
                  href={`mailto:vatslchaudhary@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] From ${formData.name}`)}&body=${encodeURIComponent(formData.message)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E10600] text-white font-bold hover:bg-[#B00500] transition-colors rounded-sm"
                >
                  <span>RE-OPEN CLIENT</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4 font-mono text-xs">
              {errorMessage && (
                <div role="alert" className="p-3 bg-[#E10600]/10 border border-[#E10600]/30 text-[#E10600] text-xs rounded-sm">
                  {errorMessage}
                </div>
              )}

              <div>
                <label htmlFor="contact-name" className="block text-[#8E8E8E] uppercase tracking-wider mb-2">
                  YOUR NAME <span className="text-[#E10600]">*</span>
                </label>
                <input
                  ref={nameInputRef}
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name or handle..."
                  className="w-full bg-[#161616] border border-[#F2F0EA]/10 focus:border-[#E10600] px-4 py-3 text-[#F2F0EA] placeholder-[#555555] outline-none transition-colors rounded-sm"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-[#8E8E8E] uppercase tracking-wider mb-2">
                  EMAIL ADDRESS <span className="text-[#E10600]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full bg-[#161616] border border-[#F2F0EA]/10 focus:border-[#E10600] px-4 py-3 text-[#F2F0EA] placeholder-[#555555] outline-none transition-colors rounded-sm"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[#8E8E8E] uppercase tracking-wider mb-2">
                  MESSAGE <span className="text-[#E10600]">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, hackathon, or idea..."
                  className="w-full bg-[#161616] border border-[#F2F0EA]/10 focus:border-[#E10600] px-4 py-3 text-[#F2F0EA] placeholder-[#555555] outline-none transition-colors resize-none rounded-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  onClick={playClick}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#181818] border border-[#E10600]/60 text-[#F2F0EA] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#E10600] hover:text-white transition-all rounded-sm group cursor-pointer"
                >
                  <span>SEND VIA EMAIL CLIENT</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E10600] group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Availability & Hackathon Teammate Panel (~40%) */}
        <div className="lg:col-span-5 space-y-6">
          <BorderGlow
            borderRadius={16}
            glowRadius={36}
            backgroundColor="#111111"
            className="p-6 sm:p-8"
            onMouseEnter={playHover}
          >
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-[#E10600] font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>// HACKATHON INVITATIONS</span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#F2F0EA] uppercase tracking-tight leading-tight">
                LOOKING FOR A TEAMMATE<span className="text-[#E10600]">?</span>
              </h3>

              <p className="text-sm font-sans font-light text-[#D5D3CC] leading-relaxed">
                I'm open to joining hackathons, building prototypes, and collaborating with people who like making things under constraints.
              </p>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleFocusForm}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#181818] text-[#F2F0EA] border border-[#F2F0EA]/15 font-mono text-xs tracking-wider uppercase font-bold hover:border-[#E10600] hover:text-[#E10600] transition-colors rounded-sm group"
                >
                  <span>LET'S BUILD</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="h-px bg-[#F2F0EA]/10 my-6" />

              {/* Personal Authenticity Card */}
              <div className="space-y-3 font-mono text-xs">
                <span className="text-[11px] text-[#8E8E8E] uppercase tracking-widest block font-bold">
                  // CURRENT AVAILABILITY
                </span>
                <div>
                  <span className="font-display font-bold text-base text-[#F2F0EA] block">
                    VATSAL CHAUDHARY
                  </span>
                  <p className="text-[11px] text-[#8E8E8E] leading-relaxed">
                    B.Tech Computer Science & Engineering<br />
                    Symbiosis Institute of Technology, Pune
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[#E10600] font-bold text-[11px] pt-1">
                  <span className="w-2 h-2 rounded-full bg-[#E10600] animate-pulse" />
                  <span>OPEN TO HACKATHONS + COLLABORATIONS</span>
                </div>
              </div>

              {/* Scope Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[10px]">
                <span className="px-2.5 py-1 bg-[#161616] border border-[#F2F0EA]/10 text-[#A3A39B]">
                  HACKATHONS
                </span>
                <span className="px-2.5 py-1 bg-[#161616] border border-[#F2F0EA]/10 text-[#A3A39B]">
                  COLLABORATIONS
                </span>
                <span className="px-2.5 py-1 bg-[#161616] border border-[#F2F0EA]/10 text-[#A3A39B]">
                  INTERESTING PROJECTS
                </span>
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
