import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "sonner";


export async function handleLogout() {
    await signOut(auth)
    toast.success("Logout successfull")
}