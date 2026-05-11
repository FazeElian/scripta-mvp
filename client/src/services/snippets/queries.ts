import { useQuery } from "@tanstack/react-query"

// API Calls
import {
    getAllSnippetsByOwner,
    getAllSnippets,
    getSnippetByIdByOwner,
    getSnippetById, 
    searchSnippets
} from "./api";

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

export const useGetSnippetById = (id: string) => {
    return useQuery({
        queryKey: ["snippet-public", id],
        queryFn: () => getSnippetById(id),
        retry: 1,
        refetchOnWindowFocus: true,
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

export const useGetExploreSnippets = (params: {
    query: string;
    lang: string;
    sort: string;
    limit: number;
    offset: number;
    tag: string;
}) => {
    return useQuery({
        queryKey: ["snippets-explore-search", params],
        queryFn: () => searchSnippets(params.query, params.tag, params.lang, params.sort, params.limit, params.offset),
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 30,
    });
}