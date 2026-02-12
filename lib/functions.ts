export function splitFullName(fullName: string | null) {
  if (!fullName) return { first_name: "", last_name: "" }
  const parts = fullName.trim().split(/\s+/);

  const last_name = parts.pop() || "";
  const first_name = parts.join(" ") || "";

  return { first_name, last_name };
}

export function joinNames(data: (string | null | undefined)[]): string {
  return data
    .filter(Boolean)         // remove null, undefined, empty string
    .map((s) => s!.trim())  // trim each string (s! because filtered)
    .filter(Boolean)        // remove strings that were only spaces
    .join(" ");             // join with space
}

export function getYear(val: string) {

  return val ? new Date().getFullYear() - new Date(val).getFullYear() : "N/A"
}

