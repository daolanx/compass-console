"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { TaskProgress } from "./task-progress"
import { TeamWorkload } from "./team-workload"

export function SidebarStats() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-6 p-6">
        <TaskProgress />
        <Separator />
        <TeamWorkload />
      </CardContent>
    </Card>
  )
}
