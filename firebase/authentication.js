import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  getRedirectResult,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import init from "./init";

const auth = init.auth;
const db = init.db;

export const signUpWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithRedirect(init.auth, provider);
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export const isUserLoggedIn = async () => {
  if (auth.currentUser) return true;
  else return false;
};

export const getCurrentUser = async () => {
  return auth.currentUser;
};

export const updateUserData = () => {
  onAuthStateChanged(auth, async (user) => {
    await setDoc(doc(db, "users", "tets"), {
      name: "efjiejif",
      state: "CA",
      country: "USA",
    });
  });
};
