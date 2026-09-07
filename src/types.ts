export interface MepandesInitiate {
  id: string;
  name: string;
  title: string; // e.g. "Dahyang/Daha" or "Anak Sulung" or "Pianak kapertama"
  description?: string; // Additional info
}

export interface ParentDetails {
  fatherName: string;
  motherName: string;
  familyTitle?: string; // e.g. "Kaluaga Gede"
}

export interface EventDetails {
  date: string; // "2026-10-12"
  balineseDate: string; // "Anggara Pon Kelawu - Sasih Kalima"
  time: string; // "08:00 WITA - Selesai"
  venueName: string; // e.g. "Bale Gede Jeroan Sading"
  address: string; // Full address
  mapsLink: string; // Google Maps URL
}

export interface RSVP {
  id: string;
  name: string;
  relationship?: string;
  status: "hadir" | "absen"; // Balinese: "Lunga" or "Nenten"
  message: string;
  timestamp: string;
}

export interface InvitationData {
  initiates: MepandesInitiate[];
  parents: ParentDetails;
  event: EventDetails;
  rsvpList: RSVP[];
  theme: "gold-dark" | "gold-light" | "royal-crimson" | "sacred-emerald" | "bold-typography";
}
