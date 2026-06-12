"use client"

import { Sparkles, X, RefreshCw } from "lucide-react"
import { useState } from "react"

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
    <div className="bg-muted/50 text-foreground p-4 rounded-xl shadow-sm flex items-start gap-4 border border-border relative">
      <div className="bg-primary/10 p-2 rounded-lg flex items-center justify-center text-primary">
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="flex-1 pr-16">
        <h3 className="text-sm font-bold mb-0.5 text-foreground">AI Insights</h3>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="p-1 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
          title="Refresh insights"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
        <button
          onClick={() => setVisible(false)}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
