"use client";

import {
  onAuthStateChanged,
  User as FirebaseUser,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "@/lib/axios";
import { auth } from "@/lib/firebase";
import { usePathname } from "next/navigation";
import { useRouter } from 'nextjs-toploader/app'
import { toast } from "sonner";
import { handleLogout } from "@/lib/logout";

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
    onAuthStateChanged(auth, async (fbUser) => {
      setLoading(true);
      setFirebaseUser(fbUser);
      if (fbUser?.email) {
        try {
          const res = await axios.get(`/userdetail?email=${fbUser.email}`);
          setUser(res.data);
          const role = res.data?.role
          if (!role) {
            await handleLogout()
          } else if (!pathname.startsWith(`/portal/${role}`)) {
            router.replace(`/portal/${role}`);
          }
        } catch (err) {
          setUser(null);
          signOut(auth)
          router.replace("/portal/auth");
        }
      } else {
        setUser(null);
        router.replace("/portal//auth");
      }
      setLoading(false);
    });

  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
