import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Types
import { type RegisterUser, type LoginUser } from "@/types/users.types";

// API Calls
import { register, login } from "./api";

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
                queryKey: ["users"]
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
        onSuccess: (response) => {
            // Save JWT on localStorage
            localStorage.setItem("AUTH_TOKEN", response.token);

            // Invalidate queries
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })

            // Redirect to app dashboard
            redirect("/app/dashboard")
        },
        onError: (error: Error) => {
            const message = error.message;
            toast.error(message);
        },
    })
}