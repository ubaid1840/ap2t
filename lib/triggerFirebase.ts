import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";


export async function TriggerFirebase(id : string | number | null, sender : string | number | null = null) {
    if (id) {
        await setDoc(doc(db, "messages_meta", String(id)), {
            updated: serverTimestamp(),
        });
    }


    if (sender) {
        await setDoc(doc(db, "conversations_meta", String(sender)), {
            updated: serverTimestamp(),
        });
    }
}


export async function TriggerFirebaseForFine(id : string | number | null) {
    if (id) {
        await setDoc(doc(db, "fine_notification", id.toString()), {
            updated: serverTimestamp(),
        });
    }
}


export async function TriggerFirebaseApprovals(to : string) {
    
        await setDoc(doc(db, "frontdesk", to), {
            updated: serverTimestamp(),
        });
    
}

export async function TriggerFirebaseForNotifications(id : string | number | null) {
    if (id) {
        await setDoc(doc(db, "notifications", `not-${id.toString()}`), {
            updated: serverTimestamp(),
        });
    }
}
