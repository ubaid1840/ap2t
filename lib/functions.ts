import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./firebase";

export function joinNames(data: (string | null | undefined)[]): string {
  return data
    .filter(Boolean)
    .map((s) => s!.trim())
    .filter(Boolean)
    .join(" ");
}

export default function getInitials(name: string): string {
    if (!name) return "";

    const words = name.trim().split(/\s+/); // split by spaces

    if (words.length === 1) {
        // single word → first 2 letters
        return words[0].substring(0, 2).toUpperCase();
    } else {
        // multiple words → first letter of first two words
        return (words[0][0] + words[1][0]).toUpperCase();
    }
}

export async function GetProfileImage(imgLink: string | null) {
  if (!imgLink) return "";

  try {
    const url = await getDownloadURL(ref(storage, imgLink));
    return url;
  } catch (error) {
    return "";
  }
}
