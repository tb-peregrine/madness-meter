"use client"

import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"

import { MadnessMeter } from "@/components/madness-meter"
import { MadnessChart } from "@/components/madness-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCurrentMadness, getMadnessOverTime } from "@/lib/api"

export default function Home() {
  const [madnessLevel, setMadnessLevel] = useState(0)
  const [historicalData, setHistoricalData] = useState<{ date: string; level: number }[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null)
        const [current, historical] = await Promise.all([
          getCurrentMadness(),
          getMadnessOverTime()
        ])
        setMadnessLevel(current)
        setHistoricalData(historical)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Poll for updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        setError(null)
        const [current, historical] = await Promise.all([
          getCurrentMadness(),
          getMadnessOverTime()
        ])
        setMadnessLevel(current)
        setHistoricalData(historical)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch data')
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-blue-50 to-orange-50 dark:from-blue-950 dark:to-orange-950">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Loading...</h1>
          <p className="text-muted-foreground">Fetching March Madness data</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-b from-blue-50 to-orange-50 dark:from-blue-950 dark:to-orange-950">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-red-500">Error</h1>
          <p className="text-muted-foreground mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 bg-gradient-to-b from-blue-50 to-orange-50 dark:from-blue-950 dark:to-orange-950">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight">March Madness Meter</h1>
          <p className="text-muted-foreground">Track the excitement level of the tournament</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <CardTitle>Current Madness</CardTitle>
              <CardDescription>Live excitement level</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <MadnessMeter value={madnessLevel} />
              <div className="mt-4 text-center">
                <div className="text-2xl font-bold flex items-center justify-center gap-2">
                  {madnessLevel}%{madnessLevel > 70 && <ChevronUp className="text-red-500" />}
                </div>
                <div className="text-sm text-muted-foreground">
                  {madnessLevel < 30
                    ? "Calm"
                    : madnessLevel < 60
                      ? "Exciting"
                      : madnessLevel < 80
                        ? "Intense"
                        : "MADNESS!"}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Madness Trend</CardTitle>
              <CardDescription>Historical excitement levels</CardDescription>
            </CardHeader>
            <CardContent>
              <MadnessChart data={historicalData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

