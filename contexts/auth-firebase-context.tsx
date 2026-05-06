"use client";

import axios from "@/lib/axios";
import { auth } from "@/lib/firebase";
import { handleLogout } from "@/lib/logout";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { usePathname } from "next/navigation";
import { useRouter } from 'nextjs-toploader/app';
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type DBUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
  picture: string
};

type AuthFirebaseContextType = {
  firebaseUser: FirebaseUser | null;
  authData: DBUser | null;
  loading: boolean;
isAdmin : boolean
};

const AuthFirebaseContext = createContext<AuthFirebaseContextType>({
  firebaseUser: null,
  authData: null,
  loading: true,
isAdmin : false
});

export const AuthFirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [authData, setAuthData] = useState<DBUser | null>(null);
  const [user, setUser] = useState<DBUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      setLoading(true);
      setFirebaseUser(fbUser);

      try {
        if (!fbUser?.email) {
          setAuthData(null);

          if (!pathname.startsWith("/portal/auth")) {
            router.replace("/portal/auth");
          }
          return;
        }

        const res = await axios.get(`/userdetail?email=${fbUser.email}`);
        const role = res.data?.role
        if (res?.data?.status === 'inactive') {
          router.replace(`/portal/restrict`);
          return
        }

        if (!role) {
          await handleLogout(false)
          setAuthData(null)
          toast.error("User with role not found")
          return
        }
       
        setAuthData(res?.data)
      } catch (error) {
        setAuthData(null);
        signOut(auth)
        router.replace("/portal/auth");
      } finally {
        setLoading(false)
      }
    });

    return () => unsub()

  }, []);

  const isAdmin = user?.role === 'admin'

  return (
    <AuthFirebaseContext.Provider value={{ firebaseUser, authData, loading, isAdmin }}>
      {children}
    </AuthFirebaseContext.Provider>
  );
};

export const useAuthFirebase = () => useContext(AuthFirebaseContext);
