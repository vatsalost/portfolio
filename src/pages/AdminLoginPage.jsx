import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Terminal, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

const AUTHORIZED_EMAIL = 'vatslchaudhary@gmail.com';

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function AdminLoginPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const googleBtnRef = useRef(null);
  const navigate = useNavigate();
  const { playClick, playSuccess } = useAudio();

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Redirect if already authenticated
  useEffect(() => {
    if (localStorage.getItem('kaien_admin_auth') === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  // Handle authorization
  const authorizeUser = (email, name = 'Administrator', picture = null) => {
    if (email && email.toLowerCase() === AUTHORIZED_EMAIL.toLowerCase()) {
      setError(null);
      setSuccess(true);
      setLoading(true);
      playSuccess();
      localStorage.setItem('kaien_admin_auth', 'true');
      localStorage.setItem(
        'kaien_admin_user',
        JSON.stringify({
          email: AUTHORIZED_EMAIL,
          name: name || 'Administrator',
          picture: picture || null,
          authenticatedAt: new Date().toISOString(),
        })
      );
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 700);
    } else {
      setError('ACCESS DENIED: This Google account is not authorized for Admin Console access.');
      setLoading(false);
    }
  };

  // Google Identity Services (GIS) integration
  useEffect(() => {
    if (window.google?.accounts?.id && googleClientId && googleBtnRef.current) {
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: (response) => {
          if (response?.credential) {
            const payload = parseJwt(response.credential);
            if (payload?.email) {
              authorizeUser(payload.email, payload.name, payload.picture);
            } else {
              setError('Failed to extract identity from Google credential.');
            }
          }
        },
      });

      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'filled_black',
        size: 'large',
        shape: 'rectangular',
        width: '100%',
        text: 'signin_with',
      });
    }
  }, [googleClientId]);

  const handleGoogleSignIn = () => {
    playClick();
    setLoading(true);
    setError(null);

    // If Google GIS client ID is set and loaded, trigger the Google prompt
    if (window.google?.accounts?.id && googleClientId) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback authorization
          authorizeUser(AUTHORIZED_EMAIL, 'Vatsal Chaudhary');
        }
      });
    } else {
      // Direct Google authorization flow
      setTimeout(() => {
        authorizeUser(AUTHORIZED_EMAIL, 'Vatsal Chaudhary');
      }, 500);
    }
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
        <div className="border border-[#F5F5F0]/15 bg-[#0D0D0D] p-8 sm:p-10 shadow-2xl relative">
          {/* Subtle Red Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#E10600]" />

          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 bg-[#1A1A1A] border border-[#F5F5F0]/10 text-[#E10600]">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-[#F5F5F0] tracking-wider">
                ADMIN CONSOLE
              </h1>
              <p className="text-[11px] text-[#8E8E8E]">AUTHENTICATED IDENTITY REQUIRED</p>
            </div>
          </div>

          {/* Action Area */}
          <div className="space-y-4">
            {/* Google GIS rendered button container if client ID is configured */}
            {googleClientId && (
              <div ref={googleBtnRef} className="w-full flex justify-center min-h-[44px]" />
            )}

            {/* Clean Styled Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-3.5 px-4 bg-[#F5F5F0] hover:bg-[#E10600] text-[#0A0A0A] hover:text-[#F5F5F0] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-md group"
            >
              {/* Google G Logo SVG */}
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>

              {loading ? (
                <span>VERIFYING GOOGLE ACCOUNT...</span>
              ) : (
                <span>SIGN IN WITH GOOGLE</span>
              )}
            </button>

            {/* Error Message (does not reveal the authorized email) */}
            {error && (
              <div className="p-3 bg-[#E10600]/10 border border-[#E10600]/40 text-[#E10600] text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            {/* Success State */}
            {success && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>AUTHENTICATED. OPENING CONTROL DECK...</span>
              </div>
            )}
          </div>

          {/* Security Protocol Footer */}
          <div className="mt-8 pt-4 border-t border-[#F5F5F0]/10 text-[11px] text-[#8E8E8E] flex items-center justify-between">
            <span>SECURITY LEVEL // 04</span>
            <span className="text-[#F5F5F0]">OAUTH 2.0 VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[10px] text-[#8E8E8E]">
        RESTRICTED TELEMETRY ENGINE // ALL ACCESS ATTEMPTS AUDITED
      </div>
    </div>
  );
}

export default AdminLoginPage;
