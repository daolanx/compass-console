"use client"

import ReactECharts from "echarts-for-react"
import { useMemo } from "react"
import { taskStatusData } from "./data"

export function TaskStatusChart() {
  const { total, completed, inProgress, pending, overdue } = taskStatusData

  const option = useMemo(() => ({
    tooltip: {
      trigger: "item" as const,
      formatter: "{b}: {c} ({d}%)",
      backgroundColor: "hsl(0 0% 100%)",
      borderColor: "hsl(214 32% 91%)",
      textStyle: { color: "hsl(222 47% 11%)" },
    },
    legend: {
      show: false,
    },
    graphic: [
      {
        type: "text" as const,
        left: "center",
        top: "42%",
        style: {
          text: `${total}`,
          textAlign: "center" as const,
          fill: "hsl(222 47% 11%)",
          fontSize: 22,
          fontWeight: 700,
        },
      },
      {
        type: "text" as const,
        left: "center",
        top: "54%",
        style: {
          text: "TOTAL TASKS",
          textAlign: "center" as const,
          fill: "hsl(215 16% 47%)",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 1,
        },
      },
    ],
    series: [
      {
        type: "pie" as const,
        radius: ["55%", "80%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: false,
        padAngle: 2,
        itemStyle: {
          borderRadius: 4,
        },
        label: {
          show: false,
        },
        emphasis: {
          disabled: true,
        },
        data: [
          { value: completed, name: "Completed", itemStyle: { color: "hsl(239 84% 67%)" } },
          { value: inProgress, name: "In Progress", itemStyle: { color: "hsl(217 91% 60%)" } },
          { value: pending, name: "Pending", itemStyle: { color: "hsl(38 92% 50%)" } },
          { value: overdue, name: "Overdue", itemStyle: { color: "hsl(0 84% 60%)" } },
        ],
      },
    ],
  }), [total, completed, inProgress, pending, overdue])

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <h3 className="w-full text-base font-semibold text-foreground mb-4 text-center">
        Task Status Distribution
      </h3>
      <ReactECharts
        option={option}
        style={{ height: 220, width: "100%" }}
        opts={{ renderer: "canvas" }}
        notMerge={true}
        lazyUpdate={true}
      />
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2 text-sm">
        {[
          { name: "Completed", color: "bg-chart-1", value: completed },
          { name: "In Progress", color: "bg-chart-2", value: inProgress },
          { name: "Pending", color: "bg-chart-3", value: pending },
          { name: "Overdue", color: "bg-chart-4", value: overdue },
        ].map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
            <span className="text-muted-foreground">
              {item.name} ({Math.round((item.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
