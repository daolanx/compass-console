export type MetricCardItem = {
  label: string
  value: string
  trend: number | null
  trendLabel: string
}

export const metricCards: MetricCardItem[] = [
  {
    label: "DAU",
    value: "1,284",
    trend: 12,
    trendLabel: "+12%",
  },
  {
    label: "MAU",
    value: "8,432",
    trend: null,
    trendLabel: "Steady",
  },
  {
    label: "New Signups",
    value: "142",
    trend: 15,
    trendLabel: "+15%",
  },
  {
    label: "Conversion Rate",
    value: "3.2%",
    trend: 1.2,
    trendLabel: "+1.2%",
  },
]

export type TaskProgressItem = {
  name: string
  count: number
  color: string
}

export const taskProgressData = {
  total: 12,
  items: [
    { name: "Overdue", count: 4, color: "bg-rose-500" },
    { name: "In Progress", count: 3, color: "bg-orange-500" },
    { name: "Review", count: 2, color: "bg-amber-500" },
    { name: "Planned", count: 2, color: "bg-primary" },
    { name: "Backlog", count: 1, color: "bg-muted-foreground/40" },
  ],
}

export type TeamMemberItem = {
  name: string
  avatar: string
  tasks: number
  total: number
  color: string
}

export const teamMembersData: TeamMemberItem[] = [
  { name: "Sarah", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Sarah", tasks: 3, total: 5, color: "bg-emerald-500" },
  { name: "Jordan", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Jordan", tasks: 5, total: 8, color: "bg-blue-500" },
  { name: "Alex", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Alex", tasks: 8, total: 12, color: "bg-amber-500" },
  { name: "Mike", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Mike", tasks: 4, total: 6, color: "bg-rose-500" },
  { name: "Emily", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Emily", tasks: 6, total: 10, color: "bg-violet-500" },
]

export const taskStatusData = {
  total: 128,
  completed: 52,
  inProgress: 38,
  pending: 26,
  overdue: 12,
}

export const teamWorkloadData = {
  totalMembers: 12,
  teams: [
    { name: "Design Team", percentage: 88, color: "bg-primary" },
    { name: "Dev Team", percentage: 42, color: "bg-chart-2" },
    { name: "Marketing", percentage: 65, color: "bg-chart-3" },
  ],
}

export type ActivityItem = {
  id: string
  user: string
  avatar: string
  action: string
  target: string
  time: string
  quote?: string
}

export const recentActivities: ActivityItem[] = [
  {
    id: "1",
    user: "Alex",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Alex",
    action: "completed",
    target: "Homepage UI",
    time: "2 mins ago",
  },
  {
    id: "2",
    user: "Sarah",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Sarah",
    action: "commented on",
    target: "Q4 Plan",
    time: "15 mins ago",
    quote: '"I think the color scheme needs..."',
  },
  {
    id: "3",
    user: "Mike",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Mike",
    action: "created",
    target: "Market Research",
    time: "1 hr ago",
  },
  {
    id: "4",
    user: "Emily",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Emily",
    action: "updated",
    target: "Sprint Board",
    time: "2 hrs ago",
  },
]

export type TaskItem = {
  id: string
  name: string
  category: string
  status: "Completed" | "In Progress" | "Pending" | "Overdue"
  createdDate: string
  duration: string
  assignees: { name: string; avatar: string }[]
}

export const tasks: TaskItem[] = [
  {
    id: "1",
    name: "Update Mobile Login Interface",
    category: "Product Design",
    status: "Pending",
    createdDate: "Oct 12, 2023",
    duration: "4 days",
    assignees: [
      { name: "Sarah", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Sarah" },
      { name: "Alex", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Alex" },
    ],
  },
  {
    id: "2",
    name: "API Interface Performance Optimization",
    category: "Development",
    status: "In Progress",
    createdDate: "Oct 10, 2023",
    duration: "1 week",
    assignees: [
      { name: "Alex", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Alex" },
    ],
  },
  {
    id: "3",
    name: "Bug Fix: Payment Callback Exception",
    category: "Maintenance",
    status: "Completed",
    createdDate: "Oct 08, 2023",
    duration: "2 days",
    assignees: [
      { name: "Mike", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Mike" },
    ],
  },
  {
    id: "4",
    name: "Brand Guidelines Revision",
    category: "Design System",
    status: "Completed",
    createdDate: "Oct 24, 2023",
    duration: "12h spent",
    assignees: [
      { name: "Emily", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Emily" },
      { name: "Alex", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Alex" },
    ],
  },
  {
    id: "5",
    name: "API Integration Auth",
    category: "Development",
    status: "In Progress",
    createdDate: "Oct 26, 2023",
    duration: "4.5h spent",
    assignees: [
      { name: "Mike", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Mike" },
    ],
  },
  {
    id: "6",
    name: "Final UI Quality Check",
    category: "QA",
    status: "Pending",
    createdDate: "Oct 29, 2023",
    duration: "-",
    assignees: [
      { name: "Sarah", avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Sarah" },
    ],
  },
]
