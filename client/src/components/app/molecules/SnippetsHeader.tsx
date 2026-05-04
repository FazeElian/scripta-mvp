// Styles
import "@/assets/css/components/SnippetsHeader.css";

// Sub Components
import { SearchBar } from "../atoms/SearchBar";
import { SortByDate } from "../atoms/SortByDate";
import { SortByLang } from "../atoms/SortByLang";

// lists
import { langOptions } from "@/lib/langs";

type SnippetsHeaderType = {
    setQuery: (query: string) => void;
    sortDate: string;
    setSortDate: (value: string) => void;
    sortLang: string;
    setSortLang: (value: string) => void;
}

const SnippetsHeader = ({
    setQuery,
    sortDate,
    setSortDate,
    sortLang,
    setSortLang
} : SnippetsHeaderType) => {
    const dateSortOptions = [
        "Newest First",
        "Oldest First",
        "Recently Updated",
        "Last Modified",
    ];

    return (
        <form className="snippets-header" method="post">
            <SearchBar
                placeholder="Search Snippets..."
                setQuery={setQuery}
            />
            <div className="snippets-filters">
                <SortByDate options={dateSortOptions} value={sortDate} onChange={setSortDate} />
                <SortByLang options={langOptions} value={sortLang} onChange={setSortLang} />
            </div>
        </form>
    )
}

export { SnippetsHeader };