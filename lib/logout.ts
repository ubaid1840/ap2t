import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { auth } from "./firebase";


export async function handleLogout() {
    await signOut(auth)
    toast.success("Logout successfull")
}