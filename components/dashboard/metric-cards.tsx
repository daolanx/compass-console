"use client"

import { TrendingUp, Minus } from "lucide-react"
import { metricCards, type MetricCardItem } from "./data"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Line, LineChart } from "recharts"

const sparklineData: Record<string, { value: number }[]> = {
  DAU: [
    { value: 980 }, { value: 1050 }, { value: 1100 }, { value: 1020 },
    { value: 1150 }, { value: 1200 }, { value: 1180 }, { value: 1250 },
    { value: 1284 },
  ],
  MAU: [
    { value: 7200 }, { value: 7500 }, { value: 7800 }, { value: 8000 },
    { value: 7900 }, { value: 8100 }, { value: 8300 }, { value: 8432 },
  ],
  "New Signups": [
    { value: 95 }, { value: 110 }, { value: 105 }, { value: 120 },
    { value: 130 }, { value: 125 }, { value: 138 }, { value: 142 },
  ],
  "Conversion Rate": [
    { value: 2.1 }, { value: 2.3 }, { value: 2.5 }, { value: 2.8 },
    { value: 2.6 }, { value: 2.9 }, { value: 3.0 }, { value: 3.2 },
  ],
}

function getChartConfig(trend: number | null): ChartConfig {
  return {
    value: {
      label: "Value",
      color: trend !== null
        ? "hsl(var(--chart-2))"
        : "hsl(var(--muted-foreground))",
    },
  }
}

export function MetricCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {metricCards.map((card) => (
        <MetricCard key={card.label} card={card} />
      ))}
    </div>
  )
}

function MetricCard({ card }: { card: MetricCardItem }) {
  const chartConfig = getChartConfig(card.trend)
  const data = sparklineData[card.label] ?? []

  return (
    <Card>
      <CardContent className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {card.label}
          </span>
          {card.trend !== null ? (
            <span className="flex items-center gap-0.5 text-xs font-semibold text-primary">
              <TrendingUp className="h-3 w-3" />
              {card.trendLabel}
            </span>
          ) : (
            <span className="flex items-center gap-0.5 text-xs font-semibold text-muted-foreground">
              <Minus className="h-3 w-3" />
              {card.trendLabel}
            </span>
          )}
        </div>
        <div className="text-2xl font-bold tracking-tight text-foreground">
          {card.value}
        </div>
        <ChartContainer config={chartConfig} className="h-10 w-full">
          <LineChart
            data={data}
            margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-value)"
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
