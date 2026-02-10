import { signOut } from "firebase/auth";
import { auth } from "./firebase";


export async function handleLogout() {
    await signOut(auth)
}