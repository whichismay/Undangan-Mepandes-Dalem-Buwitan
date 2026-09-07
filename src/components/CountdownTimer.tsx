import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Clock, Calendar } from "lucide-react";

interface CountdownTimerProps {
  targetDateStr?: string; // e.g. "2026-10-13"
  eventTitle?: string;
  venueName?: string;
  address?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export default function CountdownTimer({
  targetDateStr = "2026-10-13",
  eventTitle = "Mepandes (Metatah / Potong Gigi)",
  venueName = "Dalem Buwitan",
  address = "Jl. A. Yani Utara, Br. Batur Peguyangan Kaja, Gang Buwitan, Denpasar Utara"
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    // Reception start target: October 13, 2026 12:00 WITA (UTC+8)
    const targetDate = new Date(`${targetDateStr}T12:00:00+08:00`);

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  // Google Calendar URL Generator
  const handleAddToGoogleCalendar = () => {
    const startDate = "20261013T040000Z"; // 12:00 WITA = 04:00 UTC
    const endDate = "20261013T100000Z";
    const title = encodeURIComponent(`Uleman Manusa Yadnya: ${eventTitle}`);
    const details = encodeURIComponent(`Acara Mepandes (Metatah) Anggara Pon Kelawu at ${venueName}. Alamat: ${address}`);
    const location = encodeURIComponent(`${venueName}, ${address}`);

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    window.open(gcalUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative my-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EEDC] border-2 border-[#c5a059]/40 shadow-xl shadow-[#c5a059]/10 text-center overflow-hidden max-w-md mx-auto"
    >
      {/* Title Header - Clean & Warm Gold */}
      <div className="flex flex-col items-center justify-center mb-6">
        {/* Event Name Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f5eedc] border border-[#c5a059]/50 text-[#8a6d32] text-xs font-serif-royal font-extrabold uppercase tracking-widest mb-3 shadow-2xs">
          <span>Resepsi Mepandes</span>
        </div>

        <div className="flex items-center gap-1.5 mb-1.5">
          <Clock className="w-4 h-4 text-[#a8823b]" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-serif-royal font-bold text-[#8a6d32]">
            HITUNG MUNDUR ACARA
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif-royal font-bold text-[#4a3b1a]">
          Selasa, 13 Oktober 2026
        </h3>
        <p className="text-xs text-[#705828] font-medium italic mt-1">
          Anggara Pon Kelawu • 12.00 WITA
        </p>
      </div>

      {/* Countdown Grid - Uniform Warm Gold Cards */}
      {timeLeft.isPast ? (
        <div className="py-3 px-4 mb-6 rounded-2xl bg-[#F0E6D2] border border-[#c5a059]/50 text-[#5c4a24] text-xs font-semibold">
          Acara Sedang / Telah Berlangsung
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-1.5 sm:gap-3 mb-6">
          {/* Days */}
          <div className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl bg-gradient-to-b from-white to-[#F7F2E6] border border-[#d8c49e] shadow-xs">
            <span className="text-xl sm:text-3xl font-bold font-serif-royal text-[#4a3b1a] tabular-nums">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#8a6d32] tracking-wider uppercase mt-1">
              HARI
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl bg-gradient-to-b from-white to-[#F7F2E6] border border-[#d8c49e] shadow-xs">
            <span className="text-xl sm:text-3xl font-bold font-serif-royal text-[#4a3b1a] tabular-nums">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#8a6d32] tracking-wider uppercase mt-1">
              JAM
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl bg-gradient-to-b from-white to-[#F7F2E6] border border-[#d8c49e] shadow-xs">
            <span className="text-xl sm:text-3xl font-bold font-serif-royal text-[#4a3b1a] tabular-nums">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#8a6d32] tracking-wider uppercase mt-1">
              MENIT
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl bg-gradient-to-b from-white to-[#F7F2E6] border border-[#d8c49e] shadow-xs">
            <span className="text-xl sm:text-3xl font-bold font-serif-royal text-[#4a3b1a] tabular-nums">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#8a6d32] tracking-wider uppercase mt-1">
              DETIK
            </span>
          </div>
        </div>
      )}

      {/* Add to Calendar Action Button - Elegant Warm Gold Button with >= 48px touch target */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToGoogleCalendar}
        className="w-full inline-flex items-center justify-center px-6 py-3.5 min-h-[48px] rounded-full bg-gradient-to-r from-[#c5a059] via-[#b89855] to-[#9e7d3b] text-white font-bold text-xs tracking-widest uppercase shadow-md hover:brightness-105 active:scale-98 transition-all cursor-pointer border border-[#d8c49e] touch-manipulation"
      >
        <Calendar className="w-4 h-4 mr-2" />
        SIMPAN TANGGAL KE KALENDER
      </motion.button>
    </motion.div>
  );
}
