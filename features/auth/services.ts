import { createClient } from "@/lib/supabase/client"
import { ServiceResponse } from "./types"
import { loginSchema, signUpSchema, resetPasswordSchema, updatePasswordSchema } from "./schemas"

export async function login(email: string, password: string): Promise<ServiceResponse<void>> {
  try {
    const validated = loginSchema.parse({ email, password })
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: validated.email,
      password: validated.password,
    })
    if (error) throw error
    return { success: true, data: null, message: "" }
  } catch (error) {
    return { success: false, data: null, message: error instanceof Error ? error.message : "Login failed" }
  }
}

export async function signUp(email: string, password: string): Promise<ServiceResponse<void>> {
  try {
    const validated = signUpSchema.parse({ email, password })
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email: validated.email,
      password: validated.password,
      options: {
        emailRedirectTo: `${window.location.origin}/protected`,
      },
    })
    if (error) throw error
    return { success: true, data: null, message: "" }
  } catch (error) {
    return { success: false, data: null, message: error instanceof Error ? error.message : "Sign up failed" }
  }
}

export async function signInWithOAuth(provider: "github" | "google"): Promise<ServiceResponse<void>> {
  try {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) throw error
    return { success: true, data: null, message: "" }
  } catch (error) {
    return { success: false, data: null, message: error instanceof Error ? error.message : "OAuth sign in failed" }
  }
}

export async function resetPassword(email: string): Promise<ServiceResponse<void>> {
  try {
    const validated = resetPasswordSchema.parse({ email })
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(validated.email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    })
    if (error) throw error
    return { success: true, data: null, message: "" }
  } catch (error) {
    return { success: false, data: null, message: error instanceof Error ? error.message : "Reset password failed" }
  }
}

export async function updatePassword(password: string): Promise<ServiceResponse<void>> {
  try {
    const validated = updatePasswordSchema.parse({ password })
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password: validated.password })
    if (error) throw error
    return { success: true, data: null, message: "" }
  } catch (error) {
    return { success: false, data: null, message: error instanceof Error ? error.message : "Update password failed" }
  }
}
