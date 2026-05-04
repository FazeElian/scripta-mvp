// sub comps
import { useState } from "react"
import { SnippetsGallery } from "./SnippetsGallery"
import { SnippetsHeader } from "./SnippetsHeader"

const DashboardSnippets = () => {
    const [query, setQuery] = useState("");
    const [sortDate, setSortDate] = useState("Last Modified");
    const [sortLang, setSortLang] = useState("All");

    return (
        <>
            <SnippetsHeader
                setQuery={setQuery}
                sortDate={sortDate}
                setSortDate={setSortDate}
                sortLang={sortLang}
                setSortLang={setSortLang}
            />
            <SnippetsGallery
                query={query}
                sortDate={sortDate}
                sortLang={sortLang}
            />
        </>
    )
}

export { DashboardSnippets }