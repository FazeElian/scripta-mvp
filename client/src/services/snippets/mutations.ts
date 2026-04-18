import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
import { type FormSnippet } from "@/types/snippets.type";

// API Calls
import { deleteSnippet, newSnippet, updateSnippet } from "./api";

export const useNewSnippetMutation = () => {
    // Query client
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: FormSnippet) => newSnippet(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response);

            // Invalidate queries
            queryClient.invalidateQueries({
                queryKey: ["snippets"]
            })
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    })
}
export const useUpdateSnippetMutation = (id: string) => {
    // Query client
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: FormSnippet) => updateSnippet(id, data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response);

            // Invalidate queries
            queryClient.invalidateQueries({
                queryKey: ["snippets"]
            })
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    })
}

export const useDeleteSnippetMutation = () => {
    // Query client
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => deleteSnippet(id),
        onSuccess: () => {
            // Invalidate queries
            queryClient.invalidateQueries({
                queryKey: ["snippets"]
            })
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    })
}