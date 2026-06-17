import { z } from "zod"

export const updateUserSchema = z.object({
  full_name: z.string().min(1).max(100).optional(),
  display_name: z.string().min(1).max(50).optional(),
  avatar_path: z.string().optional(),
})

export const uploadAvatarSchema = z.object({
  userId: z.string().uuid(),
  blob: z.instanceof(Blob).refine(
    (file) => ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type),
    "Only JPEG, PNG, WebP, and GIF images are allowed"
  ).refine(
    (file) => file.size <= 2 * 1024 * 1024,
    "Image must be under 2MB"
  ),
})
