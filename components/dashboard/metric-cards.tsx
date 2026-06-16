"use client"

import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react"
import { metricCards, type MetricCardItem } from "./data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart"
import { Area, AreaChart } from "recharts"

const cardColors: Record<string, { stroke: string; fill: string }> = {
  DAU: { stroke: "#22c55e", fill: "#22c55e" },
  MRR: { stroke: "#6366f1", fill: "#6366f1" },
  "New Signups": { stroke: "#f97316", fill: "#f97316" },
  "Conversion Rate": { stroke: "#ec4899", fill: "#ec4899" },
}

function calcTrend(data: { value: number }[]): number | null {
  if (data.length < 2) return null
  const half = Math.floor(data.length / 2)
  const recent = data.slice(half)
  const prev = data.slice(0, half)
  const recentAvg = recent.reduce((a, b) => a + b.value, 0) / recent.length
  const prevAvg = prev.reduce((a, b) => a + b.value, 0) / prev.length
  if (prevAvg === 0) return null
  return ((recentAvg - prevAvg) / prevAvg) * 100
}

function getCompareLabel(compare: MetricCardItem["trendCompare"]): string {
  return compare === "lastWeek" ? "vs last week" : "vs last month"
}

function getChartConfig(label: string): ChartConfig {
  const color = cardColors[label]?.stroke ?? "hsl(215 16% 47%)"
  return {
    value: { label: "Value", color },
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
  const chartConfig = getChartConfig(card.label)
  const trend = calcTrend(card.data)
  const colors = cardColors[card.label]

  return (
    <Card className="py-2">
      <CardHeader className="flex flex-row items-center justify-between p-3 pb-0">
        <CardTitle className="text-sm font-bold text-muted-foreground">
          {card.label}
        </CardTitle>
        {trend !== null ? (
          <span
            className={`flex items-center gap-0.5 text-xs font-semibold ${
              trend > 0
                ? "text-emerald-600 dark:text-emerald-400"
                : trend < 0
                  ? "text-rose-600 dark:text-rose-400"
                  : "text-muted-foreground"
            }`}
          >
            {trend > 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : trend < 0 ? (
              <TrendingDown className="h-3 w-3" />
            ) : (
              <Minus className="h-3 w-3" />
            )}
            {trend > 0 ? "+" : ""}
            {trend.toFixed(1)}%
            <span className="relative group">
              <Info className="h-3 w-3 cursor-help text-muted-foreground" />
              <span className="pointer-events-none absolute -top-8 right-0 z-50 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                {getCompareLabel(card.trendCompare)}
              </span>
            </span>
          </span>
        ) : (
          <span className="flex items-center gap-0.5 text-xs font-semibold text-muted-foreground">
            <Minus className="h-3 w-3" />
            —
          </span>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-1 p-3 pt-0">
        <div className="text-2xl font-medium tracking-tight text-foreground">
          {card.value}
        </div>
        <ChartContainer config={chartConfig} className="h-8 w-full">
          <AreaChart
            data={card.data}
            margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`fill-${card.label.replace(/\s+/g, "-")}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.fill} stopOpacity={0.3} />
                <stop offset="95%" stopColor={colors.fill} stopOpacity={0} />
              </linearGradient>
            </defs>
            <ChartTooltip
              cursor={false}
              content={
                <SparklineTooltip label={card.label} />
              }
            />
            <Area
              type="monotone"
              dataKey="value"
              fill={`url(#fill-${card.label.replace(/\s+/g, "-")})`}
              stroke={colors.stroke}
              strokeWidth={1.5}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function SparklineTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ payload: { date: string; value: number } }>
  label: string
}) {
  if (!active || !payload?.length) return null
  const item = payload[0].payload
  return (
    <div className="rounded-lg border border-border bg-background px-4 py-3 text-xs shadow-xl">
      <div className="font-medium text-foreground">{item.date}</div>
      <div className="text-muted-foreground">
        {label}: <span className="font-mono font-medium text-foreground">{item.value}</span>
      </div>
    </div>
  )
}
