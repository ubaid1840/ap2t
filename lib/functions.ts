
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./firebase";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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

export function getYear(val: string | null | Date | undefined) {

  return val ? new Date().getFullYear() - new Date(val).getFullYear() : "N/A"
}



export async function GetProfileImage(imgLink : string | null) {
    if (!imgLink) return "";

    try {
        const url = await getDownloadURL(ref(storage, imgLink));
        return url;
    } catch (error) {
        console.error("Error fetching profile image:", error);
        return "";
    }
}


export const exportToExcel = async (
  headers : string[],
 data: (string)[][],
  fileName = "data.xlsx",
) => {
  if (!data || data.length === 0) {
    throw new Error("No data available to export");
  }

  const worksheetData = [headers];

  
   for (const row of data) {
      worksheetData.push(row);
  }



  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

 
  try {
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(excelBlob, fileName);
  } catch (error) {
    console.error("Failed to generate or download Excel:", error);
    throw new Error("Failed to generate Excel file");
  }
};
