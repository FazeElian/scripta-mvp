import { Ghost } from "lucide-react";

// Styles
import "@/assets/css/components/SnippetsGallery.css";

// Sub component
import { SnippetCardExplore } from "../atoms/SnippetCardExplore";

// Query
import { useGetAllSnippets } from "@/services/snippets/queries";

const SnippetsGalleryExplore = () => {
    const { data: snippets, isError, error } = useGetAllSnippets()
    if(isError) return null;

    return (
        <>
            {snippets && snippets.length > 0 ? (
                <section className="snippets-gallery">
                    {snippets.map((item) => (
                        <SnippetCardExplore key={item.id || item.title} {...item} />
                    ))}
                </section>
            ) : isError ? (
                <div className="no-snippets">
                    {error}
                </div>
            ) : (
                <div className="no-snippets">
                    <Ghost />
                    <div className="no-snippets-txt">
                        The community hasn't shared any snippet yet
                    </div>
                </div>
            )}
        </>
    )
}

export { SnippetsGalleryExplore }