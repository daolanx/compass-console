"use client"

import { ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { taskProgressData, teamMembersData } from "./data"

export function SidebarStats() {
  const circumference = 2 * Math.PI * 15.915
  const completedArc = (taskProgressData.total / taskProgressData.total) * circumference

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm p-6 space-y-6">
      {/* Task Progress */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-foreground">Task Progress</h3>
          <button className="flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">
            All Projects
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-6">
          {/* Donut Chart */}
          <div className="relative w-40 h-40 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
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
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Active</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-2">
            {taskProgressData.items.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-xs text-muted-foreground">
                  {item.name} ({item.count})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-border" />

      {/* Team Workload */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-semibold text-foreground">Team Workload</h3>
        </div>

        <div className="space-y-3">
          {teamMembersData.map((member) => (
            <div key={member.name} className="flex items-center gap-3">
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground w-16 shrink-0">{member.name}</span>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className={`${member.color} h-2 rounded-full transition-all`}
                  style={{ width: `${(member.tasks / member.total) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground shrink-0">
                {member.tasks}/{member.total}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
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
