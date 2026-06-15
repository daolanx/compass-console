import { AiInsights } from "@/components/dashboard/ai-insights"
import { MetricCards } from "@/components/dashboard/metric-cards"
import { SidebarStats } from "@/components/dashboard/sidebar-stats"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { TasksTable } from "@/components/dashboard/tasks-table"

export default function OverviewPage() {
  return (
    <>
      {/* AI Insights */}
      <AiInsights />

      {/* Metric Cards */}
      <MetricCards />

      {/* Desktop: Two Column Layout */}
      <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tasks */}
        <div className="lg:col-span-8">
          <TasksTable />
        </div>

        {/* Right Column: Sidebar Stats + Recent Activity */}
        <div className="lg:col-span-4 space-y-6">
          <SidebarStats />
          <RecentActivity />
        </div>
      </div>
    </>
  )
}
