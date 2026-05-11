import { Search, X } from "lucide-react";
import { useState, useRef } from "react";

type SearchBarExploreType = {
    placeholder: string;
    setQuery: (query: string) => void;
    setTagFilter: (tag: string) => void;
    tagFilter: string;
}

const SearchBarExplore = ({ placeholder, setQuery, setTagFilter, tagFilter }: SearchBarExploreType) => {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const confirmTag = (value: string) => {
        const tag = value.startsWith("#") ? value.slice(1).trim() : value.trim();
        if (tag) {
            setTagFilter(tag);
            setInputValue("");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (!value.startsWith("#")) {
            setQuery(value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.startsWith("#")) {
            e.preventDefault();
            confirmTag(inputValue);
            return;
        }

        if (e.key === " " && inputValue.startsWith("#") && inputValue.length > 1) {
            e.preventDefault();
            confirmTag(inputValue);
            return;
        }

        if (e.key === "Backspace" && !inputValue && tagFilter) {
            setTagFilter("");
        }
    };

    const removeTag = () => {
        setTagFilter("");
        setInputValue("");
        inputRef.current?.focus();
    };

    return (
        <div className="search-bar">
            <Search />
            {tagFilter && (
                <span className="search-bar--tag-chip">
                    #{tagFilter}
                    <button type="button" onClick={removeTag}>
                        <X size={11} />
                    </button>
                </span>
            )}
            <input
                ref={inputRef}
                type="text"
                placeholder={tagFilter ? "" : placeholder}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={inputValue}
            />
        </div>
    )
}

export { SearchBarExplore };