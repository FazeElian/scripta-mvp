// global state
import { UserContext } from "@/services/users/context";

// Query
import { useGetAuthenticatedUser } from "@/services/users/queries";

type UserProviderType = {
    children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderType) {
    const { data, isLoading } = useGetAuthenticatedUser();

    const user = data ?? null;
    return (
        <UserContext.Provider value={{ user, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}