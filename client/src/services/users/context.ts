import type { User } from "@/types/users.types";
import { createContext, useContext } from "react";

interface UserContextType {
    user: User | null;
    isLoading: boolean;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    isLoading: false
});

export const useUser = () => useContext(UserContext);