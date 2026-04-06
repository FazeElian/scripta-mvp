import { isAxiosError } from "axios";

// API Axios config
import { api } from "../../config/axios";

// Types
import type { LoginUser, RegisterUser, UpdateProfile } from "@/types/users.types";

export async function register(userData: RegisterUser) {
    try {
        const { data } = await api.post("/users/register", userData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error(`Unexpected error: ${error}`);
    }
}

export async function login(userData: LoginUser) {
    try {
        const { data } = await api.post("/users/login", userData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error(`Unexpected error: ${error}`);
    }
}

export async function getAuthenticatedUser() {
    try {
        const { data } = await api.get("/users/user");
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error(`Unexpected error: ${error}`);
    }
}

export async function updateProfile(userData: UpdateProfile) {
    try {
        const { data } = await api.put("/users/profile", userData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error(`Unexpected error: ${error}`);
    }
}

export async function getProfile(userName: string) {
    try {
        const { data } = await api.get(`/users/profile/${userName}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error(`Unexpected error: ${error}`);
    }
}