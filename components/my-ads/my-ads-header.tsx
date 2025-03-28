"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface MyAdsHeaderProps {
  hasAds: boolean
}

export default function MyAdsHeader({ hasAds }: MyAdsHeaderProps) {
  const router = useRouter()

  if (!hasAds) {
    return null
  }

  return (
    <div className="mt-4 mb-6">
      <div className="container mx-auto">
        <Button
          onClick={() => router.push("/create-ad")}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6"
        >
          Create ad
        </Button>
      </div>
    </div>
  )
}

