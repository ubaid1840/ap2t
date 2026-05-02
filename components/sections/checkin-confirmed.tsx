'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, User, Calendar, Clock, CircleX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useKiosk } from '@/lib/kiosk-context'
import moment from 'moment'
import axios from '@/lib/axios'
import { Spinner } from '../ui/spinner'
import { useSafeEffect } from '@/hooks/use-safe-effect'

export default function CheckInConfirmedPage() {
  const router = useRouter()
  const { state, reset } = useKiosk()
  const { player, session } = state
  const [countdown, setCountdown] = useState(5)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useSafeEffect(() => {
    if (!player || !session) return

    handleBackendRequest()
  }, [player?.id, session?.id])


  const handleBackendRequest = async () => {
    setLoading(true)
    setError(false)

    try {
      await sendCheckInToBackend()
      startCountdown()
    } catch (error) {
      console.error('Check-in request failed', error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const startCountdown = () => {
    if (timerRef.current) return
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }


  const sendCheckInToBackend = async () => {
    const response = await axios.post(`/frontdesk/player/attendance`, {
      status: "present",
      session_id: session?.id,
      user_id: player?.id
    })

    return response.data
  }

  useEffect(() => {
    if (countdown === 0) {
      handleDone()
    }
  }, [countdown])


  const handleDone = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    reset()
    router.replace('/')
    setCountdown(5)
    setLoading(false)
    setError(false)
  }

  if (!player || !session) {
    return null
  }

  return (
    <div className="flex h-[calc(100dvh-160px)] items-center justify-center">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl rounded-xl border border-primary bg-card p-8">

          {/* ICON */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/20">
              {loading && <Spinner className='h-16 w-16 text-primary' />}
              {!loading && !error && <CheckCircle className="h-16 w-16 text-primary" />}
              {error && <CircleX className="h-16 w-16 text-destructive" />}
            </div>
          </div>

          {/* ---------------- LOADING STATE ---------------- */}
          {loading && (
            <div className="text-center">
              <h2 className="mb-2 text-3xl font-bold">Checking you in...</h2>
              <p className="text-muted-foreground">
                Please wait while we confirm your session.
              </p>
            </div>
          )}

          {/* ---------------- ERROR STATE ---------------- */}
          {error && (
            <div className="text-center">
              <h2 className="mb-2 text-3xl font-bold text-destructive">
                Check-in Failed
              </h2>

              <p className="mb-6 text-muted-foreground">
                We couldn't confirm your check-in. Please try again.
              </p>

              <Button onClick={handleBackendRequest}>
                Retry Check-in
              </Button>
            </div>
          )}

          {/* ---------------- SUCCESS STATE ---------------- */}
          {!loading && !error && (
            <>
              <h2 className="mb-2 text-center text-3xl font-bold text-foreground">
                Welcome, {player?.name}!
              </h2>

              <p className="mb-8 text-center text-foreground/60">
                You're checked in for{" "}
                <span className="text-primary">{session?.name}</span>
              </p>

              {/* SESSION INFO */}
              <div className="mb-6 flex items-center justify-between gap-6 rounded-lg bg-secondary p-4">

                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-success-text/32 bg-success-bg">
                    <User className="text-success-text" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Member Number</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-success-text/32 bg-success-bg">
                    <Calendar className="text-success-text" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Date</p>
                    <p className="font-semibold">
                      {session?.date && moment(session?.date).format("YYYY-MM-DD")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-success-text/32 bg-success-bg">
                    <Clock className="text-success-text" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Time</p>
                    <p className="font-semibold">
                      {session?.start_time} - {session?.end_time}
                    </p>
                  </div>
                </div>

              </div>

              {/* STATUS BUTTONS */}
              <div className="mb-8 flex justify-center gap-4">
                <Button className="w-50 rounded-full text-xs">
                  <CheckCircle />
                  Payment Confirmed
                </Button>

                <Button variant="secondary" className="w-50 rounded-full text-xs">
                  <CheckCircle />
                  Pre-Booked Session
                </Button>
              </div>

              {/* INSTRUCTION */}
              <div className="text-center">
                <h3 className="mb-2 text-lg font-semibold tracking-wide">
                  Please proceed to the field
                </h3>

                <p className="text-xs text-muted-foreground">
                  Your check-in has been confirmed and logged
                </p>
              </div>
            </>
          )}
        </div>

        {/* COUNTDOWN (only after success) */}
        {!loading && !error && (
          <p className="mt-6 text-sm text-foreground/40">
            This screen will automatically return to the main menu in {countdown} seconds
          </p>
        )}
      </div>
    </div>
  )
}
