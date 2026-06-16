"use client"

import { useState } from "react"
import { CardTitle } from "@/components/ui/card"
import { taskProgressData } from "./data"
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart"
import { Cell, Pie, PieChart, Tooltip } from "recharts"

const chartConfig = {
  Overdue: { label: "Overdue", color: "hsl(0 84% 60%)" },
  "In Progress": { label: "In Progress", color: "hsl(24 95% 53%)" },
  Review: { label: "Review", color: "hsl(38 92% 50%)" },
  Planned: { label: "Planned", color: "hsl(239 84% 67%)" },
  Backlog: { label: "Backlog", color: "hsl(215 16% 47%)" },
} satisfies ChartConfig

const pieData = taskProgressData.items.map((item) => ({
  name: item.name,
  value: item.count,
}))

export function TaskProgress() {
  const [hidden, setHidden] = useState<Set<string>>(new Set())

  const toggle = (name: string) => {
    setHidden((prev) => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }

  const visibleData = pieData.filter((d) => !hidden.has(d.name))
  const visibleTotal = visibleData.reduce((acc, d) => acc + d.value, 0)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <CardTitle className="text-base">Task Progress</CardTitle>
        <button className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary">
          All Projects
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative size-40 shrink-0">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <PieChart>
              <Tooltip
                formatter={(value, name) => [`${value}`, name]}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Pie
                data={visibleData}
                dataKey="value"
                nameKey="name"
                innerRadius={40}
                outerRadius={60}
                strokeWidth={0}
                isAnimationActive={false}
              >
                {visibleData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={chartConfig[entry.name as keyof typeof chartConfig]?.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-bold text-foreground">{visibleTotal}</span>
            <span className="text-[10px] font-bold uppercase text-muted-foreground">Active</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {taskProgressData.items.map((item) => {
            const isHidden = hidden.has(item.name)
            const color = chartConfig[item.name as keyof typeof chartConfig]?.color
            return (
              <button
                key={item.name}
                onClick={() => toggle(item.name)}
                className={`flex items-center gap-2 rounded-md px-2 py-1 text-left transition-opacity hover:bg-muted/50 ${
                  isHidden ? "opacity-35" : "opacity-100"
                }`}
              >
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-muted-foreground">
                  {item.name} ({item.count})
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
