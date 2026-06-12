"use client"

import { CheckCircle2, Clock, ListTodo, AlertTriangle, Users, Palette, Code2 } from "lucide-react"
import { taskStatusData, teamWorkloadData } from "./data"

const statusCards = [
  {
    label: "Completed",
    value: taskStatusData.completed,
    total: taskStatusData.total,
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    label: "In Progress",
    value: taskStatusData.inProgress,
    total: taskStatusData.total,
    icon: Clock,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    label: "Pending",
    value: taskStatusData.pending,
    total: taskStatusData.total,
    icon: ListTodo,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    label: "Overdue",
    value: taskStatusData.overdue,
    total: taskStatusData.total,
    icon: AlertTriangle,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
]

const teamIcons = [Palette, Code2, Users]

export function SummaryCards() {
  return (
    <div className="space-y-4">
      {/* Task Status */}
      <div className="grid grid-cols-2 gap-3">
        {statusCards.map((card) => (
          <div
            key={card.label}
            className="bg-card border border-border rounded-xl p-4 shadow-sm flex items-center gap-3"
          >
            <div className={`${card.bg} p-2 rounded-lg`}>
              <card.icon className={`w-4 h-4 ${card.color}`} />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Team Workload */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Team Workload</h3>
          <span className="text-xs text-muted-foreground">{teamWorkloadData.totalMembers} members</span>
        </div>
        {teamWorkloadData.teams.map((team, i) => {
          const Icon = teamIcons[i] || Users
          return (
            <div key={team.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-foreground">{team.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{team.percentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full bg-primary transition-all"
                  style={{ width: `${team.percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
