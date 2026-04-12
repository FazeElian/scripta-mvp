import { useQuery } from "@tanstack/react-query"

// API Calls
import { getAllSnippets } from "./api";

export const useGetAllSnippetsByOwner = () => {
    return useQuery({
        queryKey: ["snippets"],
        queryFn: getAllSnippets,
        retry: 1,
        refetchOnWindowFocus: false
    });
}