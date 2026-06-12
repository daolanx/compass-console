"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface UserAvatarProps {
  user: User;
  avatarPath?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-lg",
  lg: "h-24 w-24 text-2xl sm:h-28 sm:w-28 sm:text-3xl",
};

function InitialsFallback({
  name,
  size,
  className,
}: {
  name: string;
  size: "sm" | "md" | "lg";
  className?: string;
}) {
  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const colorIndex = name.split("").reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0);
  const gradients = [
    "from-rose-400 to-orange-300",
    "from-amber-400 to-yellow-300",
    "from-emerald-400 to-teal-300",
    "from-cyan-400 to-blue-300",
    "from-violet-400 to-purple-300",
    "from-pink-400 to-rose-300",
  ];
  const gradient = gradients[colorIndex % gradients.length];

  return (
    <div
      className={cn(
        sizeClasses[size],
        "rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold shadow-lg",
        gradient,
        className
      )}
    >
      {initials}
    </div>
  );
}

export function UserAvatar({ user, avatarPath, size = "md", className }: UserAvatarProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.display_name ||
    user.email ||
    "";

  useEffect(() => {
    if (!avatarPath) return;

    const supabase = createClient();
    supabase.storage
      .from("uploads")
      .createSignedUrl(avatarPath, 3600) // 1 hour expiry
      .then(({ data, error }) => {
        if (!error && data?.signedUrl) {
          setSignedUrl(data.signedUrl);
        }
      });
  }, [avatarPath]);

  if (signedUrl && !imgError) {
    return (
      <img
        src={signedUrl}
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

  return <InitialsFallback name={displayName} size={size} className={className} />;
}
