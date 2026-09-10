import React, { useState } from 'react';
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight, Send } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export function ContactPage() {
  const { playClick, playHover } = useAudio();
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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
    setFormSubmitted(true);
  };

  const contactMethods = [
    {
      label: 'EMAIL',
      value: 'vatslchaudhary@gmail.com',
      href: 'mailto:vatslchaudhary@gmail.com',
      actionText: 'WRITE EMAIL',
      allowCopy: true,
      icon: Mail
    },
    {
      label: 'GITHUB',
      value: 'github.com/vatsalost',
      href: 'https://github.com/vatsalost',
      actionText: 'VIEW PROFILE',
      allowCopy: false,
      icon: Github
    },
    {
      label: 'LINKEDIN',
      value: 'linkedin.com/in/vatsalost',
      href: 'https://linkedin.com',
      actionText: 'CONNECT',
      allowCopy: false,
      icon: Linkedin
    }
  ];

  return (
    <div className="pt-32 pb-32 px-6 md:px-12 max-w-5xl mx-auto min-h-screen text-[#F2F0EA]">
      {/* 1. Header */}
      <div className="border-b border-[#F2F0EA]/10 pb-12 mb-16">
        <span className="font-mono text-xs text-[#E10600] tracking-widest block uppercase mb-4">
          // INITIATE CONTACT
        </span>
        <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase leading-[0.9] text-[#F2F0EA] mb-6">
          LET'S BUILD<br />
          SOMETHING<span className="text-[#E10600]">.</span>
        </h1>
        <p className="text-lg sm:text-xl font-sans font-light text-[#A3A39B] max-w-2xl leading-relaxed">
          I'm open to hackathons, collaborations, and interesting projects.
        </p>
      </div>

      {/* 2. Direct Contact Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {contactMethods.map((method) => {
          const Icon = method.icon;
          return (
            <div
              key={method.label}
              className="p-6 bg-[#111111] border border-[#F2F0EA]/10 hover:border-[#E10600]/40 transition-colors flex flex-col justify-between rounded-lg space-y-6"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-5 h-5 text-[#E10600]" />
                  {method.allowCopy && (
                    <button
                      onClick={handleCopyEmail}
                      className="text-xs font-mono text-[#8E8E8E] hover:text-[#E10600] transition-colors flex items-center gap-1"
                      title="Copy Email Address"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#E10600]" />
                          <span className="text-[#E10600]">COPIED</span>
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
                <span className="font-mono text-xs text-[#8E8E8E] uppercase tracking-wider block mb-1">
                  {method.label}
                </span>
                <div className="font-mono text-xs text-[#F2F0EA] truncate font-medium">
                  {method.value}
                </div>
              </div>

              <a
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noreferrer' : undefined}
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center justify-between font-mono text-xs font-bold text-[#E10600] hover:text-[#F2F0EA] transition-colors pt-2 border-t border-[#F2F0EA]/5"
              >
                <span>{method.actionText}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          );
        })}
      </div>

      {/* 3. Simple Direct Message Form */}
      <div className="p-8 md:p-12 bg-[#111111] border border-[#F2F0EA]/10 rounded-xl max-w-2xl">
        <h3 className="font-display font-black text-2xl text-[#F2F0EA] uppercase mb-2">
          SEND A DIRECT MESSAGE
        </h3>
        <p className="font-sans text-xs text-[#8E8E8E] mb-6">
          Whether you need a teammate for an upcoming hackathon or want to discuss a project.
        </p>

        {formSubmitted ? (
          <div className="p-6 bg-[#141414] border border-[#E10600]/40 text-center space-y-2 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-[#E10600] font-mono text-sm font-bold">
              <Check className="w-4 h-4" />
              <span>MESSAGE PREPARED</span>
            </div>
            <p className="font-sans text-xs text-[#8E8E8E]">
              Thank you for reaching out! You can also email me directly at{' '}
              <a href="mailto:vatslchaudhary@gmail.com" className="text-[#F2F0EA] underline">
                vatslchaudhary@gmail.com
              </a>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            <div>
              <label className="block text-[#8E8E8E] uppercase tracking-wider mb-2">
                YOUR NAME
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name..."
                className="w-full bg-[#141414] border border-[#F2F0EA]/10 focus:border-[#E10600] px-4 py-3 text-[#F2F0EA] placeholder-[#555555] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#8E8E8E] uppercase tracking-wider mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="w-full bg-[#141414] border border-[#F2F0EA]/10 focus:border-[#E10600] px-4 py-3 text-[#F2F0EA] placeholder-[#555555] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#8E8E8E] uppercase tracking-wider mb-2">
                MESSAGE
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about the project, hackathon, or idea..."
                className="w-full bg-[#141414] border border-[#F2F0EA]/10 focus:border-[#E10600] px-4 py-3 text-[#F2F0EA] placeholder-[#555555] outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              onClick={playClick}
              className="w-full py-3.5 bg-[#E10600] text-white font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#B00500] transition-colors flex items-center justify-center gap-2 mt-2"
            >
              <span>SEND MESSAGE</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContactPage;
