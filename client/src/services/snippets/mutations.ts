import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
import { type FormSnippet, type EditorSnippetForm, type SnippetByIdByOwner } from "@/types/snippets.type";

// API Calls
import { deleteSnippet, newSnippet, updateByIdOnEditor, updateSnippet } from "./api";

export const useNewSnippetMutation = () => {
    // Query client
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: FormSnippet) => newSnippet(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response.message);

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

export const useUpdateEditorSnippetMutation = (id: string) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: EditorSnippetForm) => updateByIdOnEditor(id, data),
        onSuccess: (response, variables) => {
            toast.success(response);

            // Actualiza el cache inmediatamente con los datos guardados
            queryClient.setQueryData(["snippet-editor", id], (old: SnippetByIdByOwner) => ({
                ...old,
                title: variables.title,
                lang: variables.lang,
                visibility: variables.visibility,
                snippetContent: {
                    ...old?.snippetContent,
                    code: variables.snippetContent.code,
                    documentation: variables.snippetContent.documentation,
                    diagramData: variables.snippetContent.diagramData,
                },
            }));

            // Solo invalida la lista, NO el snippet-editor
            queryClient.invalidateQueries({ queryKey: ["snippets"] });
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