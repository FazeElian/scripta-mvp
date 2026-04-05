import type { User } from "@/types/users.types";
import { createContext, useContext } from "react";

interface UserContextType {
    user: User | null;
}

export const UserContext = createContext<UserContextType>({
    user: null,
});

export const useUser = () => useContext(UserContext);