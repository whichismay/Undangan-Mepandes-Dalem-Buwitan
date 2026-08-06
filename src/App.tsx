import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { InvitationData, RSVP } from "./types";
import InvitationCover from "./components/InvitationCover";
import InvitationContent from "./components/InvitationContent";
import AudioPlayer from "./components/AudioPlayer";
import { subscribeToWishes, sendWishToFirestore } from "./lib/wishesService";

const DEFAULT_INVITATION_DATA: InvitationData = {
  initiates: [
    {
      id: "1",
      name: "Ni Wayan Ryas Ganitri, S.Tr.Tra.",
      title: "Bapak I Made Oka Santiaga, SE.,M.M & Ibu Ni Wayan Sukartini",
      description: ""
    },
    {
      id: "2",
      name: "Ni Wayan Ella Ermayani, A.Md.T",
      title: "Bapak I Nyoman Alit Suryamanik, S.H & Ibu Ni Ketut Puspanadi, S.TP",
      description: ""
    },
    {
      id: "3",
      name: "Ni Made Vira Gayatri",
      title: "Bapak I Made Oka Santiaga, SE.,M.M & Ibu Ni Wayan Sukartini",
      description: ""
    },
    {
      id: "4",
      name: "I Made Jyestha Cahyadiguna",
      title: "Bapak I Nyoman Alit Suryamanik, S.H & Ibu Ni Ketut Puspanadi, S.TP",
      description: ""
    },
    {
      id: "5",
      name: "Ni Komang Risna Gianitri",
      title: "Bapak I Made Oka Santiaga, SE.,M.M & Ibu Ni Wayan Sukartini",
      description: ""
    },
    {
      id: "6",
      name: "Ni Wayan Kusumawati",
      title: "Bapak I Wayan Sentana Putra, SE.,M.Si & Ibu Ni Ketut Mustini, S.E",
      description: ""
    },
    {
      id: "7",
      name: "Ni Ketut Emma Dharmaning Putri",
      title: "Bapak I Nyoman Alit Suryamanik, S.H & Ibu Ni Ketut Puspanadi, S.TP",
      description: ""
    }
  ],
  parents: {
    fatherName: "",
    motherName: "",
    familyTitle: "Dalem Buwitan"
  },
  event: {
    date: "2026-10-13",
    balineseDate: "Anggara Pon Kelawu",
    time: "15.00 WITA (03:00 Sore)",
    venueName: "Dalem Buwitan",
    address: "Jalan A. Yani Utara, Gang Buwitan, Br. Batur Peguyangan Kaja, Denpasar Utara.",
    mapsLink: "https://maps.app.goo.gl/hpF6WcKofdxdeSBx8?g_st=ic"
  },
  rsvpList: [],
  theme: "bold-typography" // Set "Bold Typography" design theme as default
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [invitationData, setInvitationData] = useState<InvitationData>(() => {
    const saved = localStorage.getItem("mepandes_invitation_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          rsvpList: [], // Always empty initially until Firestore syncs live wishes
          event: {
            ...parsed.event,
            balineseDate: DEFAULT_INVITATION_DATA.event.balineseDate,
            mapsLink: DEFAULT_INVITATION_DATA.event.mapsLink
          }
        };
      } catch (e) {
        return DEFAULT_INVITATION_DATA;
      }
    }
    return DEFAULT_INVITATION_DATA;
  });

  const [audioTrigger, setAudioTrigger] = useState(false);

  // Guest recipient state initialized from URL query parameter (e.g. ?to=Ella%20sekeluarga or ?nama=...)
  const [guestRecipient, setGuestRecipient] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get("to") || params.get("nama") || params.get("u");
      if (toParam && toParam.trim()) {
        return toParam.trim();
      }
    }
    return "";
  });

  // Sync state changes with localStorage (excluding rsvpList which comes from Firestore)
  useEffect(() => {
    const { rsvpList, ...rest } = invitationData;
    localStorage.setItem("mepandes_invitation_data", JSON.stringify(rest));
  }, [invitationData]);

  // Real-time Firestore subscription for wishes
  useEffect(() => {
    const unsubscribe = subscribeToWishes((firestoreWishes) => {
      setInvitationData((prev) => ({
        ...prev,
        rsvpList: firestoreWishes || []
      }));
    });
    return () => unsubscribe();
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setAudioTrigger(true); // Auto-starts nice Balinese rindik chord sequence
  };

  const handleUpdateRSVP = async (newRsvp: RSVP) => {
    // Save locally first for instant UI response
    setInvitationData((prev) => ({
      ...prev,
      rsvpList: [newRsvp, ...prev.rsvpList.filter((item) => item.id !== newRsvp.id)]
    }));

    // Send to Firestore database so everyone sees it
    await sendWishToFirestore(newRsvp);
  };

  const handleClearRSVP = () => {
    setInvitationData((prev) => ({
      ...prev,
      rsvpList: []
    }));
  };

  return (
    <div className="min-h-screen w-full relative bg-[#FAF8F5] overflow-x-hidden">
      {/* Conditionally rendering either elegant interactive Cover or full premium details content with fade in/out */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="w-full min-h-screen"
          >
            <InvitationCover 
              data={invitationData} 
              guestRecipient={guestRecipient}
              onUpdateGuestRecipient={setGuestRecipient}
              onOpen={handleOpenInvitation} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: "easeInOut" } }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-screen"
          >
            <InvitationContent 
              data={invitationData} 
              guestRecipient={guestRecipient}
              onUpdateRSVP={handleUpdateRSVP}
              onClearRSVP={handleClearRSVP}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating background audio player (always on top) */}
      <AudioPlayer autoPlayTrigger={audioTrigger} />
    </div>
  );
}
