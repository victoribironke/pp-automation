import { auth, db } from "@/services/firebase";
import { Item } from "@/types/general";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

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

export const getLatestImage = async () => {
  const res = (await getDocs(collection(db, "twitter"))).docs.sort((a, b) =>
    a.data().seed > b.data().seed ? 1 : -1
  );

  return res.at(-1)?.data() as Item;
};
