import { AiInsights } from "@/components/dashboard/ai-insights"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { TaskProgress } from "@/components/dashboard/task-progress"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { TasksTable } from "@/components/dashboard/tasks-table"

export default function OverviewPage() {
  return (
    <>
      <AiInsights />
      <MetricCards />
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <TasksTable />
        </div>
        <div className="lg:col-span-4 flex flex-col gap-6">
          <TaskProgress />
          <RecentActivity />
        </div>
      </div>
    </>
  )
}
