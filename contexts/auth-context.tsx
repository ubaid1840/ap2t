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
import { useAuthFirebase } from "./auth-firebase-context";

type DBUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
  picture: string
};

type AuthContextType = {
 
  user: DBUser | null;
  loading: boolean;
isAdmin : boolean
};

const AuthContext = createContext<AuthContextType>({
 
  user: null,
  loading: true,
isAdmin : false
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
 
  const [user, setUser] = useState<DBUser | null>(null);
const {authData, loading, isAdmin} = useAuthFirebase()
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    
    if(authData?.id){
       const correctedRoute = `/portal/${authData?.role}`
        if (!pathname.startsWith(correctedRoute)) {
          router.replace(correctedRoute);
          return
        }
        setUser(authData)
    } 
  }, [authData, pathname]);



  return (
    <AuthContext.Provider value={{  user, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
