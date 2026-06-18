import Link from "next/link"
import { siteConfig } from "@/constants"
import {
  BarChart3,
  DollarSign,
  CheckCircle2,
  TrendingUp,
  Target,
  ClipboardList,
  Users,
  Zap,
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

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-gradient-to-br from-orange-50/40 via-amber-50/30 to-yellow-50/40">
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

      <header className="relative z-10 flex h-16 items-center border-b border-border/50 bg-white/60 backdrop-blur-sm px-6">
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
      </header>
      <main className="relative z-10 flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm">{children}</div>
      </main>
      <footer className="relative z-10 border-t border-border/50 bg-white/60 backdrop-blur-sm px-6 py-4">
        <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>&copy; 2025 {siteConfig.name}</p>
          <div className="flex items-center gap-4">
            <Link href="/legal/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <span className="text-border">·</span>
            <Link href="/legal/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
