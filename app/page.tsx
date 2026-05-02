'use client'

import { Button } from '@/components/ui/button'
import { useKiosk } from '@/lib/kiosk-context'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function WelcomePage() {
  const router = useRouter()
  const { reset } = useKiosk()



  const handleStartCheckIn = () => {
    reset()
    router.push('/kiosk')
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        <Image alt="logo" src="/logo.png" className="rounded-full" width={200} height={100} />

        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-foreground md:text-6xl">Welcome</h1>
          <p className="text-lg text-foreground/70">Tap below to check in</p>
        </div>


        <Button
          onClick={handleStartCheckIn}
          className="mt-4 h-12 w-80 rounded-full bg-primary px-12 text-lg font-semibold text-primary-foreground transition-all"
        >
          Start Check-In
        </Button>

      </div>

      <div className="absolute bottom-8 z-10 text-center text-sm text-foreground/50">
        Need help? Contact front desk
      </div>
    </div>
  )
}
