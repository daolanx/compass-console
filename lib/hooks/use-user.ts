"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"

const USER_QUERY_KEY = ["user"]

export function useUser() {
  const queryClient = useQueryClient()
  const supabase = createClient()

  const query = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return user
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })

  const update = useMutation({
    mutationFn: async (data: {
      full_name?: string
      display_name?: string
      avatar_path?: string
    }) => {
      const { error } = await supabase.auth.updateUser({ data })
      if (error) throw error
      return data
    },
    onMutate: async (newData) => {
      // Cancel ongoing queries to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY })

      // Save current data for rollback
      const previousUser = queryClient.getQueryData<User>(USER_QUERY_KEY)

      // Optimistically update cache
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
      // Rollback to previous data on error
      if (context?.previousUser) {
        queryClient.setQueryData(USER_QUERY_KEY, context.previousUser)
      }
    },
    onSettled: () => {
      // Refetch latest data to ensure consistency
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
