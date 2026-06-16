"use client"

import { ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { taskProgressData, teamMembersData } from "./data"

export function SidebarStats() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-6 p-6">
        {/* Task Progress */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <CardTitle className="text-base">Task Progress</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1 text-xs font-semibold text-muted-foreground hover:text-primary">
              All Projects
              <ChevronDown />
            </Button>
          </div>

          <div className="flex items-center gap-6">
            {/* Donut Chart */}
            <div className="relative size-40 shrink-0">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  fill="transparent"
                  r="15.915"
                  stroke="hsl(214 32% 91%)"
                  strokeWidth="3"
                />
                {taskProgressData.items.map((item, i) => {
                  const offset = taskProgressData.items
                    .slice(0, i)
                    .reduce((acc, curr) => acc + (curr.count / taskProgressData.total) * 100, 0)
                  return (
                    <circle
                      key={item.name}
                      cx="18"
                      cy="18"
                      fill="transparent"
                      r="15.915"
                      stroke={`var(--${item.name.toLowerCase().replace(/\s+/g, "-")}-color, ${getColor(item.color)})`}
                      strokeWidth="3"
                      strokeDasharray={`${(item.count / taskProgressData.total) * 100} ${100 - (item.count / taskProgressData.total) * 100}`}
                      strokeDashoffset={`${-offset}`}
                    />
                  )
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-bold text-foreground">{taskProgressData.total}</span>
                <span className="text-[10px] font-bold uppercase text-muted-foreground">Active</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-2">
              {taskProgressData.items.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className={`size-2 rounded-full ${item.color}`} />
                  <span className="text-xs text-muted-foreground">
                    {item.name} ({item.count})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* Team Workload */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <CardTitle className="text-base">Team Workload</CardTitle>
          </div>

          <div className="flex flex-col gap-3">
            {teamMembersData.map((member) => (
              <div key={member.name} className="flex items-center gap-3">
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
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function getColor(tailwindClass: string): string {
  const colorMap: Record<string, string> = {
    "bg-rose-500": "hsl(0 84% 60%)",
    "bg-orange-500": "hsl(24 95% 53%)",
    "bg-amber-500": "hsl(38 92% 50%)",
    "bg-primary": "hsl(239 84% 67%)",
    "bg-muted-foreground/40": "hsl(215 16% 47%)",
  }
  return colorMap[tailwindClass] || "hsl(0 0% 50%)"
}
