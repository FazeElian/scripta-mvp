import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Types
import { type RegisterUser, type LoginUser, type UpdateProfile } from "@/types/users.types";

// API Calls
import { register, login, updateProfile } from "./api";

// Queries
import { useGetAuthenticatedUser } from "./queries";

// Register user mutation
export const useRegisterMutation = () => {
    // Query client
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: RegisterUser) => register(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response);

            // Invalidate queries
            queryClient.invalidateQueries({
                queryKey: ["auth-user"]
            })
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    })
}

// Login mutation
export const useLoginMutation = () => {
    // Query client
    const queryClient = useQueryClient()

    // Redirection
    const redirect = useNavigate()

    return useMutation({
        mutationFn: (data: LoginUser) => login(data),
        onSuccess: async (response) => {
            // Save JWT on localStorage
            localStorage.setItem("AUTH_TOKEN", response.token);

            // Invalidate queries
            await queryClient.invalidateQueries({
                queryKey: ["auth-user"]
            })

            // Redirect to app dashboard
            redirect("/app/dashboard", {
                replace: true
            });
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}

// Update profilr
export const useUpdateProfileMutation = () => {
    // Redirection
    const redirect = useNavigate()

    // Refetch user info
    const { refetch } = useGetAuthenticatedUser();

    return useMutation({
        mutationFn: (data: UpdateProfile) => updateProfile(data),
        onSuccess: (response) => {
            // Sucess toast
            toast.success(response.message);

            // Refetch user
            refetch()

            // Redirection to account main view
            redirect("/app/account")
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}