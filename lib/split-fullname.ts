export function splitFullName(fullName: string) {
  const parts = fullName.trim().split(" ");
  const first_name = parts.shift() || "";
  const last_name = parts.join(" ") || "";
  return { first_name, last_name };
}