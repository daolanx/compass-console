"use client"

import { TrendingUp, Minus } from "lucide-react"
import { metricCards } from "./data"

export function MetricCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metricCards.map((card) => (
        <div
          key={card.label}
          className="bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {card.label}
            </span>
            {card.trend !== null ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                {card.trendLabel}
              </span>
            ) : (
              <span className="text-xs font-bold text-muted-foreground flex items-center gap-0.5">
                <Minus className="w-3.5 h-3.5" />
                {card.trendLabel}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-foreground">{card.value}</div>
            <div className="w-20 h-10">
              <svg className="w-full h-full" viewBox="0 0 80 40">
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
        </div>
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
