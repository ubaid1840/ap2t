"use client"

import MainPlayerPage from "@/components/players/main-player-page"
import { useAuth } from "@/contexts/auth-context"



export default function Page() {
     const {user} = useAuth()
    console.log(user?.id)
    return (
        <MainPlayerPage id={Number(5)}/>
    )
}







