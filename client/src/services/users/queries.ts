import { useQuery } from "@tanstack/react-query"

// API Calls
import { getAuthenticatedUser } from "./api"

export const useGetAuthenticatedUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getAuthenticatedUser,
        retry: 1,
        refetchOnWindowFocus: false
    });
}