import { useQuery } from "@tanstack/react-query"

// API Calls
import { getAuthenticatedUser, getProfile, getStats } from "./api"

export const useGetAuthenticatedUser = () => {
    return useQuery({
        queryKey: ["auth-user"],
        queryFn: getAuthenticatedUser,
        retry: 1,
        refetchOnWindowFocus: false,
    });
}

export const useGetProfile = (userName: string) => {
    return useQuery({
        queryKey: [`profile-${userName}`],
        queryFn: () => getProfile(userName),
        retry: 1,
        refetchOnWindowFocus: false
    });
}

export const useGetStats = () => {
    return useQuery({
        queryKey: ["user-stats"],
        queryFn: getStats,
        retry: 1,
        refetchOnWindowFocus: false
    });
}