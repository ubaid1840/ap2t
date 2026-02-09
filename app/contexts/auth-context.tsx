"use client";

import {
  onAuthStateChanged,
  User as FirebaseUser,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { auth } from "@/lib/firebase";
import { usePathname, useRouter } from "next/navigation";

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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<DBUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setLoading(true);
      setFirebaseUser(fbUser);
      console.log("ON auth change working");

      if (fbUser?.email) {
        try {
          const res = await axios.get("/auth/signup", {
            params: { email: fbUser.email },
          });
          console.log(res.data);
          if (res.data) {
            setUser(res.data);
            if (pathname.includes("auth")) {
              if (res.data.role === "admin") {
                router.push("/admin");
              } else if (res.data.role === "player") {
                router.push("/player");
              } else {
                router.push("/");
              }
            }
          } else {
            setUser(null);
            await signOut(auth);
          }
        } catch (err) {
          console.error("Failed to load DB user", err);
          setUser(null);
        }
      } else {
        setUser(null);
        router.push("/auth");
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
