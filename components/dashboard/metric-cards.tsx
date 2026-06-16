"use client"

import { TrendingUp, Minus } from "lucide-react"
import { metricCards } from "./data"
import { Card, CardContent } from "@/components/ui/card"

export function MetricCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {metricCards.map((card) => (
        <Card key={card.label}>
          <CardContent className="flex flex-col justify-between p-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {card.label}
              </span>
              {card.trend !== null ? (
                <span className="flex items-center gap-0.5 text-xs font-bold text-primary">
                  <TrendingUp />
                  {card.trendLabel}
                </span>
              ) : (
                <span className="flex items-center gap-0.5 text-xs font-bold text-muted-foreground">
                  <Minus />
                  {card.trendLabel}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">{card.value}</div>
              <div className="h-10 w-20">
                <svg className="h-full w-full" viewBox="0 0 80 40">
                  <path
                    d={getTrendPath(card.trend)}
                    fill="none"
                    stroke={card.trend !== null ? "hsl(160 84% 39%)" : "hsl(215 16% 47%)"}
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function getTrendPath(trend: number | null): string {
  if (trend === null) {
    return "M0 25 Q20 23 40 25 T80 24"
  }
  if (trend > 0) {
    return "M0 35 Q10 32 20 30 T40 25 T60 15 T80 5"
  }
  return "M0 5 Q10 8 20 10 T40 15 T60 25 T80 35"
}
