// Styles
import "@/assets/css/components/SnippetsHeader.css";

// Sub components
import { SortByRecency } from "../atoms/SortByRecency";
import { SortByLang } from "../atoms/SortByLang";
import { SearchBarExplore } from "../atoms/SearchBarExplore";

// lists
import { langOptions } from "@/lib/langs";

type SnippetsHeaderExploreType = {
    setQuery: (query: string) => void;
    sortRecency: string;
    setSortRecency: (value: string) => void;
    sortLang: string;
    setSortLang: (value: string) => void;
    tagFilter: string;
    setTagFilter: (tag: string) => void;
}

const SnippetsHeaderExplore = ({
    setQuery, sortRecency, setSortRecency,
    sortLang, setSortLang, tagFilter, setTagFilter
}: SnippetsHeaderExploreType) => {
    const recencyOptions = [
        "Most Recent",
        "Least Recent",
        "Last Modified",
    ];

    return (
        <div className="snippets-header">
            <SearchBarExplore
                placeholder="Search Community Snippets..."
                setQuery={setQuery}
                tagFilter={tagFilter}
                setTagFilter={setTagFilter}
            />
            <div className="snippets-filters">
                <SortByRecency options={recencyOptions} value={sortRecency} onChange={setSortRecency} />
                <SortByLang options={langOptions} value={sortLang} onChange={setSortLang} />
            </div>
        </div>
    )
}

export { SnippetsHeaderExplore };