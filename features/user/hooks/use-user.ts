"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { User } from "@supabase/supabase-js"
import { getCurrentUser, updateUser as updateUserService } from "../services"
import { UpdateUserData } from "../types"

const USER_QUERY_KEY = ["user"]

export function useUser() {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      const response = await getCurrentUser()
      if (!response.success) throw new Error(response.message)
      return response.data
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })

  const update = useMutation({
    mutationFn: async (data: UpdateUserData) => {
      const response = await updateUserService(data)
      if (!response.success) throw new Error(response.message)
      return response
    },
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY })
      const previousUser = queryClient.getQueryData<User>(USER_QUERY_KEY)

      queryClient.setQueryData<User>(USER_QUERY_KEY, (old) => {
        if (!old) return old
        return {
          ...old,
          user_metadata: {
            ...old.user_metadata,
            ...newData,
          },
        }
      })

      return { previousUser }
    },
    onError: (_err, _newData, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(USER_QUERY_KEY, context.previousUser)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY })
    },
  })

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    updateUser: update.mutate,
    updateUserAsync: update.mutateAsync,
    isUpdating: update.isPending,
    updateError: update.error,
    refetch: query.refetch,
  }
}
