"use client"

import { useState } from "react"
import { ChevronDown, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { taskProgressData, teamMembersData } from "./data"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Cell, Pie, PieChart } from "recharts"

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
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const visibleData = pieData.filter((d) => !hidden.has(d.name))
  const visibleTotal = visibleData.reduce((acc, d) => acc + d.value, 0)

  return (
    <Card className="py-4">
      <CardHeader className="flex flex-row justify-between p-4 pb-2">
        <CardTitle className="text-base">Task Progress</CardTitle>
        <button className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary">
          All Projects
          <ChevronDown className="size-4" />
        </button>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 p-4 pt-0">
        {/* Pie Chart + Legend */}
        <div className="flex items-center justify-center gap-6">
          <div className="relative size-40 shrink-0">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
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

        {/* Team Workload */}
        <Separator />
        <div className="flex flex-col gap-1 w-full">
          {teamMembersData.map((member) => (
            <button
              key={member.name}
              className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-muted/50"
              onClick={() => {}}
            >
              <Avatar className="size-8 shrink-0">
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <span className="w-16 shrink-0 text-sm font-medium text-foreground">{member.name}</span>
              <div className="h-2 flex-1 rounded-full bg-muted">
                <div
                  className={`${member.color} h-2 rounded-full transition-all`}
                  style={{ width: `${(member.tasks / member.total) * 100}%` }}
                />
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {member.tasks}/{member.total}
              </span>
           
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
