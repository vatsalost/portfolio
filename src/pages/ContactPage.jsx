import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle, Copy, Check, ArrowUpRight, ShieldAlert, Sparkles } from 'lucide-react';
import { MagneticButton } from '../components/ui/MagneticButton';
import { useAudio } from '../context/AudioContext';

export function ContactPage() {
  const { playClick, playHover, playSuccess } = useAudio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Digital Product / Web App',
    budget: '$15k — $30k',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success'
  const [copied, setCopied] = useState(false);
  const [transmissionId, setTransmissionId] = useState('');

  const projectTypes = [
    'Summer SDE Internship (2026/2027)',
    'Hackathon Team Collaboration',
    'Open-Source / Systems Project',
    'Creative WebGL / Full-Stack Dev',
    'Campus Dev Connect / Mentorship'
  ];

  const budgetTiers = [
    'Internship Role',
    'Hackathon Collab',
    '< $5k Grant/Stipend',
    'Funded Project'
  ];

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText('vatsal.cse.student@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playClick();
    setStatus('sending');

    // Simulate cybernetic transmission handshake
    setTimeout(() => {
      const generatedId = `TX-${Math.floor(100000 + Math.random() * 900000)}`;
      setTransmissionId(generatedId);
      setStatus('success');
      playSuccess();

      // Confetti celebration in crimson & white
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#E10600', '#F5F5F0', '#121212']
        });
      } catch (err) {}
    }, 1400);
  };

  return (
    <div className="pt-32 pb-32 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
      <div className="border-b border-[#F5F5F0]/10 pb-12 mb-16">
        <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-2">
          // SECURE CHANNEL // 2ND YEAR CSE
        </span>
        <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl text-[#F5F5F0] tracking-tight uppercase leading-[0.9]">
          INITIATE<br />
          <span className="text-stroke-bone hover:text-[#E10600]">TRANSMISSION.</span>
        </h1>
        <p className="mt-6 text-base font-light text-[#8E8E8E] max-w-xl font-sans">
          Actively interviewing for Summer 2026/2027 Software Engineering internships, high-stakes collegiate hackathon teams, and open-source systems research.
        </p>
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
                  // TRANSMISSION CONFIRMED
                </span>
                <h2 className="font-display font-bold text-3xl text-[#F5F5F0]">
                  PACKET DELIVERED TO VATSAL // CSE LABS
                </h2>
                <p className="font-mono text-xs text-[#8E8E8E] max-w-md mx-auto">
                  Transmission ID: <span className="text-[#F5F5F0] font-bold">{transmissionId}</span>. A encrypted confirmation receipt has been dispatched to <span className="text-[#E10600]">{formData.email}</span>. Expected reply window: &lt; 24 hours.
                </p>
              </div>

              {/* Hologram Receipt Box */}
              <div className="max-w-md mx-auto p-4 bg-[#0A0A0A] border border-[#F5F5F0]/10 font-mono text-[11px] text-left text-[#8E8E8E] space-y-1">
                <div className="flex justify-between border-b border-[#F5F5F0]/5 pb-1">
                  <span>SENDER:</span>
                  <span className="text-[#F5F5F0]">{formData.name}</span>
                </div>
                <div className="flex justify-between border-b border-[#F5F5F0]/5 py-1">
                  <span>DISCIPLINE:</span>
                  <span className="text-[#F5F5F0]">{formData.projectType}</span>
                </div>
                <div className="flex justify-between border-b border-[#F5F5F0]/5 py-1">
                  <span>BUDGET:</span>
                  <span className="text-[#F5F5F0]">{formData.budget}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>STATUS:</span>
                  <span className="text-[#E10600]">DISPATCHED_TO_QUEUE</span>
                </div>
              </div>

              <div className="pt-4">
                <MagneticButton
                  onClick={() => {
                    playClick();
                    setStatus('idle');
                    setFormData({ name: '', email: '', projectType: 'Digital Product / Web App', budget: '$15k — $30k', message: '' });
                  }}
                  variant="outline"
                  cursorText="NEW"
                >
                  SEND ANOTHER TRANSMISSION
                </MagneticButton>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Project Type selector */}
              <div>
                <label className="font-mono text-xs text-[#8E8E8E] tracking-widest block uppercase mb-3">
                  01 // SELECT DISCIPLINE
                </label>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => { playClick(); setFormData(prev => ({ ...prev, projectType: type })); }}
                      onMouseEnter={playHover}
                      className={`px-3 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                        formData.projectType === type
                          ? 'bg-[#E10600] text-white font-bold'
                          : 'bg-[#0A0A0A] border border-[#F5F5F0]/10 text-[#8E8E8E] hover:text-[#F5F5F0] hover:border-[#F5F5F0]/30'
                      }`}
                    >
                      {type}
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
                    placeholder="E.g. Elena Rostova"
                    className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-3 text-sm text-[#F5F5F0] placeholder-[#8E8E8E]/40 focus:outline-none focus:border-[#E10600] font-mono tracking-wider transition-colors"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs text-[#8E8E8E] tracking-widest block uppercase mb-2">
                    03 // WORK EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="elena@studio.com"
                    className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-3 text-sm text-[#F5F5F0] placeholder-[#8E8E8E]/40 focus:outline-none focus:border-[#E10600] font-mono tracking-wider transition-colors"
                  />
                </div>
              </div>

              {/* Budget tier */}
              <div>
                <label className="font-mono text-xs text-[#8E8E8E] tracking-widest block uppercase mb-3">
                  04 // ESTIMATED BUDGET (USD)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {budgetTiers.map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => { playClick(); setFormData(prev => ({ ...prev, budget: tier })); }}
                      onMouseEnter={playHover}
                      className={`p-2.5 font-mono text-xs text-center border transition-all ${
                        formData.budget === tier
                          ? 'border-[#E10600] bg-[#E10600]/10 text-[#E10600] font-bold'
                          : 'border-[#F5F5F0]/10 bg-[#0A0A0A] text-[#8E8E8E] hover:text-[#F5F5F0]'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="font-mono text-xs text-[#8E8E8E] tracking-widest block uppercase mb-2">
                  05 // PROJECT BRIEF & TIMELINE *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your objectives, timeline, deliverables, or desired aesthetic direction..."
                  className="w-full bg-[#0A0A0A] border border-[#F5F5F0]/15 p-4 text-sm text-[#F5F5F0] placeholder-[#8E8E8E]/40 focus:outline-none focus:border-[#E10600] font-sans font-light leading-relaxed transition-colors resize-none"
                />
              </div>

              {/* Submit button with cybernetic state */}
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
                      <span>ENCRYPTING & TRANSMITTING...</span>
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

        {/* Direct Channel Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Copy Email Box */}
          <div className="p-8 bg-[#121212] border border-[#F5F5F0]/10 space-y-4">
            <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase">
              // DIRECT FREQUENCY
            </span>
            <h3 className="font-display font-bold text-xl text-[#F5F5F0]">
              DIRECT CORRESPONDENCE
            </h3>
            <p className="font-mono text-xs text-[#8E8E8E]">
              Prefer standard email or encrypted PGP mail?
            </p>
            <div className="flex items-center justify-between p-3 bg-[#0A0A0A] border border-[#F5F5F0]/10 font-mono text-xs">
              <span className="text-[#F5F5F0]">vatsal.cse.student@gmail.com</span>
              <button
                onClick={handleCopyEmail}
                className="text-[#8E8E8E] hover:text-[#E10600] transition-colors p-1"
                title="Copy Email Address"
                data-cursor="copy"
              >
                {copied ? <Check className="w-4 h-4 text-[#E10600]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {copied && (
              <span className="font-mono text-[10px] text-[#E10600] block">
                ✓ COPIED TO SYSTEM CLIPBOARD
              </span>
            )}
          </div>

          {/* Location & Timezone info */}
          <div className="p-8 bg-[#121212] border border-[#F5F5F0]/10 space-y-4 font-mono text-xs">
            <span className="text-[#E10600] tracking-widest block uppercase">
              // STUDIO AVAILABILITY
            </span>
            <div className="space-y-2 text-[#8E8E8E]">
              <div className="flex justify-between">
                <span>OPERATING ZONES:</span>
                <span className="text-[#F5F5F0]">JST (UTC+9) & EST (UTC-5)</span>
              </div>
              <div className="flex justify-between">
                <span>RESPONSE TIME:</span>
                <span className="text-[#F5F5F0]">&lt; 24 HOURS</span>
              </div>
              <div className="flex justify-between">
                <span>RETAINER BASIS:</span>
                <span className="text-[#E10600]">AVAILABLE (Q2/Q3 2026)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
