import { useState } from 'react';
import { motion } from 'motion/react';
import maPhoto from './ma-photo.svg';

export default function App() {
  const [isRed, setIsRed] = useState(false);

  const playClickSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.error('Audio playback failed:', e);
    }
  };

  const handleToggle = () => {
    playClickSound();
    setIsRed(!isRed);
  };

  return (
    <div 
      className={`min-h-screen flex flex-col items-center p-8 transition-colors duration-500 border-8 border-black ${
        isRed ? 'bg-[#dc2626]' : 'bg-[#2563eb]'
      }`}
    >
      {/* Top Text */}
      <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-6 drop-shadow-lg">
        Voici un modèle d'application React TypeScript Vite.
      </h1>

      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className="bg-[#172554] text-white font-semibold px-6 py-3 rounded-lg shadow-xl hover:bg-[#1e3a8a] transition-all active:scale-95 mb-12 cursor-pointer"
      >
        Couleur de fond
      </button>

      {/* Animated SVG Computer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-48 h-48 flex items-center justify-center mb-12"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
          {/* Monitor */}
          <rect x="10" y="10" width="80" height="50" rx="4" />
          <rect x="15" y="15" width="70" height="40" fill="rgba(0,0,0,0.2)" />
          {/* Stand */}
          <rect x="45" y="60" width="10" height="10" />
          <rect x="35" y="70" width="30" height="5" rx="2" />
          {/* Keyboard */}
          <rect x="20" y="80" width="60" height="10" rx="2" />
          <line x1="25" y1="85" x2="75" y2="85" stroke="black" strokeWidth="1" strokeDasharray="2,2" />
        </svg>
      </motion.div>

      {/* Link Box */}
      <div className="bg-white/20 backdrop-blur-sm border-2 border-white/30 p-4 rounded-xl mb-12">
        <a 
          href="https://google.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white font-bold underline hover:text-blue-200 transition-colors"
        >
          Aller sur Google.com
        </a>
      </div>

      {/* Balloons Image (Ma Photo) */}
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-black/40">
        <img 
          src={maPhoto} 
          alt="ma photo" 
          className="w-full h-auto object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}


