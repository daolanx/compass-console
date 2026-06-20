"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { useUser } from "@/features/user/hooks/use-user"
import { updateUser as updateUserService, updateEmail } from "@/features/user/services"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import { AvatarUpload } from "@/components/avatar-upload"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"

const USER_QUERY_KEY = ["user"]

export default function ProfilePage() {
  const [fullName, setFullName] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()
  const { user, isLoading } = useUser()

  // Sync form state when user loads
  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || "")
      setDisplayName(user.user_metadata?.display_name || "")
      setEmail(user.email || "")
    }
  }, [user])

  const patchUser = (patch: Record<string, unknown>) => {
    queryClient.setQueryData<User>(USER_QUERY_KEY, (old) => {
      if (!old) return old
      return {
        ...old,
        ...patch,
        user_metadata: { ...old.user_metadata, ...patch },
      }
    })
  }

  const handleAvatarChange = async (path: string) => {
    const supabase = createClient()
    const { data } = supabase.storage.from("avatars").getPublicUrl(path)
    patchUser({
      avatar_path: path,
      avatar_url: data?.publicUrl,
      updated_at: new Date().toISOString(),
    })

    const response = await updateUserService({ avatar_path: path })
    if (!response.success) {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY })
      throw new Error(response.message)
    }
  }

  const handleSave = async () => {
    setError(null)
    setSuccess(null)
    setSaving(true)

    try {
      // Update name & display name
      const metadataChanged =
        fullName !== (user?.user_metadata?.full_name || "") ||
        displayName !== (user?.user_metadata?.display_name || "")

      if (metadataChanged) {
        patchUser({ full_name: fullName, display_name: displayName })
        const response = await updateUserService({
          full_name: fullName,
          display_name: displayName,
        })
        if (!response.success) {
          queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY })
          throw new Error(response.message)
        }
      }

      // Update email if changed
      const emailChanged = email !== (user?.email || "")
      if (emailChanged) {
        const response = await updateEmail(email)
        if (!response.success) {
          throw new Error(response.message)
        }
        setSuccess("Profile updated. A verification email has been sent to confirm your new email.")
      } else {
        setSuccess("Profile updated successfully.")
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!user) {
    router.push("/auth/login")
    return null
  }

  const hasChanges =
    fullName !== (user.user_metadata?.full_name || "") ||
    displayName !== (user.user_metadata?.display_name || "") ||
    email !== (user.email || "")

  return (
    <div className="flex-1 w-full p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Your public profile information
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
          {/* Profile Photo */}
          <div className="flex items-center gap-4">
            <AvatarUpload user={user} onUpload={handleAvatarChange} />
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium">Profile Photo</p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or GIF. Max 2MB.
              </p>
            </div>
          </div>

          {/* Name + Display Name */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jordan Chen"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="displayName">Display name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="jordanchen"
              />
            </div>
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <p className="text-xs text-muted-foreground">
              Changing your email will send a verification link to the new address.
            </p>
          </div>

          {/* Messages */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {success}
            </div>
          )}
        </CardContent>

        <CardFooter className="justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setFullName(user.user_metadata?.full_name || "")
              setDisplayName(user.user_metadata?.display_name || "")
              setEmail(user.email || "")
              setError(null)
              setSuccess(null)
            }}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSave}
            disabled={saving || !hasChanges}
          >
            {saving && <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
