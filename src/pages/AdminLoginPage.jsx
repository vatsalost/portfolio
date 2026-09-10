import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Key, ArrowRight, ArrowLeft, Terminal, AlertCircle } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export function AdminLoginPage() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { playClick, playSuccess } = useAudio();

  // Redirect if already authenticated
  useEffect(() => {
    if (localStorage.getItem('kaien_admin_auth') === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    playClick();
    setLoading(true);
    setError(false);

    // Mock biometric / cryptographic verification
    setTimeout(() => {
      if (passcode.trim() === 'vatsal9144ccc') {
        localStorage.setItem('kaien_admin_auth', 'true');
        playSuccess();
        navigate('/admin/dashboard');
      } else {
        setError(true);
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F0] flex flex-col justify-between p-6 md:p-12 font-mono selection:bg-[#E10600]">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs text-[#8E8E8E] border-b border-[#F5F5F0]/10 pb-4">
        <Link to="/" className="flex items-center gap-2 hover:text-[#E10600] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO PUBLIC EXPERIENCE</span>
        </Link>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E10600] animate-ping" />
          RESTRICTED OPERATIONAL CONSOLE
        </span>
      </div>

      {/* Center Console Box */}
      <div className="max-w-md w-full mx-auto my-auto py-12">
        <div className="border border-[#F5F5F0]/15 bg-[#0D0D0D] p-8 shadow-2xl relative">
          {/* Subtle Red Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#E10600]" />

          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#1A1A1A] border border-[#F5F5F0]/10 text-[#E10600]">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-[#F5F5F0] tracking-wider">
                ADMIN CONSOLE ACCESS
              </h1>
              <p className="text-[11px] text-[#8E8E8E]">SECURITY CLEARANCE LEVEL // 04</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">
                ENTER AUTHORIZATION KEY
              </label>
              <div className="relative">
                <input
                  type="password"
                  autoFocus
                  required
                  value={passcode}
                  onChange={(e) => { setPasscode(e.target.value); setError(false); }}
                  placeholder="Enter authorization key"
                  className="w-full bg-[#050505] border border-[#F5F5F0]/20 px-4 py-3 text-sm text-[#F5F5F0] placeholder-[#8E8E8E]/40 focus:outline-none focus:border-[#E10600] tracking-widest"
                />
                <Key className="w-4 h-4 text-[#8E8E8E] absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-[#E10600]/10 border border-[#E10600]/40 text-[#E10600] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>ACCESS DENIED: INVALID AUTHORIZATION KEY</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#F5F5F0] text-[#0A0A0A] font-bold text-xs uppercase tracking-widest hover:bg-[#E10600] hover:text-[#F5F5F0] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>AUTHENTICATING CIPHER...</span>
              ) : (
                <>
                  <span>UNLOCK SYSTEM</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Note */}
          <div className="mt-6 pt-4 border-t border-[#F5F5F0]/10 text-[11px] text-[#8E8E8E] flex justify-between">
            <span>DEFAULT PASSCODE:</span>
            <span className="text-[#E10600] font-bold">admin2026</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[10px] text-[#8E8E8E]">
        RESTRICTED TELEMETRY ENGINE // ALL ATTEMPTS LOGGED
      </div>
    </div>
  );
}
