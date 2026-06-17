"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { User as UserIcon } from "lucide-react";

interface UserAvatarProps {
  user: SupabaseUser;
  updatedAt?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-lg",
  lg: "h-24 w-24 text-2xl sm:h-28 sm:w-28 sm:text-3xl",
};

function InitialsFallback({
  size,
  className,
}: {
  size: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <div
      className={cn(
        sizeClasses[size],
        "rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium",
        className
      )}
    >
      <UserIcon className="w-1/2 h-1/2" />
    </div>
  );
}

export function UserAvatar({ user, updatedAt, size = "md", className }: UserAvatarProps) {
  const [imgError, setImgError] = useState(false);

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.display_name ||
    user.email ||
    "";

  const avatarUrl = user.user_metadata?.avatar_url || null;

  if (avatarUrl && !imgError) {
    return (
      <img
        src={`${avatarUrl}?t=${updatedAt || Date.now()}`}
        alt={displayName}
        loading="lazy"
        onError={() => setImgError(true)}
        className={cn(
          sizeClasses[size],
          "rounded-full object-cover",
          className
        )}
      />
    );
  }

  return <InitialsFallback size={size} className={className} />;
}
