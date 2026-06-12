"use client";

import { useRef, useState } from "react";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { UserAvatar } from "@/components/user-avatar";
import { ImageCropDialog } from "@/components/image-crop-dialog";
import { Camera, Loader2 } from "lucide-react";

interface AvatarUploadProps {
  user: User;
  avatarPath?: string | null;
  onUpload: (path: string) => void;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 2 * 1024 * 1024; // 2MB

export function AvatarUpload({ user, avatarPath, onUpload }: AvatarUploadProps) {
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Please select a JPEG, PNG, WebP, or GIF image.");
      return;
    }

    if (file.size > MAX_SIZE) {
      setError("Image must be under 2MB.");
      return;
    }

    setCropSrc(URL.createObjectURL(file));
  };

  const handleCropComplete = async (blob: Blob) => {
    setCropSrc(null);
    setIsUploading(true);

    const supabase = createClient();
    const ext = "png";
    const filePath = `${user.id}/avatar.${ext}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("uploads")
        .upload(filePath, blob, {
          upsert: true,
          contentType: "image/png",
        });

      if (uploadError) throw uploadError;

      onUpload(filePath);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCropCancel = () => {
    setCropSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <div className="relative group cursor-pointer">
        {isUploading ? (
          <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-muted flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <UserAvatar user={user} avatarPath={avatarPath} size="lg" />
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => !isUploading && fileInputRef.current?.click()}
        >
          <Camera className="h-6 w-6 text-white" />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
        />

        {error && (
          <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-destructive">
            {error}
          </p>
        )}
      </div>

      {cropSrc && (
        <ImageCropDialog
          open
          src={cropSrc}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
    </>
  );
}
