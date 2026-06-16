import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { recentActivities } from "./data"

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <CardTitle className="text-base">Recent Activity</CardTitle>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <ArrowRight className="size-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3">
            <Avatar className="size-8 shrink-0 ring-1 ring-muted">
              <AvatarImage src={activity.avatar} />
              <AvatarFallback>{activity.user[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm leading-snug">
                  <a href="#" className="font-semibold text-foreground hover:underline">{activity.user}</a>{" "}
                  {activity.action}{" "}
                  <a href="#" className="font-medium text-primary hover:underline">{activity.target}</a>
                </p>
                <span className="shrink-0 text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
