"use client"

import MainPlayerPage from "@/components/players/main-player-page"
import { useParams } from "next/navigation"
import { useAuth } from "../contexts/auth-context"


export default function Page() {
     const {user} = useAuth()

    return (
        <MainPlayerPage id={user?.id}/>
    )
}







