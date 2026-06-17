import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export const updatePasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
})
