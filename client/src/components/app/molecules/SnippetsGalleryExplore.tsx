import { useState } from "react";
import { Plus, Ghost, Loader } from "lucide-react";

// Styles
import "@/assets/css/components/SnippetsGallery.css";

// Sub components
import { SnippetCardExplore } from "../atoms/SnippetCardExplore";

// Query
import { useGetExploreSnippets } from "@/services/snippets/queries";
import type { AllSnippets } from "@/types/snippets.type";

const PAGE_SIZE = 12;

const SnippetsGalleryExplore = ({ query, sortRecency, sortLang, tagFilter }: {
    query: string;
    sortRecency: string;
    sortLang: string;
    tagFilter: string;
}) => {
    const [offset, setOffset] = useState(0);
    const [accumulated, setAccumulated] = useState<AllSnippets[]>([]);

    // Query: convierte el tag a array de 1 elemento (o vacío) para compatibilidad con el servicio
    const { data, isError, isLoading, isFetching } = useGetExploreSnippets({
        query,
        tag: tagFilter,
        lang: sortLang,
        sort: sortRecency,
        limit: PAGE_SIZE,
        offset,
    });

    const snippets: AllSnippets[] = offset === 0
        ? (data?.snippets ?? [])
        : [...accumulated, ...(data?.snippets ?? [])];

    const hasMore = data ? snippets.length < data.total : false;

    const handleLoadMore = () => {
        setAccumulated(snippets);
        setOffset(prev => prev + PAGE_SIZE);
    };

    if (isError) return null;
    return (
        <>
            {isLoading && offset === 0 ? (
                <section className="snippets-gallery snippets-gallery-explore">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="snippet-card-skeleton">
                            <div className="skeleton-line skeleton-line--title" />
                            <div className="skeleton-line skeleton-line--subtitle" />
                            <div className="skeleton-line skeleton-line--body" />
                            <div className="skeleton-line skeleton-line--body skeleton-line--short" />
                            <div className="snippet-card-skeleton-footer">
                                <div className="skeleton-line skeleton-line--tag" />
                                <div className="skeleton-line skeleton-line--tag" />
                            </div>
                        </div>
                    ))}
                </section>
            ) : snippets.length > 0 ? (
                <>
                    <section className="snippets-gallery snippets-gallery-explore">
                        {snippets.map((item) => (
                            <SnippetCardExplore key={item.id || item.title} {...item} />
                        ))}
                    </section>
                    {hasMore && (
                        <button
                            className="btn-load-more"
                            onClick={handleLoadMore}
                            disabled={isFetching}
                        >
                            {isFetching
                                ? <><Loader className="btn-load-more--spin" /> Loading...</>
                                : <><Plus /> Load More</>
                            }
                        </button>
                    )}
                </>
            ) : (
                <div className="no-snippets">
                    <Ghost />
                    <div className="no-snippets-txt">
                        The community hasn't shared any snippet yet
                    </div>
                </div>
            )}
        </>
    );
};

export { SnippetsGalleryExplore };