import { useQuery } from "@tanstack/react-query"

// API Calls
import { getAllSnippetsByOwner, getAllSnippets } from "./api";

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