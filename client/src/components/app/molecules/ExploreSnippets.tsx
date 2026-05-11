import { useState } from "react"
import { SnippetsHeaderExplore } from "./SnippetsHeaderExplore";
import { SnippetsGalleryExplore } from "./SnippetsGalleryExplore";

const ExploreSnippets = () => {
    const [query, setQuery] = useState("");
    const [sortRecency, setSortRecency] = useState("Most Recent");
    const [sortLang, setSortLang] = useState("All");
    const [tagFilter, setTagFilter] = useState("");

    return (
        <>
            <SnippetsHeaderExplore
                setQuery={setQuery}
                sortRecency={sortRecency}
                setSortRecency={setSortRecency}
                sortLang={sortLang}
                setSortLang={setSortLang}
                tagFilter={tagFilter}
                setTagFilter={setTagFilter}
            />
            <SnippetsGalleryExplore
                key={`${query}-${sortRecency}-${sortLang}-${tagFilter}`}
                query={query}
                sortRecency={sortRecency}
                sortLang={sortLang}
                tagFilter={tagFilter}
            />
        </>
    )
}

export { ExploreSnippets }