import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
import { type NewSnippet } from "@/types/snippets.type";

// API Calls
import { newSnippet } from "./api";

export const useNewSnippetMutation = () => {
    // Query client
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: NewSnippet) => newSnippet(data),
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