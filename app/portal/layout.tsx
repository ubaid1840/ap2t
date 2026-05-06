import { ReactNode } from "react";
import { AuthProvider } from "../../contexts/auth-context";
import { AuthFirebaseProvider } from "@/contexts/auth-firebase-context";


export default function PortalLayout({ children }: { children: ReactNode }) {

    return (
        <AuthFirebaseProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </AuthFirebaseProvider>
    )
}