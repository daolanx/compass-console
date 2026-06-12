"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  UserIcon,
  Pencil,
  Check,
  X,
  Loader2,
  Mail,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface ProfileFormProps {
  user: User;
  onSaved?: () => void;
}

export function ProfileForm({ user, onSaved }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formKey, setFormKey] = useState(0);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const supabase = createClient();

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.get("fullName") as string,
          display_name: formData.get("displayName") as string,
        },
      });
      if (error) throw error;
      setSuccess("Profile updated successfully.");
      setIsEditing(false);
      setFormKey((k) => k + 1);
      onSaved?.();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setError(null);
    setSuccess(null);
    setIsEditing(false);
    setFormKey((k) => k + 1);
  };

  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_280px]">
      {/* Left: Personal Information */}
      <Card className="border-border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
            Personal Information
          </CardTitle>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="shrink-0"
            >
              <Pencil className="mr-1.5 h-3.5 w-3.5" />
              Edit
            </Button>
          )}
        </CardHeader>

        <CardContent>
          <form key={formKey} onSubmit={handleSave} className="flex flex-col gap-5">
            {/* Full Name */}
            <div className="grid gap-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
                defaultValue={user.user_metadata?.full_name || ""}
                disabled={!isEditing}
                className={!isEditing ? "bg-muted/50 border-transparent" : ""}
              />
            </div>

            {/* Display Name */}
            <div className="grid gap-2">
              <Label htmlFor="displayName" className="text-sm font-medium">
                Display Name
              </Label>
              <Input
                id="displayName"
                name="displayName"
                type="text"
                placeholder="johndoe"
                defaultValue={user.user_metadata?.display_name || ""}
                disabled={!isEditing}
                className={!isEditing ? "bg-muted/50 border-transparent" : ""}
              />
            </div>

            <Separator className="my-1" />

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

            {/* Actions */}
            {isEditing && (
              <div className="flex items-center gap-3 pt-1">
                <Button type="submit" disabled={isLoading} size="sm">
                  {isLoading ? (
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="mr-1.5 h-4 w-4" />
                  )}
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <X className="mr-1.5 h-4" />
                  Cancel
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Right: Account Info Sidebar */}
      <div className="flex flex-col gap-6">
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-muted p-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Email
                </p>
                <p className="text-sm truncate mt-0.5">{user.email}</p>
              </div>
            </div>

            <Separator />

            {/* Member Since */}
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-muted p-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Member Since
                </p>
                <p className="text-sm mt-0.5">{memberSince}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tip Card */}
        <Card className="border-dashed border-border">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your profile information is displayed across the application.
              Keep it up to date so others can recognize you.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
