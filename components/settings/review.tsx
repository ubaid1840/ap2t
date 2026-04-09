import { Link } from "lucide-react";
import { TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import axios from "@/lib/axios";
import { useAuth } from "@/contexts/auth-context";


export default function () {

    const [link, setLink] = useState("")
    const [linkLoading, setLinkLoading] = useState(false)
    const { user } = useAuth()

    const generateLink = async () => {
        if (!user?.id) return
        try {
            setLinkLoading(true)
            const res = await axios.post("/testimonials/generate-link", {
                user_id: user?.id
            })
            const link = res.data.link
            setLink(link)
        } finally {
            setLinkLoading(false)
        }
    }

    return (
        <TabsContent value="Review" className="space-y-4">
            <div className="flex justify-center w-full">
                <div className="flex items-center gap-2">
                    <Link />
                    <Input
                        className="w-2xl h-10"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    <Button onClick={generateLink}>{linkLoading && <Spinner className=" text-black h-5 w-5" />}Generate Link</Button>
                </div>
            </div>
        </TabsContent>
    )
}