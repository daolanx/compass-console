import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { recentActivities } from "./data"

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-0">
        <CardTitle className="text-base">Recent Activity</CardTitle>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <MoreHorizontal />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <Avatar className="size-8 ring-1 ring-muted">
              <AvatarImage src={activity.avatar} />
              <AvatarFallback>{activity.user[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm leading-snug">
                <span className="font-semibold text-foreground">{activity.user}</span>{" "}
                {activity.action}{" "}
                <span className="font-medium text-primary">{activity.target}</span>
              </p>
              {activity.quote && (
                <p className="mt-1 text-xs italic text-muted-foreground">
                  {activity.quote}
                </p>
              )}
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
