import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { BorderGlow } from '../components/bits/BorderGlow';

export function ProjectDetailPage() {
  const { id } = useParams();
  const { playClick } = useAudio();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="w-full relative pt-32 pb-36 text-[#F2F0EA] min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl w-full mx-auto">
        <BorderGlow
          borderRadius={20}
          glowRadius={40}
          backgroundColor="#0F0F0F"
          className="p-8 sm:p-12 text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#161616] border border-[#E10600]/40 rounded-full font-mono text-xs text-[#E10600] tracking-widest uppercase font-bold shadow-lg shadow-[#E10600]/10">
            <span className="w-2 h-2 rounded-full bg-[#E10600] animate-ping" />
            <span>CASE STUDY IN PROGRESS</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl text-[#F2F0EA] tracking-tight uppercase leading-none">
            IN PROGRESS<span className="text-[#E10600]">.</span>
          </h1>

          <p className="font-mono text-sm text-[#8E8E8E] max-w-md mx-auto leading-relaxed">
            Project documentation, benchmarks, and interactive demo are currently being updated. Check back soon for the full technical breakdown.
          </p>

          <div className="pt-2 max-w-xs mx-auto">
            <div className="h-1.5 w-full bg-[#181818] rounded-full overflow-hidden border border-[#F2F0EA]/10">
              <div className="h-full bg-gradient-to-r from-[#E10600] via-[#FF3333] to-[#E10600] w-3/5 animate-pulse rounded-full" />
            </div>
          </div>

          <div className="pt-6">
            <Link
              to="/work"
              onClick={playClick}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#171717] hover:bg-[#E10600] text-[#F2F0EA] hover:text-white border border-[#F2F0EA]/15 hover:border-[#E10600] font-mono text-xs uppercase tracking-wider font-bold transition-all rounded-sm shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO WORK</span>
            </Link>
          </div>
        </BorderGlow>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
