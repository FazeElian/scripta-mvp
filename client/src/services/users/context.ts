import type { LoginUserResponse } from "@/types/users.types";
import { createContext, useContext } from "react";

interface UserContextType {
    user: LoginUserResponse | null;
}

export const UserContext = createContext<UserContextType>({
    user: null,
});

export const useUser = () => useContext(UserContext);