"use client"

import { CardTitle } from "@/components/ui/card"
import { taskProgressData } from "./data"

export function TaskProgress() {
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
