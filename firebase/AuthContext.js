// firebase/authContext.js
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { setDoc, getDoc, doc } from "firebase/firestore";
import init from "./init";

const auth = init.auth;
const db = init.db;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            data: user,
            isVerified: data.isVerified,
            formSubmitted: data.formSubmitted,
            pendingApproval: data.pendingApproval,
          });
        } else {
          await setDoc(doc(db, "users", user.uid), {
            name: user.displayName,
            email: user.email,
            isVerified: false,
            formSubmitted: false,
            pendingApproval: false,
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
