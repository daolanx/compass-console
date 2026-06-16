import { Filter, PersonStanding, ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { tasks } from "./data"

const statusStyles: Record<string, string> = {
  Completed:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-950 dark:text-emerald-400",
  "In Progress":
    "bg-primary/10 text-primary ring-1 ring-inset ring-primary/20",
  Pending:
    "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950 dark:text-amber-400",
  Overdue:
    "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20 dark:bg-rose-950 dark:text-rose-400",
}

export function TasksTable() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <CardTitle className="text-xl">My Tasks</CardTitle>
        <Button size="sm" className="gap-2 md:hidden">
          <Plus />
          New Task
        </Button>
        <div className="hidden flex-wrap items-center gap-3 md:flex">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter />
            Status: All
            <ChevronDown />
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <PersonStanding />
            Assignee: All
            <ChevronDown />
          </Button>
          <Button size="sm" className="gap-2">
            <Plus />
            New Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Mobile: Simple List */}
        <div className="flex flex-col gap-3 md:hidden">
          {tasks.filter(t => t.status !== "Completed").map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/30"
            >
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-foreground">{task.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{task.category}</div>
              </div>
              <Badge
                variant="outline"
                className={`${statusStyles[task.status]} shrink-0 border-0 text-[10px] font-bold uppercase tracking-tight`}
              >
                {task.status}
              </Badge>
            </div>
          ))}
        </div>

        {/* Desktop: Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 pb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Task Name
                </th>
                <th className="px-4 pb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-4 pb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Created Date
                </th>
                <th className="px-4 pb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Duration
                </th>
                <th className="px-4 pb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Assignees
                </th>
                <th className="px-4 pb-3 text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tasks.map((task) => (
                <tr key={task.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">{task.name}</span>
                      <span className="mt-0.5 text-xs text-muted-foreground">
                        {task.category}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge
                      variant="outline"
                      className={`${statusStyles[task.status]} border-0 text-[11px] font-bold uppercase tracking-tight`}
                    >
                      {task.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-muted-foreground">{task.createdDate}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-muted-foreground">{task.duration}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex -space-x-1.5">
                      {task.assignees.map((assignee) => (
                        <Avatar
                          key={assignee.name}
                          className="size-7 border-2 border-card ring-1 ring-muted"
                        >
                          <AvatarImage src={assignee.avatar} />
                          <AvatarFallback>{assignee.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-sm font-bold text-primary hover:text-primary/80">
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
