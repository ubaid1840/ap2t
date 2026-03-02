import { useAuth } from "@/contexts/auth-context"
import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import { EncryptString } from "@/lib/functions"


export default function useSquareConnection( mode ?: string) {

    const { user } = useAuth()
    const [loading, setLoading] = useState(false)
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        if (user?.id) checkConnection()
    }, [user])

    async function checkConnection() {
        setLoading(true)
       
        try {
            await axios.get(`/square/check?mode=${mode}`)
            setConnected(true)
        } catch (error) {
            console.log(error)
            setConnected(false)
        } finally {
            setLoading(false)
        }
    }



    return { loading, connected, checkConnection }
}