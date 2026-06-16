"use client"

import { CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { teamMembersData } from "./data"

export function TeamWorkload() {
  return (
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
  )
}
