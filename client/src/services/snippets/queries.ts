import { useQuery } from "@tanstack/react-query"

// API Calls
import { getAllSnippetsByOwner, getAllSnippets, getSnippetByIdByOwner } from "./api";

export const useGetAllSnippetsByOwner = () => {
    return useQuery({
        queryKey: ["snippets"],
        queryFn: getAllSnippetsByOwner,
        retry: 1,
        refetchOnWindowFocus: false
    });
}

export const useGetAllSnippets = () => {
    return useQuery({
        queryKey: ["snippets-explore"],
        queryFn: getAllSnippets,
        retry: 1,
        refetchOnWindowFocus: false
    });
}

export const useGetSnippetByIdByOwner = (id: string) => {
    return useQuery({
        queryKey: ["snippet-editor", id],
        queryFn: () => getSnippetByIdByOwner(id),
        retry: 1,
        refetchOnWindowFocus: true,
        staleTime: 0
    });
}