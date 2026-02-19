import CampsAndClinics from "./page.client";


export default async function Page(){

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/camps-and-clinics`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch camps and clinics");
  }

  const data = await res.json();
    return (
        <CampsAndClinics data={data}/>
    )
}