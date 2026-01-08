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

