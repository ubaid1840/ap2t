import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { exportToExcel } from "@/lib/functions";
import { toast } from "sonner";
import { ParentData } from "@/app/portal/admin/parents/page";


export default function ExportExcel({ header, data, fileName }: { header: string[], data: (string)[][], fileName?: string }) {

    const [loading, setLoading] = useState(false)
    async function handleExport() {
        setLoading(true)
        try {
            await exportToExcel(header, data, fileName)
        } catch (error: any) {
            toast.error(error?.message)
        } finally {
            setLoading(false)
        }

    }
    return (

        <Button disabled={loading} variant={"outline"} onClick={() => handleExport()}>
            {loading ? <Spinner className="text-white" /> : <Download />} Export
        </Button>

    )
}