import { auth, db } from "@/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export const firebaseLogin = async (email: string, password: string) => {
  const user = await signInWithEmailAndPassword(auth, email, password);

  return user;
};

export const saveImageToFirebase = async (seed: string) => {
  await setDoc(doc(db, "twitter", seed), {
    seed,
    timestamp: serverTimestamp(),
    type: "lorelei",
  });
};
