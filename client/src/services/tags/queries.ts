import { useQuery } from "@tanstack/react-query";
import { searchTags } from "./api";

export const useSearchTags = (query: string) => {
    return useQuery({
        queryKey: ["tags", query],
        queryFn: () => searchTags(query),
        enabled: query.length > 1,
    });
};