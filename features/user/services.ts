import { createClient } from "@/lib/supabase/client"
import { User, ServiceResponse } from "./types"
import { updateUserSchema, uploadAvatarSchema } from "./schemas"

export type { User, ServiceResponse }

export async function getCurrentUser(): Promise<ServiceResponse<User>> {
  try {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error

    if (user?.user_metadata?.avatar_path) {
      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(user.user_metadata.avatar_path)
      if (data?.publicUrl) {
        user.user_metadata.avatar_url = data.publicUrl
      }
    }

    return { success: true, data: user, message: "" }
  } catch (error) {
    return { success: false, data: null, message: error instanceof Error ? error.message : "Failed to get user" }
  }
}

export async function updateUser(data: unknown): Promise<ServiceResponse<void>> {
  try {
    const validated = updateUserSchema.parse(data)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ data: validated })
    if (error) throw error
    return { success: true, data: null, message: "" }
  } catch (error) {
    return { success: false, data: null, message: error instanceof Error ? error.message : "Failed to update user" }
  }
}

export async function uploadAvatar(userId: string, blob: Blob): Promise<ServiceResponse<string>> {
  try {
    const validated = uploadAvatarSchema.parse({ userId, blob })
    const supabase = createClient()
    const filePath = `${validated.userId}/avatar.png`

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, validated.blob, {
        upsert: true,
        contentType: "image/png",
      })

    if (error) throw error
    return { success: true, data: filePath, message: "" }
  } catch (error) {
    return { success: false, data: null, message: error instanceof Error ? error.message : "Failed to upload avatar" }
  }
}

export async function signOut(): Promise<ServiceResponse<void>> {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { success: true, data: null, message: "" }
  } catch (error) {
    return { success: false, data: null, message: error instanceof Error ? error.message : "Failed to sign out" }
  }
}
