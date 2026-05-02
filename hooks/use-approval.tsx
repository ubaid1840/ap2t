


import axios from '@/lib/axios';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';


export function useApproval(id: number | undefined, session_id: number | undefined) {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)


  async function fetchData() {
     if (!id || !session_id) return
    setLoading(true)

    try {
      const response = await axios.get(`/frontdesk/actions?user_id=${id}&session_id=${session_id}`)
      if (response.data?.status === 'accepted') {
        setLoading(false)
      }
      if (response.data?.status === 'rejected') {
        setLoading(false)
        setError(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!id || !session_id) return

    fetchData();

    const unsub = onSnapshot(
      doc(db, 'frontdesk', "user"),
      () => fetchData()
    );

    return () => {
      unsub()
      setLoading(true)
    }

  }, [id, session_id]);

  return { loading, error };
}
