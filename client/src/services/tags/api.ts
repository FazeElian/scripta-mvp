import { isAxiosError } from "axios";

// API Axios config
import { api } from "../../config/axios";

export async function searchTags(query: string) {
    try{
        const { data } = await api.get(`/tags/search?q=${query}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error(`Unexpected error: ${error}`);
    }
}