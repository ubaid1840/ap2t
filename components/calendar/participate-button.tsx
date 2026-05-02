import { useState } from "react";
import axios from "@/lib/axios";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const ParticipateButton = ({ player_id, session_id, onSuccess }: { player_id: string | null | undefined, session_id: string, onSuccess: () => Promise<void> }) => {
    const [loading, setLoading] = useState(false)

    async function handleEnroll() {

        try {
            setLoading(true)
            await axios.post(`/admin/sessions/${session_id}/participants`, {
                player_id: player_id,
            });
            await onSuccess();

        } finally {
            setLoading(false);
        }
    }
    return (
        <Button onClick={handleEnroll} disabled={loading}>{loading && <Spinner className='text-black' />}Participate</Button>
    )
}

export default ParticipateButton