import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Calendar, MapPin, Edit3, Share2, Copy, Check, X, Send } from "lucide-react";
import { InvitationData } from "../types";
import { BalineseDivider, BalineseMeruSilhouette } from "./BalineseOrnaments";

interface InvitationCoverProps {
  data: InvitationData;
  guestRecipient: string;
  onUpdateGuestRecipient: (name: string) => void;
  onOpen: () => void;
}

export default function InvitationCover({ 
  data, 
  guestRecipient, 
  onUpdateGuestRecipient, 
  onOpen 
}: InvitationCoverProps) {
  const [showModal, setShowModal] = useState(false);
  const [inputName, setInputName] = useState(guestRecipient);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWaText, setCopiedWaText] = useState(false);

  // Check if current user is host (e.g. ?host=true or opened without ?to= guest parameter)
  const [isHostMode, setIsHostMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return (
        params.get("host") === "true" ||
        params.get("host") === "1" ||
        params.get("admin") === "true" ||
        !params.has("to")
      );
    }
    return false;
  });

  const [tapCount, setTapCount] = useState(0);

  // Secret triple tap on top flowers for host override
  const handleTopFlowersTap = () => {
    const nextCount = tapCount + 1;
    setTapCount(nextCount);
    if (nextCount >= 3) {
      setIsHostMode(true);
      setInputName(guestRecipient || "Ella sekeluarga");
      setShowModal(true);
      setTapCount(0);
    }
  };

  // Generate current custom invitation link
  const generateLink = (name: string) => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin + window.location.pathname : "";
    return `${baseUrl}?to=${encodeURIComponent(name.trim() || "Ella sekeluarga")}`;
  };

  const currentLink = generateLink(inputName);

  const handleSaveName = (newName: string) => {
    onUpdateGuestRecipient(newName);
    // Update URL query parameter without full page reload
    if (typeof window !== "undefined" && window.history.pushState) {
      const newUrl = generateLink(newName);
      window.history.pushState({ path: newUrl }, "", newUrl);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const getWhatsAppMessage = (name: string, link: string) => {
    const recipientName = name.trim() || "Bapak/Ibu/Saudara/i";
    return `Om Swastyastu,

Kepada Yth.
*${recipientName}*

Tanpa mengurangi rasa hormat, atas asung kertha wara nugraha Ida Sang Hyang Widhi Wasa, perkenankan kami mengundang Bapak/Ibu/Saudara/i, kerabat, serta sahabat terkasih untuk menghadiri Upacara Manusa Yadnya Mepandes (Potong Gigi) kami, yang astungkara akan dilaksanakan pada:

📅 *Selasa, 13 Oktober 2026*
⏰ *12.00 WITA - Selesai*
📍 *Jl. A. Yani Utara, Br. Batur Peguyangan Kaja, Gang Buwitan, Denpasar Utara*
🗺️ *Google Maps:* https://maps.app.goo.gl/KwLwqymGeU54EsfF6

Mengenai detail rangkaian acara & lokasi dapat diakses melalui tautan digital berikut:
${link}

*Doa restu dan kehadiran Bapak/Ibu/Saudara/i sangat kami harapkan.*
Merupakan suatu kebahagiaan serta kehormatan bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu demi kelancaran upacara ini.

*Mohon maaf yang sebesar-besarnya apabila undangan ini hanya dapat kami sampaikan melalui pesan digital ini.* Terima kasih banyak atas perhatian, doa restu, dan kehadirannya.

Om Shanti, Shanti, Shanti Om.

Salam Hormat,
*Keluarga Besar Dalem Buwitan*`;
  };

  const handleShareWhatsApp = () => {
    const message = getWhatsAppMessage(inputName, currentLink);
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  const handleCopyWaText = () => {
    const message = getWhatsAppMessage(inputName, currentLink);
    navigator.clipboard.writeText(message);
    setCopiedWaText(true);
    setTimeout(() => setCopiedWaText(false), 2500);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-4 overflow-hidden select-none bg-gradient-to-b from-[#fee4e3]/30 via-[#FAF9F5] to-[#fee4e3]/40 text-[#676a57] transition-colors duration-700">
      
      {/* Faded Background Meru Silhouette Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-5">
        <BalineseMeruSilhouette className="w-[320px] h-[550px] sm:w-[450px] sm:h-[750px] text-[#676a57]" opacity="opacity-100" />
      </div>

      {/* Soft Backdrop Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-radial from-[#eebebc]/20 via-[#fee4e3]/10 to-transparent blur-3xl pointer-events-none" />

      <motion.div 
        id="cover-container"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xl text-center px-4 sm:px-10 py-7 sm:py-10 rounded-3xl max-h-[92vh] overflow-y-auto bg-gradient-to-b from-[#FFFFFF]/95 via-[#FAF8F5]/95 to-[#F6F3EB]/95 backdrop-blur-md border border-[#e2d8cd] shadow-xl shadow-[#676a57]/5 text-[#676a57] transition-all duration-700 relative overflow-hidden"
      >
        {/* Swastiastu Header Symbol (triple tap for host override) */}
        <div 
          className="mb-3 flex flex-col items-center justify-center gap-1 cursor-pointer py-1"
          onClick={handleTopFlowersTap}
          title="Klik 3x untuk membuka Link Generator"
        >
          <span className="text-[#676a57] text-lg sm:text-2xl font-normal tracking-normal mb-0.5 select-all antialiased opacity-90 leading-relaxed" title="Aksara Bali: Om Swastyastu">
            ᬑᬁ ᬲ᭄ᬯᬲ᭄ᬢ᭄ᬬᬲ᭄ᬢᬸ
          </span>
          <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.35em] font-sans font-bold text-[#676a57]">
            Om Swastyastu
          </span>
          <div className="w-16 h-0.5 bg-[#eebebc] my-2.5 rounded-full" />
        </div>

        {/* Small Invitation Tag */}
        <div className="flex flex-col items-center justify-center mb-3">
          <span className="text-[#8d8e7c] text-xs font-normal tracking-normal mb-1 opacity-90 antialiased leading-relaxed" title="Aksara Bali: Uleman Manusa Yadnya">
            ᬉᬮᬾᬫᬦ᭄‌ᬫᬦᬸᬲᬬᬤ᭄ᬜ
          </span>
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold text-[#8d8e7c]">
            ULEMAN MANUSA YADNYA
          </p>
        </div>

        {/* Ceremony Name */}
        <div className="flex flex-col items-center justify-center mb-2">
          <span className="text-[#8d8e7c] text-lg sm:text-2xl font-normal tracking-wide mb-1 antialiased leading-relaxed" title="Aksara Bali: Mepandes">
            ᬫᬾᬧᬦ᭄ᬤᬾᬲ᭄
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif-royal tracking-wide sm:tracking-wider text-center leading-tight uppercase text-[#676a57] break-words">
            MEPANDES
          </h1>
          <p className="text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.25em] font-serif-royal font-bold text-[#8d8e7c] uppercase mt-1.5">
            KELUARGA DALEM BUWITAN
          </p>
        </div>
        
        <p className="text-[11px] sm:text-xs tracking-[0.15em] font-serif-elegant italic mb-4 text-center text-[#8d8e7c] font-medium">
          - Metatah / Potong Gigi -
        </p>

        {/* Horizontal Separator */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-px w-8 sm:w-10 bg-[#eebebc]" />
          <span className="text-[10px] uppercase tracking-widest font-serif-royal text-[#676a57] font-bold">
            Anggara Pon Kelawu
          </span>
          <span className="h-px w-8 sm:w-10 bg-[#eebebc]" />
        </div>

        {/* Event Detail Briefing */}
        <div className="inline-flex flex-col items-center justify-center rounded-2xl px-4 sm:px-5 py-3 mb-4 w-full max-w-xs mx-auto border border-[#eebebc] bg-[#fee4e3]/30 text-[#676a57] shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#676a57]">
            <Calendar className="h-3.5 w-3.5 text-[#676a57]" />
            <span>Selasa, 13 Oktober 2026</span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#8d8e7c] font-medium mt-1">
            <MapPin className="h-3 w-3 text-[#8d8e7c]" />
            <span className="truncate max-w-[200px]">{data.event.venueName}</span>
          </div>
        </div>

        {/* Dynamic Invited Guest Card (Only shown if recipient is specified in URL or set) */}
        {guestRecipient ? (
          <div className="my-4 p-4 rounded-2xl bg-gradient-to-b from-[#fee4e3]/20 via-white to-[#fee4e3]/20 border-2 border-[#eebebc] shadow-sm max-w-sm mx-auto relative">
            <p className="text-[10px] uppercase tracking-widest font-mono font-bold text-[#8d8e7c] mb-0.5">
              Undangan Untuk:
            </p>
            <p className="text-xs font-serif-elegant italic text-[#676a57] mb-1">
              Bapak / Ibu / Saudara / i:
            </p>
            
            <div className="py-1 px-2 my-1">
              <h2 className="text-xl sm:text-2xl font-black font-serif-royal text-[#676a57] tracking-wide uppercase break-words">
                {guestRecipient}
              </h2>
            </div>

            <p className="text-[10px] font-sans italic text-[#8d8e7c] mt-1.5">
              *Mohon maaf apabila ada kesalahan ejaan nama atau gelar.
            </p>
          </div>
        ) : null}

        {/* Open Button with touch-target >= 48px */}
        <div className="pt-2 flex flex-col items-center justify-center">
          <motion.button
            id="btn-open-invitation"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpen}
            className="relative group inline-flex items-center justify-center px-8 py-3.5 min-h-[48px] overflow-hidden rounded-full font-bold tracking-widest shadow-md hover:shadow-lg active:brightness-95 transition-all duration-300 cursor-pointer text-xs text-white bg-[#676a57] border border-[#eebebc] touch-manipulation"
          >
            <Mail className="mr-2 h-4 w-4 animate-bounce" />
            BUKA UNDANGAN
          </motion.button>
        </div>

        {/* Discreet Host Link Generator trigger (Only visible to host / when in host mode or ?host=true) */}
        {isHostMode && (
          <div className="mt-5 pt-3 border-t border-[#eebebc]/40">
            <button
              type="button"
              onClick={() => {
                setInputName(guestRecipient || "Ella sekeluarga");
                setShowModal(true);
              }}
              className="min-h-[44px] inline-flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#8d8e7c] hover:text-[#676a57] transition-colors cursor-pointer py-2 px-3 rounded-full hover:bg-[#fee4e3]/50 touch-manipulation"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Generator Link Tamu (Khusus Host)</span>
            </button>
          </div>
        )}
      </motion.div>

      {/* Guest Name & Share Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-5 sm:p-6 w-full max-w-md shadow-2xl border-2 border-[#eebebc] text-[#676a57] relative max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-600 transition-colors cursor-pointer touch-manipulation"
                aria-label="Tutup modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-2 pr-10">
                <Share2 className="w-5 h-5 text-[#676a57] shrink-0" />
                <h3 className="text-base sm:text-lg font-bold font-serif-royal text-[#676a57]">
                  Buat Link Undangan Tamu
                </h3>
              </div>

              <p className="text-xs text-[#8d8e7c] mb-3.5 leading-relaxed">
                Ketik nama tamu yang diundang di bawah ini untuk membuat link khusus dan pesan WhatsApp otomatis.
              </p>

              {/* Input for Guest Name - text-base on mobile prevents iOS auto-zoom */}
              <div className="mb-3.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#676a57] mb-1">
                  Nama Tamu / Penerima:
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => {
                    setInputName(e.target.value);
                    handleSaveName(e.target.value);
                  }}
                  placeholder="Contoh: Ella sekeluarga"
                  className="w-full px-4 py-3 min-h-[48px] rounded-xl border-2 border-[#eebebc] focus:border-[#676a57] focus:outline-none text-base sm:text-sm font-semibold text-[#676a57] bg-[#fee4e3]/20"
                />
              </div>

              {/* Generated Link Preview */}
              <div className="mb-3 p-3 rounded-xl bg-gray-50 border border-gray-200 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                  Link Undangan Tamu:
                </span>
                <p className="text-xs font-mono text-gray-800 break-all select-all">
                  {currentLink}
                </p>
              </div>

              {/* WhatsApp Message Preview */}
              <div className="mb-4 text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#676a57] block mb-1">
                  Pratinjau Pesan WhatsApp:
                </span>
                <div className="max-h-32 sm:max-h-36 overflow-y-auto p-3 rounded-xl bg-[#FFFDF9] border border-[#eebebc] text-[11px] text-[#676a57] whitespace-pre-wrap font-sans leading-relaxed select-all">
                  {getWhatsAppMessage(inputName, currentLink)}
                </div>
              </div>

              {/* Action Buttons - 44px min touch target */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-xl text-xs font-bold bg-[#676a57] text-white hover:bg-[#525544] active:scale-98 transition-colors cursor-pointer shadow-sm touch-manipulation"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? "Link Tersalin!" : "Salin Link"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 active:scale-98 transition-colors cursor-pointer shadow-sm touch-manipulation"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim WhatsApp</span>
                </button>
              </div>

              {/* Copy Full WhatsApp Text option - min 44px touch target */}
              <button
                type="button"
                onClick={handleCopyWaText}
                className="mt-2.5 w-full inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-xl text-xs font-semibold text-[#676a57] bg-[#fee4e3]/50 border border-[#eebebc] hover:bg-[#fee4e3] active:scale-98 transition-colors cursor-pointer touch-manipulation"
              >
                {copiedWaText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedWaText ? "Teks WA Tersalin!" : "Salin Teks Pesan WhatsApp"}</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
