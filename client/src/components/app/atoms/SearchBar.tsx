import { Search } from "lucide-react";

type SearchBarType = {
    placeholder: string;
    setQuery: (query: string) => void;
}

const SearchBar = ({ placeholder, setQuery } : SearchBarType) => {
    return (
        <div className="search-bar">
            <Search />
            <input
                type="text"
                placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    )
}

export { SearchBar };