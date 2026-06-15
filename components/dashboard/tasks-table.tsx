import { Filter, PersonStanding, ChevronDown, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
    <div className="bg-card border border-border rounded-xl shadow-sm p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h2 className="text-xl font-bold text-foreground">My Tasks</h2>
        <Button size="sm" className="gap-2 md:hidden">
          <Plus className="w-4 h-4" />
          New Task
        </Button>
        <div className="hidden md:flex flex-wrap items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Status: All
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <PersonStanding className="w-4 h-4" />
            Assignee: All
            <ChevronDown className="w-4 h-4" />
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Mobile: Simple List */}
      <div className="md:hidden space-y-3">
        {tasks.filter(t => t.status !== "Completed").map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-foreground truncate">{task.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{task.category}</div>
            </div>
            <Badge
              variant="outline"
              className={`${statusStyles[task.status]} border-0 text-[10px] font-bold uppercase tracking-tight shrink-0`}
            >
              {task.status}
            </Badge>
          </div>
        ))}
      </div>

      {/* Desktop: Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 px-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">
                Task Name
              </th>
              <th className="pb-3 px-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">
                Status
              </th>
              <th className="pb-3 px-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">
                Created Date
              </th>
              <th className="pb-3 px-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">
                Duration
              </th>
              <th className="pb-3 px-4 font-bold text-xs uppercase tracking-wider text-muted-foreground">
                Assignees
              </th>
              <th className="pb-3 px-4 font-bold text-xs uppercase tracking-wider text-muted-foreground text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-muted/30 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">{task.name}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">
                      {task.category}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Badge
                    variant="outline"
                    className={`${statusStyles[task.status]} border-0 text-[11px] font-bold uppercase tracking-tight`}
                  >
                    {task.status}
                  </Badge>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-muted-foreground">{task.createdDate}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-muted-foreground">{task.duration}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex -space-x-1.5">
                    {task.assignees.map((assignee) => (
                      <Avatar
                        key={assignee.name}
                        className="w-7 h-7 border-2 border-card ring-1 ring-muted"
                      >
                        <AvatarImage src={assignee.avatar} />
                        <AvatarFallback>{assignee.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <Button variant="ghost" size="sm" className="text-primary font-bold text-sm hover:text-primary/80">
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
