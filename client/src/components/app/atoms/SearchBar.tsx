import { Search } from "lucide-react";

type SearchBarType = {
    placeholder: string;
}

const SearchBar = ({ placeholder } : SearchBarType) => {
    return (
        <div className="search-bar">
            <Search />
            <input
                type="text"
                placeholder={placeholder}
            />
        </div>
    )
}

export { SearchBar };