import { isAxiosError } from "axios";

// API Axios config
import { api } from "../../config/axios";

// Types
import { type NewSnippet, type SnippetByOwner } from "@/types/snippets.type";

export async function getAllSnippets() {
    try {
        const { data } = await api.get<SnippetByOwner[]>("/snippets/");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error(`Unexpected error: ${error}`);
    }
}

export async function newSnippet(snippetData: NewSnippet) {
    try {
        const { data } = await api.post("/snippets/create", snippetData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error(`Unexpected error: ${error}`);
    }
}