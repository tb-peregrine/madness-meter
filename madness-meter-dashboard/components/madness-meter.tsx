"use client"

import { cn } from "@/lib/utils"

interface MadnessMeterProps {
  value: number
  className?: string
}

export function MadnessMeter({ value, className }: MadnessMeterProps) {
  // Calculate the height of the filled portion
  const filledHeight = `${value}%`

  // Determine the color based on the value
  const getColor = (value: number) => {
    if (value < 30) return "bg-green-500"
    if (value < 60) return "bg-yellow-500"
    if (value < 80) return "bg-orange-500"
    return "bg-red-500"
  }

  return (
    <div className={cn("relative w-16 h-64 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden", className)}>
      {/* Tick marks */}
      <div className="absolute inset-0 flex flex-col justify-between py-2 px-0">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className="flex items-center w-full">
            <div className="w-3 h-0.5 bg-gray-400 dark:bg-gray-600"></div>
            <div className="ml-1 text-xs text-gray-500 dark:text-gray-400">{100 - i * 10}</div>
          </div>
        ))}
      </div>

      {/* Filled portion */}
      <div
        className={cn("absolute bottom-0 left-0 right-0 transition-height duration-500 ease-in-out", getColor(value))}
        style={{ height: filledHeight }}
      >
        {/* Animated bubbles for effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/20 rounded-full animate-bubble"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none rounded-full" />
    </div>
  )
}

