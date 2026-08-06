import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { RSVP } from "../types";

let isSeeding = false;

export function subscribeToWishes(callback: (wishes: RSVP[]) => void) {
  try {
    const wishesRef = collection(db, "wishes");

    return onSnapshot(
      wishesRef,
      (snapshot) => {
        if (snapshot.docs.length === 0 && !isSeeding) {
          isSeeding = true;
          // Seed initial sample wishes into Firestore so all visitors see initial samples
          const defaultWishes = [
            {
              name: "Gede Arta & Keluarga",
              relationship: "Semeton / Keluarga",
              status: "hadir",
              message: "Om Swastyastu, selamat atas upacara Mepandes / Metatah semeton Keluarga Besar Dalem Buwitan. Dumogi memargi labda karya lan rahayu.",
              createdAt: new Date().toISOString()
            },
            {
              name: "Made & Ketut",
              relationship: "Kerabat / Sahabat",
              status: "hadir",
              message: "Selamat lan suksema atas terselenggaranya Yadnya Mepandes. Mogi memargi ancar lan selalu dicipati Kerahayuan.",
              createdAt: new Date(Date.now() - 3600000).toISOString()
            }
          ];
          
          // Show default wishes immediately in UI while seeding
          callback(defaultWishes.map((w, idx) => ({
            id: `seed-${idx}`,
            name: w.name,
            relationship: w.relationship,
            status: w.status as "hadir" | "absen",
            message: w.message,
            timestamp: w.createdAt
          })));

          Promise.all(defaultWishes.map((w) => addDoc(wishesRef, w)))
            .catch((err) => console.error("Error seeding initial wishes:", err))
            .finally(() => { isSeeding = false; });
          return;
        }

        const wishes: RSVP[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          const statusVal: "hadir" | "absen" = data.status === "absen" ? "absen" : "hadir";
          return {
            id: doc.id,
            name: data.name || "Semeton",
            relationship: data.relationship || data.attendance || "Semeton",
            status: statusVal,
            message: data.message || "",
            timestamp: data.createdAt || data.timestamp || new Date().toISOString()
          };
        });

        // Sort descending by timestamp (newest first)
        wishes.sort((a, b) => {
          const timeA = new Date(a.timestamp).getTime() || 0;
          const timeB = new Date(b.timestamp).getTime() || 0;
          return timeB - timeA;
        });

        callback(wishes);
      },
      (error) => {
        console.error("Error fetching wishes from Firestore:", error);
      }
    );
  } catch (err) {
    console.error("Failed to set up Firestore listener:", err);
    return () => {};
  }
}

export async function sendWishToFirestore(rsvp: Omit<RSVP, "id">): Promise<void> {
  try {
    const wishesRef = collection(db, "wishes");
    await addDoc(wishesRef, {
      name: rsvp.name,
      relationship: rsvp.relationship || "Semeton",
      status: rsvp.status || "hadir",
      message: rsvp.message || "",
      createdAt: rsvp.timestamp || new Date().toISOString()
    });
  } catch (err) {
    console.error("Error sending wish to Firestore:", err);
    throw err;
  }
}

