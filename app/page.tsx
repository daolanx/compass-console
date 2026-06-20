import Link from "next/link"
import { siteConfig } from "@/constants"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  BarChart3,
  DollarSign,
  CheckCircle2,
  TrendingUp,
  Target,
  ClipboardList,
  Users,
  Zap,
  LayoutDashboard,
  CalendarCheck,
  ArrowRight,
} from "lucide-react"

const floatingIcons = [
  { Icon: BarChart3, size: "size-16", top: "top-[12%]", left: "left-[5%]", delay: "0s", duration: "6s" },
  { Icon: DollarSign, size: "size-12", top: "top-[6%]", left: "left-[25%]", delay: "1.2s", duration: "7s" },
  { Icon: Users, size: "size-14", top: "top-[10%]", left: "right-[5%]", delay: "2.5s", duration: "5.5s" },
  { Icon: Target, size: "size-14", top: "top-[35%]", left: "left-[3%]", delay: "1.5s", duration: "6.5s" },
  { Icon: TrendingUp, size: "size-16", top: "top-[32%]", left: "right-[3%]", delay: "0.5s", duration: "8s" },
  { Icon: CheckCircle2, size: "size-10", top: "top-[50%]", left: "left-[8%]", delay: "2s", duration: "5s" },
  { Icon: Zap, size: "size-10", top: "top-[48%]", left: "right-[8%]", delay: "0.8s", duration: "6.8s" },
  { Icon: ClipboardList, size: "size-14", top: "top-[68%]", left: "left-[5%]", delay: "3s", duration: "7.5s" },
  { Icon: BarChart3, size: "size-12", top: "top-[78%]", left: "left-[30%]", delay: "1.8s", duration: "6.2s" },
  { Icon: DollarSign, size: "size-16", top: "top-[72%]", left: "right-[5%]", delay: "2.2s", duration: "7.2s" },
]

const features = [
  {
    icon: LayoutDashboard,
    title: "Overview",
    description: "Get a real-time snapshot of your business with AI-powered insights and key metrics.",
    hoverBg: "group-hover:bg-blue-100 dark:group-hover:bg-blue-950",
    hoverText: "group-hover:text-blue-500 dark:group-hover:text-blue-400",
  },
  {
    icon: ClipboardList,
    title: "Tasks",
    description: "Track and manage tasks with priorities, deadlines, and team assignments.",
    hoverBg: "group-hover:bg-green-100 dark:group-hover:bg-green-950",
    hoverText: "group-hover:text-green-500 dark:group-hover:text-green-400",
  },
  {
    icon: CalendarCheck,
    title: "Activities",
    description: "Log and analyze your daily activities to optimize workflows.",
    hoverBg: "group-hover:bg-purple-100 dark:group-hover:bg-purple-950",
    hoverText: "group-hover:text-purple-500 dark:group-hover:text-purple-400",
  },
  {
    icon: Users,
    title: "Members",
    description: "Manage your team, roles, and permissions in one place.",
    hoverBg: "group-hover:bg-orange-100 dark:group-hover:bg-orange-950",
    hoverText: "group-hover:text-orange-500 dark:group-hover:text-orange-400",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description: "Monitor growth metrics, customer acquisition, and retention rates.",
    hoverBg: "group-hover:bg-pink-100 dark:group-hover:bg-pink-950",
    hoverText: "group-hover:text-pink-500 dark:group-hover:text-pink-400",
  },
  {
    icon: DollarSign,
    title: "Finance",
    description: "Track revenue, expenses, and financial health at a glance.",
    hoverBg: "group-hover:bg-amber-100 dark:group-hover:bg-amber-950",
    hoverText: "group-hover:text-amber-500 dark:group-hover:text-amber-400",
  },
]

export default function Home() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-gradient-to-br from-orange-50/40 via-amber-50/30 to-yellow-50/40 dark:from-orange-950/20 dark:via-amber-950/15 dark:to-yellow-950/20">
      {/* Floating icons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingIcons.map((item, i) => (
          <div
            key={i}
            className={`absolute ${item.size} ${item.top} ${item.left} text-muted-foreground animate-float`}
            style={{
              animationDelay: item.delay,
              animationDuration: item.duration,
            }}
          >
            <item.Icon className="size-full" strokeWidth={1} />
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 flex h-16 items-center border-b border-border/50 bg-white/60 dark:bg-card/60 backdrop-blur-sm px-6">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.webp"
            alt={`${siteConfig.name} logo`}
            className="size-8 object-cover"
          />
          <span className="text-[15px] font-semibold text-foreground tracking-tight">
            {siteConfig.name}
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth/sign-up"
            className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
          >
            Get Started
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="mx-auto text-center ">
          <h1 className="text-4xl whitespace-nowrap font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl ">
            Business Workbench <br/> for Individuals & Small Teams
           
          </h1>
          
          <p className="mt-6 text-2xl leading-8 text-muted-foreground max-w-2xl mx-auto">
            Simple · Practical · Focused on Metrics & Collaboration
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/auth/sign-up"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
            >
              Get Started Free
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-white/60 dark:bg-card/60 backdrop-blur-sm px-6 py-3 text-sm font-medium text-foreground hover:bg-white/80 dark:hover:bg-card/80 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Product Screenshot */}
        <div className="mx-auto mt-16 max-w-5xl w-full group">
          <div className="rounded-xl border border-border/50 bg-white/60 dark:bg-card/60 backdrop-blur-sm p-2 shadow-2xl overflow-hidden">
            <img
              src="/dashboard-preview.webp"
              alt="Compass Console Dashboard"
              className="w-full rounded-lg transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mt-20 max-w-5xl grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border/50 bg-white/60 dark:bg-card/60 backdrop-blur-sm p-6 transition-all duration-300 hover:bg-white dark:hover:bg-card hover:shadow-md hover:border-border cursor-default"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`flex size-10 items-center justify-center rounded-lg bg-muted transition-colors duration-300 ${feature.hoverBg}`}>
                  <feature.icon className={`size-5 text-muted-foreground transition-colors duration-300 ${feature.hoverText}`} />
                </div>
                <h3 className="font-semibold text-foreground">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-white/60 dark:bg-card/60 backdrop-blur-sm px-6 py-4">
        <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>&copy; 2025 {siteConfig.name}</p>
          <div className="flex items-center gap-4">
            <Link href="/legal/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <span className="text-border">&middot;</span>
            <Link href="/legal/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
