"use client"

import ReactECharts from "echarts-for-react"
import { useMemo } from "react"
import { teamWorkloadData } from "./data"

export function TeamWorkloadChart() {
  const { totalMembers, teams } = teamWorkloadData

  const chartColors = [
    "hsl(239 84% 67%)",
    "hsl(217 91% 60%)",
    "hsl(160 84% 39%)",
  ]

  const option = useMemo(() => ({
    tooltip: {
      trigger: "item" as const,
      formatter: "{b}: {d}%",
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
          text: `${totalMembers}`,
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
          text: "ACTIVE MEMBERS",
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
        data: teams.map((team, i) => ({
          value: team.percentage,
          name: team.name,
          itemStyle: { color: chartColors[i] },
        })),
      },
    ],
  }), [totalMembers, teams, chartColors])

  return (
    <div className="p-6 flex flex-col items-center justify-center">
      <h3 className="w-full text-base font-semibold text-foreground mb-4 text-center">
        Team Workload Distribution
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
        {teams.map((team, i) => (
          <div key={team.name} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: chartColors[i] }}
            />
            <span className="text-muted-foreground">{team.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
