import { isAxiosError } from "axios";

// API Axios config
import { api } from "../../config/axios";

// Types
import {
    type AllSnippets,
    type FormSnippet,
    type SnippetByOwner
} from "@/types/snippets.type";

export async function getAllSnippetsByOwner() {
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

export async function getAllSnippets() {
    try {
        const { data } = await api.get<AllSnippets[]>("/snippets/explore");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error(`Unexpected error: ${error}`);
    }
}

export async function newSnippet(snippetData: FormSnippet) {
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

export async function updateSnippet(id: string, snippetData: FormSnippet) {
    try {
        const { data } = await api.put(`/snippets/${id}`, snippetData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error(`Unexpected error: ${error}`);
    }
}

export async function deleteSnippet(id: string) {
    try {
        const { data } = await api.delete(`/snippets/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error(`Unexpected error: ${error}`);
    }
}