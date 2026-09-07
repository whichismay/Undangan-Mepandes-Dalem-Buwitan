import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, MapPin, Clock, Users, Send, Heart, Map, AlertCircle, Copy, Check, MessageSquareHeart } from "lucide-react";
import { InvitationData, RSVP } from "../types";
import { translitToBalinese } from "../utils/balinese";
import { BalineseDivider } from "./BalineseOrnaments";
import CountdownTimer from "./CountdownTimer";

function formatTimeAgo(isoString?: string): string {
  if (!isoString) return "Baru saja";
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "Baru saja";
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return "Baru saja";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m yang lalu`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}j yang lalu`;
    const diffDay = Math.floor(diffHour / 24);
    if (diffDay < 30) return `${diffDay} hari lalu`;
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  } catch {
    return "Baru saja";
  }
}

interface InvitationContentProps {
  data: InvitationData;
  guestRecipient?: string;
  onUpdateRSVP: (newRsvp: RSVP) => void;
  onClearRSVP: () => void;
}

export default function InvitationContent({ data, guestRecipient, onUpdateRSVP, onClearRSVP }: InvitationContentProps) {
  // RSVP Form States
  const [guestName, setGuestName] = useState(guestRecipient || "");
  const [status, setStatus] = useState<"hadir" | "absen">("hadir");
  const [message, setMessage] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const PRAYER_TEMPLATES = [
    {
      id: 1,
      label: "Template 1",
      text: "Rahayu... Selamat atas Upacara Mepandes / Metatah semeton Keluarga Besar Dalem Buwitan. Astungkara seluruh rangkaian acara memargi lancar lan rahayu."
    },
    {
      id: 2,
      label: "Template 2",
      text: "Om Swastyastu. Selamat ngelaksanayang karya Manusa Yadnya Mepandes untuk Keluarga Besar Dalem Buwitan. Dumogi memargi labda karya lan selalu rahayu."
    }
  ];

  const handleApplyTemplate = (templateId: number) => {
    const tpl = PRAYER_TEMPLATES.find((t) => t.id === templateId);
    if (tpl) {
      setMessage(tpl.text);
      setSelectedTemplate(templateId);
    }
  };

  const handleCopyTemplate = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  // Sync guest name when recipient changes
  useEffect(() => {
    if (guestRecipient) {
      setGuestName(guestRecipient);
    }
  }, [guestRecipient]);

  const theme = {
    bg: "bg-gradient-to-b from-[#FAF8F5] via-[#F6F3EB] to-[#FAF8F5] text-[#676a57]",
    cardBg: "bg-gradient-to-b from-white/90 via-[#FAF8F5]/90 to-[#F6F3EB]/90 border border-[#e2d8cd] text-[#676a57] shadow-lg shadow-[#676a57]/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 relative overflow-hidden",
    title: "text-[#676a57] font-extrabold",
    accentText: "text-[#676a57]",
    button: "bg-[#676a57] text-white hover:brightness-110 font-bold border border-[#d8c49e] shadow-md",
    accentBorder: "border-[#d8c49e]",
    sub: "text-[#8d8e7c] font-medium",
    accentBadge: "bg-[#f5eedc] text-[#5c4a24] border-[#d8c49e]"
  };

  // Highlight October 13, 2026 Calendar logic
  const renderCalendar = () => {
    const daysOffset = 3;
    const totalDays = 31;
    const daysArray = [];

    for (let i = 0; i < daysOffset; i++) {
      daysArray.push(<div key={`empty-${i}`} className="h-8 w-8" />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const isEventDay = day === 13;
      daysArray.push(
        <div
          key={`day-${day}`}
          className={`flex h-8 w-8 items-center justify-center text-xs font-serif-royal rounded-full transition-all duration-300 ${
            isEventDay
              ? "bg-[#c5a059] font-bold text-white scale-110 ring-4 ring-[#f5eedc] shadow-md"
              : "text-[#676a57] hover:bg-[#f8f4ea]"
          }`}
          title={isEventDay ? "Parikrama Yadnya Mepandes!" : `Tanggal ${day}`}
        >
          {day}
        </div>
      );
    }
    return daysArray;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle RSVP Submit
  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setSubmitError("Nama tamu wajib diisi");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const newRsvp: RSVP = {
      id: Date.now().toString(),
      name: guestName.trim(),
      status: status,
      message: message.trim() || "Ngastungkaran Rahayu lan Mogi Labda Karya.",
      timestamp: new Date().toISOString()
    };

    try {
      await onUpdateRSVP(newRsvp);
      setGuestName("");
      setMessage("");
      setSelectedTemplate(null);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      setSubmitError("Gagal mengirim ucapan, silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`relative w-full min-h-screen px-3.5 sm:px-6 md:px-8 py-8 sm:py-12 transition-all duration-700 overflow-hidden ${theme.bg}`}>
      {/* Thank You Popup Modal upon submitting ucapan & RSVP */}
      {submitSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#eebebc] shadow-2xl text-center relative overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#fee4e3] flex items-center justify-center text-[#676a57]">
              <Heart className="w-7 h-7 text-[#676a57] fill-[#676a57] animate-bounce" />
            </div>
            <h3 className="text-xl sm:text-2xl font-serif-royal font-bold text-[#676a57] mb-2">
              Matur Suksma! 🙏
            </h3>
            <p className="text-sm font-bold text-[#676a57] mb-6 leading-relaxed">
              Terima kasih atas doa dan ucapannya.
            </p>
            <button
              type="button"
              onClick={() => setSubmitSuccess(false)}
              className="w-full py-3.5 px-6 min-h-[48px] rounded-xl bg-[#676a57] text-white font-bold text-xs uppercase tracking-widest shadow-md hover:brightness-110 active:scale-98 transition-all cursor-pointer touch-manipulation"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      
      <div className="mx-auto max-w-2xl lg:max-w-4xl xl:max-w-5xl space-y-10 sm:space-y-16 relative z-10">
        
        {/* Subtle top separator */}
        <div className="flex flex-col items-center justify-center gap-2 mb-8">
          <div className="w-20 h-[1.5px] bg-[#d8c49e]/60 rounded-full" />
        </div>

        {/* SECTION 1: MATUR SWANTEN (GREETING) */}
        <motion.div
          id="sec-greeting"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="p-2 sm:p-4 text-center relative"
        >
          <div className="flex flex-col items-center justify-center mb-2">
            <span className="text-xs uppercase tracking-[0.25em] font-serif-royal font-bold text-[#676a57] mb-0.5">Panyembrama</span>
            <span className="text-[#8d8e7c] text-sm sm:text-base font-normal tracking-wide mb-1" title="Aksara Bali: Panyembrama">
              ᬧᬜᬾᬫ᭄ᬩ᭄ᬭᬫ
            </span>
          </div>

          {/* Om Swastyastu script header */}
          <div className="flex flex-col items-center justify-center mb-4">
            <span className="text-[#8d8e7c] text-base sm:text-xl font-normal mb-1 antialiased" title="Aksara Bali: Om Swastyastu">
              ᬑᬁ ᬲ᭄ᬯᬲ᭄ᬢ᭄ᬬᬲ᭄ᬢᬸ
            </span>
            <h3 className="text-xl sm:text-2xl font-serif-royal font-bold text-[#676a57] tracking-wide">
              Om Swastyastu
            </h3>
          </div>

          {/* Bahasa Bali Alus Body */}
          <p className="text-sm sm:text-[14.5px] leading-relaxed font-serif-elegant italic text-[#676a57] mb-6 text-center max-w-2xl mx-auto">
            &ldquo;Sangkaning asung kertha wara nugraha Ida Sang Hyang Widhi Wasa, miwah paswecan lingsir sami, tityang Kaluarga Gede Persepupuan jagi ngamargiang Upacara Manusa Yadnya: <strong>Mepandes (Potong Gigi)</strong> mantuka ring semeton tityange sané mapesengan:&rdquo;
          </p>

          <p className="text-sm sm:text-base font-bold font-serif-royal uppercase text-[#676a57] tracking-wider mt-2">
            Saking Keluarga Besar Dalem Buwitan
          </p>
        </motion.div>

        {/* Section Divider */}
        <div className="w-20 h-[1.5px] bg-[#d8c49e]/60 mx-auto my-8 sm:my-12 rounded-full" />

        {/* SECTION 2: SANG PACANG MEPANDES (THE INITIATES / LIST) */}
        <motion.div
          id="sec-initiates"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center py-2 relative"
        >
          <div className="text-center mb-6 flex flex-col items-center justify-center relative">
            <span className="text-[#8d8e7c] text-sm sm:text-base font-normal mb-1 antialiased" title="Aksara Bali: Sang Pacang Mepandes">
              ᬲᬗ᭄​ᬧᬘᬗ᭄​ᬫᬾᬧᬦ᭄ᬤᬾᬲ᭄
            </span>
            <span className="text-[11px] uppercase tracking-[0.25em] font-serif-royal text-[#8d8e7c] font-bold">Semeton Sang Pacang Mepandes</span>
            <h2 className={`text-xl sm:text-2xl font-bold font-serif-royal ${theme.title} mt-1`}>
              SANG PACANG MEPANDES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6 text-left w-full mx-auto">
            {/* Family 1 (Bapak I Wayan Sentana Putra, SE.,M.Si & Ibu Ni Ketut Mustini, S.E) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-5 rounded-2xl bg-[#FFFDF9]/80 border border-[#d8c49e] shadow-xs hover:shadow-md transition-all relative overflow-hidden"
            >
              <div className="mb-3 pb-2.5 border-b border-[#d8c49e]/60">
                <span className="text-[10px] uppercase font-sans tracking-wider text-[#8d8e7c] font-bold block mb-1">
                  Anak alit saking:
                </span>
                <div className="text-xs sm:text-[13px] font-serif-royal font-bold text-[#676a57] leading-tight space-y-0.5">
                  <p>Bapak I Wayan Sentana Putra, SE.,M.Si</p>
                  <p>Ibu Ni Ketut Mustini, S.E</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#c5a059] text-xs">✦</span>
                    <p className="text-base sm:text-lg md:text-xl font-serif-royal font-bold text-[#676a57] tracking-wide leading-snug">
                      Ni Wayan Kusumawati
                    </p>
                  </div>
                  <span className="text-[#8d8e7c] text-xs font-normal pl-5 block mt-0.5 antialiased" title="Aksara Bali: Ni Wayan Kusumawati">
                    {translitToBalinese("Ni Wayan Kusumawati")}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Family 2 (Bapak I Made Oka Santiaga, SE.,M.M & Ibu Ni Wayan Sukartini) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-5 rounded-2xl bg-[#FFFDF9]/80 border border-[#d8c49e] shadow-xs hover:shadow-md transition-all relative overflow-hidden"
            >
              <div className="mb-3 pb-2.5 border-b border-[#d8c49e]/60">
                <span className="text-[10px] uppercase font-sans tracking-wider text-[#8d8e7c] font-bold block mb-1">
                  Anak alit saking:
                </span>
                <div className="text-xs sm:text-[13px] font-serif-royal font-bold text-[#676a57] leading-tight space-y-0.5">
                  <p>Bapak I Made Oka Santiaga, SE.,M.M</p>
                  <p>Ibu Ni Wayan Sukartini</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#c5a059] text-xs">✦</span>
                    <p className="text-base sm:text-lg md:text-xl font-serif-royal font-bold text-[#676a57] tracking-wide leading-snug">
                      Ni Wayan Ryas Ganitri, S.Tr.Tra.
                    </p>
                  </div>
                  <span className="text-[#8d8e7c] text-xs font-normal pl-5 block mt-0.5 antialiased" title="Aksara Bali: Ni Wayan Ryas Ganitri">
                    {translitToBalinese("Ni Wayan Ryas Ganitri")}
                  </span>
                </div>
                
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#c5a059] text-xs">✦</span>
                    <p className="text-base sm:text-lg md:text-xl font-serif-royal font-bold text-[#676a57] tracking-wide leading-snug">
                      Ni Made Vira Gayatri
                    </p>
                  </div>
                  <span className="text-[#8d8e7c] text-xs font-normal pl-5 block mt-0.5 antialiased" title="Aksara Bali: Ni Made Vira Gayatri">
                    {translitToBalinese("Ni Made Vira Gayatri")}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#c5a059] text-xs">✦</span>
                    <p className="text-base sm:text-lg md:text-xl font-serif-royal font-bold text-[#676a57] tracking-wide leading-snug">
                      Ni Komang Risna Gianitri
                    </p>
                  </div>
                  <span className="text-[#8d8e7c] text-xs font-normal pl-5 block mt-0.5 antialiased" title="Aksara Bali: Ni Komang Risna Gianitri">
                    {translitToBalinese("Ni Komang Risna Gianitri")}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Family 3 (Bapak I Nyoman Alit Suryamanik, S.H & Ibu Ni Ketut Puspanadi, S.TP) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-5 rounded-2xl bg-[#FFFDF9]/80 border border-[#d8c49e] shadow-xs hover:shadow-md transition-all relative overflow-hidden"
            >
              <div className="mb-3 pb-2.5 border-b border-[#d8c49e]/60">
                <span className="text-[10px] uppercase font-sans tracking-wider text-[#8d8e7c] font-bold block mb-1">
                  Anak alit saking:
                </span>
                <div className="text-xs sm:text-[13px] font-serif-royal font-bold text-[#676a57] leading-tight space-y-0.5">
                  <p>Bapak I Nyoman Alit Suryamanik, S.H</p>
                  <p>Ibu Ni Ketut Puspanadi, S.TP</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#c5a059] text-xs">✦</span>
                    <p className="text-base sm:text-lg md:text-xl font-serif-royal font-bold text-[#676a57] tracking-wide leading-snug">
                      Ni Wayan Ella Ermayani, A.Md.T
                    </p>
                  </div>
                  <span className="text-[#8d8e7c] text-xs font-normal pl-5 block mt-0.5 antialiased" title="Aksara Bali: Ni Wayan Ella Ermayani">
                    {translitToBalinese("Ni Wayan Ella Ermayani")}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#c5a059] text-xs">✦</span>
                    <p className="text-base sm:text-lg md:text-xl font-serif-royal font-bold text-[#676a57] tracking-wide leading-snug">
                      I Made Jyestha Cahyadiguna
                    </p>
                  </div>
                  <span className="text-[#8d8e7c] text-xs font-normal pl-5 block mt-0.5 antialiased" title="Aksara Bali: I Made Jyestha Cahyadiguna">
                    {translitToBalinese("I Made Jyestha Cahyadiguna")}
                  </span>
                </div>

                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[#c5a059] text-xs">✦</span>
                    <p className="text-base sm:text-lg md:text-xl font-serif-royal font-bold text-[#676a57] tracking-wide leading-snug">
                      Ni Ketut Emma Dharmaning Putri
                    </p>
                  </div>
                  <span className="text-[#8d8e7c] text-xs font-normal pl-5 block mt-0.5 antialiased" title="Aksara Bali: Ni Ketut Emma Dharmaning Putri">
                    {translitToBalinese("Ni Ketut Emma Dharmaning Putri")}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Section Divider */}
        <div className="w-20 h-[1.5px] bg-[#d8c49e]/60 mx-auto my-8 sm:my-12 rounded-full" />

        {/* SECTION 3: ACARA & CALENDAR GRID (DRESTA PARIKRAMA) */}
        <motion.div
          id="sec-schedule"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-2 relative"
        >
          <div className="text-center mb-8 flex flex-col items-center justify-center relative">
            <span className="text-[#8d8e7c] text-sm sm:text-base font-normal mb-1 antialiased" title="Aksara Bali: Dresta Parikrama">
              ᬤ᭄ᬭᬾᬲ᭄ᬢ​ᬧᬭᬶᬓ᭄ᬭᬫ
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#8d8e7c] font-serif-royal font-bold">Dresta Parikrama</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold font-serif-royal ${theme.title} mt-1`}>
              TITI GONG REKA (WAKTU & TEMPAT)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Written Details */}
            <div className="space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#FFFDF9] text-[#676a57] border border-[#d8c49e] mt-1 shadow-2xs">
                  <Calendar className="h-5 w-5 text-[#a8823b]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#676a57] font-bold font-mono">Dina lan Tanggal</h4>
                  <p className="text-base sm:text-lg font-black font-serif-royal text-[#676a57] tracking-wide mt-0.5">
                    Selasa, 13 Oktober 2026
                  </p>
                  <p className="text-xs text-[#8d8e7c] font-serif-elegant font-bold mt-0.5">
                    Anggara Pon Kelawu
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#FFFDF9] text-[#676a57] border border-[#d8c49e] mt-1 shadow-2xs">
                  <Clock className="h-5 w-5 text-[#a8823b]" />
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs uppercase tracking-widest text-[#676a57] font-bold font-mono">
                      Dauh Galah (Waktu Acara)
                    </h4>
                  </div>
                  
                  {/* Card: Resepsi Mepandes */}
                  <div className="p-4 rounded-2xl bg-[#FFFDF9]/90 border border-[#d8c49e] shadow-2xs text-[#676a57]">
                    <p className="text-xs font-bold font-serif-royal uppercase tracking-wider text-[#8a6d32]">
                      Resepsi Mepandes
                    </p>
                    <p className="text-base sm:text-lg font-black font-serif-royal text-[#676a57] tracking-wider mt-1">
                      12.00 WITA – Selesai
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#FFFDF9] text-[#676a57] border border-[#d8c49e] mt-1 shadow-2xs">
                  <MapPin className="h-5 w-5 text-[#a8823b]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#676a57] font-bold font-mono">Genah Parikrama</h4>
                  <p className="text-sm font-bold font-serif-royal text-[#676a57]">
                    {data.event.venueName}
                  </p>
                  <p className="text-xs text-[#8d8e7c] leading-relaxed font-sans pr-2">
                    {data.event.address}
                  </p>
                </div>
              </div>

            </div>

            {/* October 2026 Calendar Widget */}
            <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-[#FFFDF9]/90 border border-[#d8c49e] shadow-xs">
              <span className="text-xs font-serif-royal font-bold tracking-widest text-[#676a57] mb-2 uppercase text-center">
                Oktober 2026
              </span>
              <div className="grid grid-cols-7 gap-y-1 gap-x-2 text-center text-[10px] text-[#8d8e7c] font-mono tracking-wider w-full pb-2 border-b border-[#d8c49e] mb-2 font-bold">
                <span>Sn</span><span>Sl</span><span>Rb</span><span>Km</span><span>Jm</span><span>Sb</span><span>Mg</span>
              </div>
              <div className="grid grid-cols-7 gap-y-1.5 gap-x-2 text-center w-full">
                {renderCalendar()}
              </div>
              <p className="text-[10px] text-[#8d8e7c] font-serif-elegant mt-3 text-center italic font-semibold">
                *Tanggal upacara kemargiang ring tanggal maperhias Emas (13)
              </p>
            </div>

          </div>

          {/* DEDICATED COUNTDOWN TIMER COMPONENT */}
          <div className="mt-8">
            <CountdownTimer 
              targetDateStr={data.event.date}
              venueName={data.event.venueName}
              address={data.event.address}
            />
          </div>
        </motion.div>

        {/* Section Divider */}
        <div className="w-20 h-[1.5px] bg-[#d8c49e]/60 mx-auto my-8 sm:my-12 rounded-full" />

        {/* SECTION 4: LOCATION MAPS INTEGRATION */}
        <motion.div
          id="sec-location-map"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="py-2 relative space-y-4 max-w-md mx-auto"
        >
          <div className="text-center flex flex-col items-center justify-center relative">
            <span className="text-[#8d8e7c] text-sm sm:text-base font-normal mb-1 antialiased" title="Aksara Bali: Panyingakan Genah">
              ᬧᬜᬶᬗᬓᬦ᭄​ᬕᬾᬦᬄ
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#8d8e7c] font-serif-royal font-bold">Panyingakan Genah</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold font-serif-royal ${theme.title} mt-1`}>
              LOKASI PARIKRAMA
            </h2>
            <p className="text-xs text-[#8d8e7c] italic max-w-xs mx-auto mt-1.5 font-serif-elegant font-medium">
              Nuntun pamargin uleman jagi lali mangda prasida rawuh ring jeroan tityang
            </p>
          </div>

          {/* Compact Google Maps Location Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFDF9]/95 border border-[#d8c49e] shadow-xs text-center flex flex-col items-center justify-center gap-4 relative overflow-hidden">
            {/* Animated Pin Icon */}
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-10 w-10 rounded-full bg-[#c5a059]/25 animate-ping" />
              <div className="p-3 rounded-full bg-gradient-to-br from-[#c5a059] to-[#8c6c2e] text-white shadow-md border border-[#f5eedc] relative z-10">
                <MapPin className="h-5 w-5 text-amber-100 animate-bounce" />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-black text-[#676a57] font-serif-royal">{data.event.venueName}</h4>
              <p className="text-xs text-[#8d8e7c] leading-relaxed max-w-xs mx-auto">{data.event.address}</p>
            </div>

            <a
              id="btn-open-gmaps"
              href={data.event.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full bg-gradient-to-r from-[#c5a059] via-[#b89855] to-[#9e7d3b] font-serif-royal font-bold text-xs text-white shadow-md hover:brightness-105 active:scale-98 transition-all duration-300 cursor-pointer border border-[#d8c49e] tracking-wider uppercase mt-1 touch-manipulation"
            >
              <Map className="h-4 w-4 text-amber-100" />
              <span>BUKA GOOGLE MAPS</span>
            </a>
          </div>
        </motion.div>

        {/* Section Divider */}
        <div className="w-20 h-[1.5px] bg-[#d8c49e]/60 mx-auto my-8 sm:my-12 rounded-full" />

        {/* SECTION 5: WARTA LAN PAWESTU (KOLOM UCAPAN & RSVP) */}
        <motion.div
          id="sec-rsvp"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-2 relative"
        >
          <div className="text-center mb-6 flex flex-col items-center justify-center">
            <span className="text-[#8d8e7c] text-sm sm:text-base font-normal mb-1 antialiased" title="Aksara Bali: Warta lan Pawestu">
              ᬯᬭ᭄ᬢ​ᬮᬦ᭄​ᬧᬯᬾᬲ᭄ᬢᬸ
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-[#8d8e7c] font-serif-royal font-bold">Warta lan Pawestu</span>
            <h2 className={`text-2xl sm:text-3xl font-extrabold font-serif-royal ${theme.title} mt-1`}>
              UCAPAN & KONFIRMASI KEHADIRAN
            </h2>
            <p className="text-xs sm:text-sm text-[#8d8e7c] italic max-w-sm mx-auto mt-2 font-serif-elegant font-medium leading-relaxed">
              Doa restu dan kehadiran Bapak/Ibu/Saudara/i sangat kami harapkan
            </p>
          </div>

          {/* RSVP Form Card (Highlighted) */}
          <form onSubmit={handleRsvpSubmit} className="space-y-4 max-w-lg mx-auto mb-8 p-5 sm:p-8 rounded-3xl bg-[#FFFDF9]/90 border border-[#d8c49e] shadow-xs relative z-10">
            {submitError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{submitError}</span>
              </div>
            )}

            {submitSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <Heart className="w-4 h-4 shrink-0 text-emerald-600 fill-emerald-600" />
                <span>Matur suksma, terima kasih atas doa dan ucapannya.</span>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#676a57] uppercase tracking-wider">
                  Pesengan / Nama Tamu:
                </label>
                {guestRecipient && guestName !== guestRecipient && (
                  <button
                    type="button"
                    onClick={() => setGuestName(guestRecipient)}
                    className="min-h-[44px] inline-flex items-center text-xs text-[#676a57] font-bold underline hover:text-[#525545] cursor-pointer touch-manipulation"
                  >
                    Gunakan: &ldquo;{guestRecipient}&rdquo;
                  </button>
                )}
              </div>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Contoh: Ella"
                className="w-full px-4 py-3 min-h-[48px] rounded-xl border border-[#d8c49e] bg-white text-base sm:text-sm font-semibold text-[#676a57] focus:outline-none focus:ring-2 focus:ring-[#d8c49e]"
              />
            </div>

            {/* Konfirmasi Kehadiran */}
            <div>
              <label className="block text-xs font-bold text-[#676a57] uppercase tracking-wider mb-1.5">
                Konfirmasi Kehadiran:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setStatus("hadir")}
                  className={`min-h-[48px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center justify-center touch-manipulation active:scale-98 ${
                    status === "hadir"
                      ? "bg-[#676a57] text-white border-[#676a57] shadow-xs"
                      : "bg-white text-[#676a57] border-[#d8c49e] hover:bg-[#f8f4ea]"
                  }`}
                >
                  Hadir
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("absen")}
                  className={`min-h-[48px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center justify-center touch-manipulation active:scale-98 ${
                    status === "absen"
                      ? "bg-rose-700 text-white border-rose-700 shadow-xs"
                      : "bg-white text-[#676a57] border-[#d8c49e] hover:bg-[#f8f4ea]"
                  }`}
                >
                  Tidak Hadir
                </button>
              </div>
            </div>

            {/* UCAPAN INPUT FIELD & TEMPLATES BELOW */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#676a57] uppercase tracking-wider">
                  Tulis Ucapan & Pangastawa:
                </label>
                {copiedTemplate && (
                  <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-600" /> Tersalin!
                  </span>
                )}
              </div>

              {/* Main Custom Input Field - 16px font size on mobile to prevent iOS zoom */}
              <textarea
                rows={3}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setSelectedTemplate(null);
                }}
                placeholder="Ketik ucapan & doa di sini..."
                className="w-full px-4 py-3 min-h-[96px] rounded-xl border-2 border-[#d8c49e] bg-white text-base sm:text-xs font-semibold text-[#676a57] focus:outline-none focus:ring-2 focus:ring-[#676a57]/30 shadow-xs"
              />

              {message && (
                <div className="mt-1 flex justify-end mb-2">
                  <button
                    type="button"
                    onClick={() => handleCopyTemplate(message)}
                    className="min-h-[40px] px-2 py-1 text-xs text-[#676a57] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer touch-manipulation"
                  >
                    <Copy className="w-3.5 h-3.5" /> Salin Ucapan
                  </button>
                </div>
              )}

              {/* Optional Template Selection Buttons Below Textarea */}
              <div className="mt-3 p-3 sm:p-3.5 rounded-xl bg-white/90 border border-[#d8c49e] space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold text-[#676a57] uppercase tracking-wide">
                    Atau Pilih Template Ucapan (Opsional):
                  </p>
                  <span className="text-[10px] text-[#8d8e7c] italic">Klik untuk mengisi otomatis</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {PRAYER_TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => handleApplyTemplate(tpl.id)}
                      className={`text-left p-3 min-h-[44px] rounded-xl border text-xs transition-all cursor-pointer flex flex-col gap-1 active:scale-[0.99] touch-manipulation ${
                        selectedTemplate === tpl.id
                          ? "bg-[#676a57] text-white border-[#676a57] font-semibold shadow-xs"
                          : "bg-[#f8f4ea] text-[#676a57] border-[#d8c49e] hover:bg-[#f2ebda]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[11px] uppercase tracking-wide">{tpl.label}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          selectedTemplate === tpl.id ? "bg-white text-[#676a57]" : "bg-[#d8c49e]/40 text-[#676a57]"
                        }`}>
                          {selectedTemplate === tpl.id ? "Terpasang" : "Gunakan"}
                        </span>
                      </div>
                      <span className="text-[11px] opacity-90 italic leading-relaxed">&ldquo;{tpl.text}&rdquo;</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 min-h-[50px] rounded-xl bg-[#676a57] text-white font-bold text-xs uppercase tracking-widest border border-[#d8c49e] shadow-md hover:brightness-110 active:scale-98 disabled:opacity-70 transition-all cursor-pointer flex items-center justify-center gap-2 touch-manipulation"
            >
              <Send className={`w-4 h-4 ${isSubmitting ? "animate-spin" : ""}`} />
              <span>{isSubmitting ? "Mengirim Ucapan..." : "Kirim Konfirmasi & Ucapan"}</span>
            </button>
          </form>

          {/* DEDICATED REAL-TIME WISHES BOARD */}
          <div className="max-w-lg mx-auto p-6 sm:p-7 rounded-3xl bg-[#FFFDF9]/95 border border-[#d8c49e] shadow-xs relative z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-[#d8c49e]/80 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-[#f5eedc] text-[#8c6c2e] border border-[#d8c49e]/50">
                  <MessageSquareHeart className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold font-serif-royal uppercase text-[#676a57] tracking-wider flex items-center gap-1.5">
                    <span>UCAPAN & DOA</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#f5eedc] text-[#8c6c2e] text-[10px] font-bold border border-[#d8c49e]/40">
                      {data.rsvpList?.length || 0}
                    </span>
                  </h3>
                </div>
              </div>

              {/* Attendance Counter */}
              <div className="flex items-center gap-2 text-[10px] text-[#8c6c2e] font-serif-royal font-medium bg-[#f5eedc]/60 px-2.5 py-1 rounded-full border border-[#d8c49e]/50">
                <span className="text-emerald-800 font-bold">Hadir: {data.rsvpList?.filter((r) => r.status === "hadir").length || 0}</span>
                <span className="text-[#d8c49e]">|</span>
                <span className="text-[#8d8e7c]">Tidak: {data.rsvpList?.filter((r) => r.status === "absen").length || 0}</span>
              </div>
            </div>

            {/* Wishes Cards */}
            {(!data.rsvpList || data.rsvpList.length === 0) ? (
              <div className="p-6 rounded-2xl bg-[#f8f4ea]/60 border border-dashed border-[#d8c49e] text-center text-xs text-[#8d8e7c]">
                Belum ada ucapan
              </div>
            ) : (
              <div className="max-h-[520px] overflow-y-auto space-y-3 pr-1.5 py-1 custom-scrollbar">
                <AnimatePresence initial={false}>
                  {data.rsvpList.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: -12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="p-4 rounded-2xl bg-[#f8f4ea]/90 border border-[#d8c49e] shadow-2xs text-left hover:border-[#8c6c2e] transition-all relative overflow-hidden"
                    >
                      <div className="flex items-start gap-3">
                        {/* Avatar Circle with Initial */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c5a059] to-[#8c6c2e] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs border border-[#f5eedc]">
                          {item.name ? item.name.charAt(0).toUpperCase() : "S"}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-xs font-bold text-[#676a57] truncate">{item.name}</span>
                            <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                              item.status === "hadir"
                                ? "bg-[#f5eedc] text-[#8c6c2e] border border-[#d8c49e]/60"
                                : "bg-[#f0ebe1] text-[#8d8e7c] border border-[#d8c49e]/40"
                            }`}>
                              {item.status === "hadir" ? "Hadir" : "Tidak Hadir"}
                            </span>
                          </div>

                          <p className="text-xs text-[#676a57] font-serif-elegant italic leading-relaxed my-1.5">
                            &ldquo;{item.message}&rdquo;
                          </p>

                          <div className="flex items-center justify-between pt-1 border-t border-[#d8c49e]/40 text-[9px] text-[#8d8e7c]">
                            <span className="font-serif-royal italic flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              {formatTimeAgo(item.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>

        {/* OUTRO SECTION: MATUR SUKSMA */}
        <motion.div
          id="sec-outro"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-12 text-center text-xs text-[#676a57] font-serif-elegant max-w-sm mx-auto space-y-3 pb-8"
        >
          <p className="italic leading-relaxed font-medium">
            &ldquo;Matur suksma raris matiosan, nenten lali tityang nunas panyuryan sameton, ida-dane sinamian mangda prasida mapica pangastungkara saking adoh utawi rawuh ngupasaksi parikrama Yadnya puniki.&rdquo;
          </p>
          
          <div className="pt-2">
            <p className="text-[#676a57] font-serif-royal uppercase font-bold tracking-[0.2em] text-sm">
              Om Shanti Shanti Shanti Om
            </p>
            <p className="text-xs text-[#8d8e7c] font-serif-royal font-bold uppercase tracking-widest mt-2">
              Saking Keluarga Besar Dalem Buwitan
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

