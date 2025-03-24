"use client"

import type React from "react"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface MadnessChartProps {
  data: { date: string; level: number }[]
}

export function MadnessChart({ data }: MadnessChartProps) {
  return (
    <ChartContainer
      config={{
        madness: {
          label: "Madness Level",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data.map((item) => ({ date: item.date, madness: item.level }))}
          margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
        >
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            minTickGap={30}
            tickFormatter={(value) => value}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip content={<ChartTooltipContent formatValue={(value) => `${value}%`} />} />
          <Line
            type="monotone"
            dataKey="madness"
            strokeWidth={2}
            activeDot={{ r: 6, style: { fill: "var(--color-madness)", opacity: 0.8 } }}
            style={
              {
                stroke: "var(--color-madness)",
                "--color-madness": "hsl(var(--chart-1))",
              } as React.CSSProperties
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

