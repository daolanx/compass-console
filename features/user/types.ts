import { User } from "@supabase/supabase-js"

export type { User }

export interface UpdateUserData {
  full_name?: string
  display_name?: string
  avatar_path?: string
}

export type { ServiceResponse } from "@/features/auth/types"
