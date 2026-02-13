import { useEffect, useState } from "react";
import getInitials from "./parents/get-initials";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { GetProfileImage } from "@/lib/functions";
import { Spinner } from "./ui/spinner";


const RenderAvatar = ({ img = "", fallback = "NA", className = "", fallbackClassName = "" } : {img : string | undefined | null, fallback : string, className ?: string, fallbackClassName ?:string}) => {

    const [loading, setLoading] = useState(false)
    const [localImage, setLocalImage] = useState("")

    useEffect(() => {
        async function fetchImage() {
            setLoading(true)
            const imgResult = await GetProfileImage(img);
            setLocalImage(imgResult);
            setLoading(false)
        }

        if (img) {
            fetchImage();
        }
    }, [img]);


    return (
        loading ? <Spinner /> :
            <Avatar className={`h-12 w-12 ${className}`}>
                <AvatarImage src={localImage} />
                <AvatarFallback className={`bg-primary text-black ${fallbackClassName}`}>
                    {getInitials(fallback)}
                </AvatarFallback>
            </Avatar>
    )
}

export default RenderAvatar