import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  autoPlayTrigger: boolean;
}

// Local high-speed hosted audio file + CDN fallback for "Putri Cening Ayu"
const AUDIO_SOURCES = [
  "/audio/putri-cening-ayu.mp3",
  "https://ia600809.us.archive.org/33/items/putri-cening-ayu-balinese-folks-song-br-872-mnu-q/Putri%20Cening%20Ayu%20(Balinese%20Folks%20Song)%20%5B-BR872_MnuQ%5D.mp3"
];

export default function AudioPlayer({ autoPlayTrigger }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play Audio
  const playAudio = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.volume = 0.9;
        const promise = audioRef.current.play();
        if (promise !== undefined) {
          await promise;
          setIsPlaying(true);
        }
      } catch (err) {
        console.warn("Autoplay interaction required on mobile:", err);
      }
    }
  };

  // Pause Audio
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  // Play on user opening invitation
  useEffect(() => {
    if (autoPlayTrigger) {
      playAudio();
    }
  }, [autoPlayTrigger]);

  // Global touch/click interaction handler for mobile Safari & Chrome
  useEffect(() => {
    const handleGesture = () => {
      if (autoPlayTrigger && audioRef.current && audioRef.current.paused) {
        audioRef.current.volume = 0.9;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
    };

    window.addEventListener("touchstart", handleGesture, { passive: true, once: true });
    window.addEventListener("click", handleGesture, { passive: true, once: true });

    return () => {
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("click", handleGesture);
    };
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const handleAudioError = () => {
    if (sourceIndex < AUDIO_SOURCES.length - 1) {
      console.warn("Switching to backup CDN audio URL...");
      setSourceIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[999999] flex items-center gap-2.5 select-none pointer-events-auto">
      {/* Native Audio Element playing strictly Putri Cening Ayu */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        playsInline
        src={AUDIO_SOURCES[sourceIndex]}
        onError={handleAudioError}
      />

      {/* Pill Badge state indicator */}
      <button
        type="button"
        onClick={togglePlay}
        className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-stone-900/95 backdrop-blur-md text-amber-200 border border-amber-500/50 text-xs font-semibold shadow-2xl hover:bg-stone-950 transition-all cursor-pointer"
      >
        <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? "bg-emerald-400 animate-pulse" : "bg-stone-500"}`}></span>
        <span>{isPlaying ? "Musik ON" : "Musik OFF"}</span>
      </button>

      {/* Floating Toggle Button */}
      <button
        id="bg-music-toggle"
        type="button"
        onClick={togglePlay}
        className={`flex h-14 w-14 items-center justify-center rounded-full bg-[#FAB313] text-stone-950 shadow-2xl border-2 border-amber-400 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none cursor-pointer ${
          isPlaying ? "ring-4 ring-amber-400/60 animate-pulse" : "opacity-85 hover:opacity-100"
        }`}
        title={isPlaying ? "Matikan Musik" : "Putar Musik"}
        aria-label={isPlaying ? "Matikan Musik" : "Putar Musik"}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Volume2 className="h-6 w-6 text-stone-950" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
          </div>
        ) : (
          <VolumeX className="h-6 w-6 text-stone-900 opacity-80" />
        )}
      </button>
    </div>
  );
}
