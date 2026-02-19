import CampsAndClinicsDetail from "./page.client";


export default async function Page({params} : {params : {id : string}}){
  const {id} = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/camps-and-clinics/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch camps and clinics");
  }

  const data = await res.json();
    return (
        <CampsAndClinicsDetail data={data}/>
    )
}