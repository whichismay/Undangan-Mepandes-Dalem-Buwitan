import { collection, onSnapshot, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { RSVP } from "../types";

// Fixed cutoff timestamp for test cleanup (August 6, 2026 08:00 UTC)
const TEST_CLEANUP_CUTOFF = 1785980000000;
const TEST_NAMES = ["Gede Arta & Keluarga", "Made & Ketut", "Ella", "Kak Elaa", "Mang Alitz Squad"];
let isCleanedUp = false;

export function subscribeToWishes(callback: (wishes: RSVP[]) => void) {
  try {
    const wishesRef = collection(db, "wishes");

    // Clean up test wishes created during development/testing
    if (!isCleanedUp) {
      isCleanedUp = true;
      getDocs(wishesRef)
        .then((snapshot) => {
          snapshot.docs.forEach((d) => {
            const data = d.data();
            const createdAtTime = data.createdAt ? new Date(data.createdAt).getTime() : 0;
            // Delete test entries created before launch cutoff or matching test names
            if (TEST_NAMES.includes(data.name) || (createdAtTime > 0 && createdAtTime < TEST_CLEANUP_CUTOFF)) {
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
            if (TEST_NAMES.includes(data.name)) return false;
            if (createdAtTime > 0 && createdAtTime < TEST_CLEANUP_CUTOFF) return false;
            return true;
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

