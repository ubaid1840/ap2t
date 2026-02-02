"use client";

import {
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { auth } from "@/lib/firebase";

type DBUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
};

type AuthContextType = {
  firebaseUser: FirebaseUser | null;
  user: DBUser | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  user: null,
  loading: true,
});

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<DBUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setLoading(true);
      setFirebaseUser(fbUser);

      if (fbUser?.email) {
        try {
          const res = await axios.get("/auth/signup", {
            params: { email: fbUser.email },
          });

          setUser(res.data);
        } catch (err) {
          console.error("Failed to load DB user", err);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
