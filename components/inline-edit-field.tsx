"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Check, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface InlineEditFieldProps {
  label: string
  value: string
  onSave: (value: string) => Promise<void>
  placeholder?: string
  description?: string
  type?: string
}

export function InlineEditField({
  label,
  value,
  onSave,
  placeholder,
  description,
  type = "text",
}: InlineEditFieldProps) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  // Sync draft when external value changes (e.g. after save)
  useEffect(() => {
    setDraft(value)
  }, [value])

  const handleSave = async () => {
    if (draft === value) {
      setEditing(false)
      return
    }
    setSaving(true)
    setError(null)
    try {
      await onSave(draft)
      setEditing(false)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Update failed")
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setDraft(value)
    setError(null)
    setEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave()
    if (e.key === "Escape") handleCancel()
  }

  return (
    <div className="group grid gap-1.5">
      <Label className="text-sm font-medium text-foreground">{label}</Label>

      {editing ? (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              type={type}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={saving}
              className="h-9"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-9 w-9 shrink-0 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
              onClick={handleCancel}
              disabled={saving}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {error && (
            <p className="text-xs text-destructive">{error}</p>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm transition-colors",
            "hover:bg-muted/80 group/field cursor-pointer"
          )}
        >
          <span className={cn(
            "flex-1 truncate",
            value ? "text-foreground" : "text-muted-foreground"
          )}>
            {value || placeholder || `Enter ${label.toLowerCase()}...`}
          </span>
          <Pencil className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/field:opacity-100" />
        </button>
      )}

      {description && !editing && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
