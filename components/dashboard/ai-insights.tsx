"use client"

import { Sparkles, X, RefreshCw } from "lucide-react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const insights = [
  "Team load is at 85%. Consider reassigning tasks from Sarah to Alex to optimize velocity and ensure project deadlines are met.",
  "Sprint velocity dropped 12% this week. The API refactor is blocking 3 downstream tasks — consider pairing up to unblock.",
  "2 tasks are approaching their deadline with no updates in 5+ days. A quick check-in could prevent delays.",
]

export function AiInsights() {
  const [visible, setVisible] = useState(true)
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState(insights[0])

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setText(insights[Math.floor(Math.random() * insights.length)])
      setLoading(false)
    }, 800)
  }

  if (!visible) return null

  return (
    <Card className="relative">
      <CardContent className="flex items-start gap-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg">
          <Sparkles className="text-blue-500" />
        </div>
        <div className="flex-1 pr-16">
          <h3 className="mb-0.5 text-sm font-bold text-foreground">AI Insights</h3>
          <p className="text-sm text-muted-foreground">{text}</p>
        </div>
        <div className="absolute right-2 top-2 flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground hover:text-primary"
            onClick={handleRefresh}
            disabled={loading}
            title="Refresh insights"
          >
            <RefreshCw className={loading ? "animate-spin" : ""} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-muted-foreground hover:text-foreground"
            onClick={() => setVisible(false)}
          >
            <X />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
