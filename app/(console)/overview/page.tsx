import { AiInsights } from "@/components/dashboard/ai-insights"
import { SummaryCards } from "@/components/dashboard/summary-cards"
import { TaskStatusChart } from "@/components/dashboard/task-status-chart"
import { TeamWorkloadChart } from "@/components/dashboard/team-workload-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { TasksTable } from "@/components/dashboard/tasks-table"

export default function OverviewPage() {
  return (
    <>
      {/* AI Insights */}
      <AiInsights />

      {/* Mobile: Summary Cards / Desktop: Charts */}
      <div className="md:hidden">
        <SummaryCards />
      </div>

      {/* Analytics & Activity Section */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Charts Card */}
        <div className="lg:col-span-8 bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
            <TaskStatusChart />
            <TeamWorkloadChart />
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="lg:col-span-4">
          <RecentActivity />
        </div>
      </div>

      {/* Tasks List Section */}
      <TasksTable />
    </>
  )
}
