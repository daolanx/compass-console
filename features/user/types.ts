import { User } from "@supabase/supabase-js"

export type { User }

export interface UpdateUserData {
  full_name?: string
  display_name?: string
  avatar_path?: string
}

export interface ServiceResponse<T> {
  success: boolean
  data: T | null
  message: string
}
