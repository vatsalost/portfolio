import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle, Copy, Check, ArrowUpRight, Mail, Github, Linkedin, FileText, Sparkles } from 'lucide-react';
import { MagneticButton } from '../components/ui/MagneticButton';
import { useAudio } from '../context/AudioContext';
import { SpotlightCard } from '../components/bits/SpotlightCard';

export function ContactPage() {
  const { playClick, playHover, playSuccess } = useAudio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Hackathon Collaboration',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success'
  const [copied, setCopied] = useState(false);
  const [transmissionId, setTransmissionId] = useState('');

  const contactTopics = [
    'Hackathon Collaboration',
    'Project Collaboration',
    'Open Source & Coding',
    'Tech Discussion / General'
  ];

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText('vatslchaudhary@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playClick();
    setStatus('sending');

    setTimeout(() => {
      const generatedId = `MSG-${Math.floor(100000 + Math.random() * 900000)}`;
      setTransmissionId(generatedId);
      setStatus('success');
      playSuccess();

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#E10600', '#F5F5F0', '#121212']
        });
      } catch (err) {}
    }, 1200);
  };

  return (
    <div className="pt-32 pb-32 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="border-b border-[#F5F5F0]/10 pb-12 mb-16">
        <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-2">
          // INITIATE CONTACT
        </span>
        <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl text-[#F5F5F0] tracking-tight uppercase leading-[0.9]">
          LET'S BUILD<br />
          <span className="text-stroke-bone hover:text-[#E10600]">SOMETHING.</span>
        </h1>
        <p className="mt-6 text-base md:text-lg font-light text-[#8E8E8E] max-w-xl font-sans">
          I'm open to hackathons, collaborations, and interesting projects.
        </p>
      </div>

      {/* Direct Contact Cards (Surfaced Upfront) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {/* Email Card */}
        <SpotlightCard
          spotlightColor="rgba(225, 6, 0, 0.2)"
          className="p-6 bg-[#121212] border border-[#F5F5F0]/10 hover:border-[#E10600]/40 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <Mail className="w-5 h-5 text-[#E10600]" />
            <button
              onClick={handleCopyEmail}
              className="text-[#8E8E8E] hover:text-[#E10600] transition-colors p-1"
              title="Copy Email Address"
              data-cursor="copy"
            >
              {copied ? <Check className="w-4 h-4 text-[#E10600]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <span className="font-mono text-[10px] text-[#8E8E8E] uppercase tracking-widest block mb-1">
            DIRECT EMAIL
          </span>
          <a
            href="mailto:vatslchaudhary@gmail.com"
            className="font-mono text-xs text-[#F5F5F0] hover:text-[#E10600] transition-colors block truncate"
          >
            vatslchaudhary@gmail.com
          </a>
          <span className="font-mono text-[10px] text-[#8E8E8E] mt-2 block">
            {copied ? '✓ Copied to clipboard' : 'Click to send or copy'}
          </span>
        </SpotlightCard>

        {/* GitHub Card */}
        <SpotlightCard
          spotlightColor="rgba(225, 6, 0, 0.2)"
          className="p-6 bg-[#121212] border border-[#F5F5F0]/10 hover:border-[#E10600]/40 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <Github className="w-5 h-5 text-[#E10600]" />
            <ArrowUpRight className="w-4 h-4 text-[#8E8E8E]" />
          </div>
          <span className="font-mono text-[10px] text-[#8E8E8E] uppercase tracking-widest block mb-1">
            SOURCE CODE
          </span>
          <a
            href="https://github.com/vatsalost"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-[#F5F5F0] hover:text-[#E10600] transition-colors block truncate"
          >
            github.com/vatsalost
          </a>
          <span className="font-mono text-[10px] text-[#8E8E8E] mt-2 block">
            Repos, experiments, commits
          </span>
        </SpotlightCard>

        {/* LinkedIn Card */}
        <SpotlightCard
          spotlightColor="rgba(225, 6, 0, 0.2)"
          className="p-6 bg-[#121212] border border-[#F5F5F0]/10 hover:border-[#E10600]/40 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <Linkedin className="w-5 h-5 text-[#E10600]" />
            <ArrowUpRight className="w-4 h-4 text-[#8E8E8E]" />
          </div>
          <span className="font-mono text-[10px] text-[#8E8E8E] uppercase tracking-widest block mb-1">
            PROFESSIONAL
          </span>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-[#F5F5F0] hover:text-[#E10600] transition-colors block truncate"
          >
            LinkedIn Profile
          </a>
          <span className="font-mono text-[10px] text-[#8E8E8E] mt-2 block">
            Academic & career updates
          </span>
        </SpotlightCard>

        {/* Resume Card */}
        <SpotlightCard
          spotlightColor="rgba(225, 6, 0, 0.2)"
          className="p-6 bg-[#121212] border border-[#F5F5F0]/10 hover:border-[#E10600]/40 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-5 h-5 text-[#E10600]" />
            <ArrowUpRight className="w-4 h-4 text-[#8E8E8E]" />
          </div>
          <span className="font-mono text-[10px] text-[#8E8E8E] uppercase tracking-widest block mb-1">
            CURRICULUM VITAE
          </span>
          <a
            href="#resume"
            onClick={(e) => {
              e.preventDefault();
              window.open('mailto:vatslchaudhary@gmail.com?subject=Requesting%20Vatsal%20Resume', '_blank');
            }}
            className="font-mono text-xs text-[#F5F5F0] hover:text-[#E10600] transition-colors block truncate"
          >
            Request Résumé (PDF)
          </a>
          <span className="font-mono text-[10px] text-[#8E8E8E] mt-2 block">
            Available on inquiry
          </span>
        </SpotlightCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Contact Form or Success State */}
        <div className="lg:col-span-8 bg-[#121212] border border-[#F5F5F0]/10 p-8 md:p-12 relative overflow-hidden">
          {status === 'success' ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#E10600]/10 border border-[#E10600] flex items-center justify-center mx-auto text-[#E10600] animate-pulse">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
                  // MESSAGE SENT
                </span>
                <h2 className="font-display font-bold text-3xl text-[#F5F5F0]">
                  PACKET RECORDED
                </h2>
                <p className="font-mono text-xs text-[#8E8E8E] max-w-md mx-auto">
                  Reference ID: <span className="text-[#F5F5F0] font-bold">{transmissionId}</span>. Thanks for reaching out, <span className="text-[#F5F5F0]">{formData.name}</span>. I'll get back to your email (<span className="text-[#E10600]">{formData.email}</span>) soon.
                </p>
              </div>

              {/* Hologram Receipt Box */}
              <div className="max-w-md mx-auto p-4 bg-[#0A0A0A] border border-[#F5F5F0]/10 font-mono text-[11px] text-left text-[#8E8E8E] space-y-1.5">
                <div className="flex justify-between border-b border-[#F5F5F0]/5 pb-1">
                  <span>SENDER:</span>
                  <span className="text-[#F5F5F0]">{formData.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#F5F5F0]/5 py-1">
                  <span>TOPIC:</span>
                  <span className="text-[#F5F5F0]">{formData.topic}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>STATUS:</span>
                  <span className="text-[#E10600]">QUEUED_FOR_REVIEW</span>
                </div>
              </div>

              <div className="pt-4">
                <MagneticButton
                  onClick={() => {
                    playClick();
                    setStatus('idle');
                    setFormData({ name: '', email: '', topic: 'Summer 2026/2027 Internship', message: '' });
                  }}
                  variant="outline"
                  cursorText="NEW"
                >
                  SEND ANOTHER MESSAGE
                </MagneticButton>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Topic Selector */}
              <div>
                <label className="font-mono text-xs text-[#8E8E8E] tracking-widest block uppercase mb-3">
                  01 // PURPOSE OF CONTACT
                </label>
                <div className="flex flex-wrap gap-2">
                  {contactTopics.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => { playClick(); setFormData(prev => ({ ...prev, topic })); }}
                      onMouseEnter={playHover}
                      className={`px-3 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                        formData.topic === topic
                          ? 'bg-[#E10600] text-white font-bold'
                          : 'bg-[#0A0A0A] border border-[#F5F5F0]/10 text-[#8E8E8E] hover:text-[#F5F5F0] hover:border-[#F5F5F0]/30'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-xs text-[#8E8E8E] tracking-widest block uppercase mb-2">
                    02 // YOUR NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Name or handle"
                    className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-3 text-sm text-[#F5F5F0] placeholder-[#8E8E8E]/40 focus:outline-none focus:border-[#E10600] font-mono tracking-wider transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-[#8E8E8E] tracking-widest block uppercase mb-2">
                    03 // YOUR EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-3 text-sm text-[#F5F5F0] placeholder-[#8E8E8E]/40 focus:outline-none focus:border-[#E10600] font-mono tracking-wider transition-colors"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="font-mono text-xs text-[#8E8E8E] tracking-widest block uppercase mb-2">
                  04 // MESSAGE *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your team, the role, the problem you're solving, or what you'd like to collaborate on..."
                  className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-4 text-sm text-[#F5F5F0] placeholder-[#8E8E8E]/40 focus:outline-none focus:border-[#E10600] font-sans font-light leading-relaxed transition-colors resize-none"
                />
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  onMouseEnter={playHover}
                  className="w-full sm:w-auto px-8 py-4 bg-[#E10600] text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#B00500] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-[#E10600]/25"
                  data-cursor="send"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      <span>SENDING MESSAGE...</span>
                    </>
                  ) : (
                    <>
                      <span>TRANSMIT MESSAGE</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6 font-mono text-xs">
          {/* Availability Info */}
          <div className="p-6 bg-[#121212] border border-[#F5F5F0]/10 space-y-4">
            <span className="text-[#E10600] tracking-widest block uppercase font-bold">
              // STUDENT AVAILABILITY
            </span>
            <div className="space-y-3 text-[#8E8E8E]">
              <div className="flex justify-between border-b border-[#F5F5F0]/5 pb-2">
                <span>EDUCATION:</span>
                <span className="text-[#F5F5F0]">B.Tech CSE</span>
              </div>
              <div className="flex justify-between border-b border-[#F5F5F0]/5 pb-2">
                <span>COLLEGE:</span>
                <span className="text-[#F5F5F0]">SIT Pune</span>
              </div>
              <div className="flex justify-between border-b border-[#F5F5F0]/5 pb-2">
                <span>AVAILABILITY:</span>
                <span className="text-[#E10600]">Hackathons & Collabs</span>
              </div>
              <div className="flex justify-between border-b border-[#F5F5F0]/5 pb-2">
                <span>TIMEZONE:</span>
                <span className="text-[#F5F5F0]">IST (UTC+05:30)</span>
              </div>
              <div className="flex justify-between">
                <span>RESPONSE:</span>
                <span className="text-[#F5F5F0]">Within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Academic Term Note */}
          <div className="p-6 bg-[#121212] border-l-2 border-[#E10600] border-y border-r border-[#F5F5F0]/10 space-y-2">
            <span className="text-[#F5F5F0] font-bold block">
              COLLABORATION NOTE
            </span>
            <p className="text-[#8E8E8E] font-sans font-light text-xs leading-relaxed">
              Always eager to join hackathons, brainstorm project ideas, and team up with people who like building things.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
