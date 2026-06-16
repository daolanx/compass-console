import { Filter, PersonStanding, ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { tasks, type Priority } from "./data"

const priorityStyles: Record<Priority, string> = {
  Urgent: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20 dark:bg-rose-950 dark:text-rose-400",
  High: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-950 dark:text-amber-400",
  Medium: "bg-primary/10 text-primary ring-1 ring-inset ring-primary/20",
  Low: "bg-muted text-muted-foreground ring-1 ring-inset ring-border",
}

const inProgressTasks = tasks.filter((t) => t.status !== "Completed")

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
          {inProgressTasks.map((task) => (
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
                className={`${priorityStyles[task.priority]} shrink-0 border-0 text-[10px] font-bold uppercase tracking-tight`}
              >
                {task.priority}
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
                  Milestone
                </th>
                <th className="px-4 pb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Priority
                </th>
               
                <th className="px-4 pb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {inProgressTasks.map((task) => (
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
                    <span className="text-sm text-muted-foreground">{task.milestone}</span>
                  </td>
                           <td className="px-4 py-4">
                    <Badge
                      variant="outline"
                      className={`${priorityStyles[task.priority]} border-0 text-[11px] font-bold uppercase tracking-tight`}
                    >
                      {task.priority}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-muted-foreground">{task.duration}</span>
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
