import { collection, onSnapshot, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { RSVP } from "../types";

// Cutoff timestamp for production launch (August 6, 2026 / launch time)
const LAUNCH_TIMESTAMP = Date.now();
let isCleanedUp = false;

export function subscribeToWishes(callback: (wishes: RSVP[]) => void) {
  try {
    const wishesRef = collection(db, "wishes");

    // Clean up all old test wishes from Firestore DB for official launch
    if (!isCleanedUp) {
      isCleanedUp = true;
      getDocs(wishesRef)
        .then((snapshot) => {
          snapshot.docs.forEach((d) => {
            const data = d.data();
            const createdAtTime = data.createdAt ? new Date(data.createdAt).getTime() : 0;
            // Delete all test data created before official launch timestamp
            if (createdAtTime < LAUNCH_TIMESTAMP) {
              deleteDoc(doc(db, "wishes", d.id)).catch(() => {});
            }
          });
        })
        .catch((err) => console.error("Error clearing test wishes:", err));
    }

    return onSnapshot(
      wishesRef,
      (snapshot) => {
        const wishes: RSVP[] = snapshot.docs
          .filter((docSnap) => {
            const data = docSnap.data();
            const createdAtTime = data.createdAt ? new Date(data.createdAt).getTime() : 0;
            // Filter out any test wishes created before launch
            return createdAtTime >= LAUNCH_TIMESTAMP;
          })
          .map((docSnap) => {
            const data = docSnap.data();
            const statusVal: "hadir" | "absen" = data.status === "absen" ? "absen" : "hadir";
            return {
              id: docSnap.id,
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

