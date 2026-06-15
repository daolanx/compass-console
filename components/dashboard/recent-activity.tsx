import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { recentActivities } from "./data"

export function RecentActivity() {
  return (
    <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-base font-semibold text-foreground">Recent Activity</h3>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <Avatar className="w-8 h-8 ring-1 ring-muted">
              <AvatarImage src={activity.avatar} />
              <AvatarFallback>{activity.user[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm leading-snug">
                <span className="font-semibold text-foreground">{activity.user}</span>{" "}
                {activity.action}{" "}
                <span className="text-primary font-medium">{activity.target}</span>
              </p>
              {activity.quote && (
                <p className="text-xs italic text-muted-foreground mt-1">
                  {activity.quote}
                </p>
              )}
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
