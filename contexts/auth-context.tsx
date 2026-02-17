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
import { admin_nav_items, parent_nav_items, player_nav_items } from "@/lib/constants";

type DBUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
  picture : string
};

type AuthContextType = {
  firebaseUser: FirebaseUser | null;
  user: DBUser | null;
  loading: boolean;
  nav_items : any[]
};

const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  user: null,
  loading: true,
  nav_items : []
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<DBUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [nav_items, setNav_items] = useState<any[]>([])
  const pathname = usePathname();

  useEffect(() => {
    onAuthStateChanged(auth, async (fbUser) => {
      setLoading(true);
      setFirebaseUser(fbUser);
      if (fbUser?.email) {
        try {
          const res = await axios.get(`/userdetail?email=${fbUser.email}`);
          setUser(res.data);
          if(res.data.role === 'admin'){
            setNav_items([...admin_nav_items])
          }

          if(res.data.role === 'paremt'){
            setNav_items([...parent_nav_items])
          }

          if(res.data.role === 'player'){
            setNav_items([...player_nav_items])
          }

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
        router.replace("/portal/auth");
      }
      setLoading(false);
    });

  }, []);

  return (
    <AuthContext.Provider value={{ firebaseUser, user, loading, nav_items }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
