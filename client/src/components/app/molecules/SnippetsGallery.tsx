import { Link } from "react-router-dom";
import { FileCode } from 'lucide-react';

// Styles
import "@/assets/css/components/SnippetsGallery.css";

// Sub component
import { SnippetCard } from "../atoms/SnippetCard";
import { useGetAllSnippetsByOwner } from "@/services/snippets/queries";

const SnippetsGallery = () => {
    const { data: snippets, isError, error } = useGetAllSnippetsByOwner()

    if(isError) return null;
    return (
        <>
            {snippets && snippets.length > 0 ? (
                <section className="snippets-gallery">
                    {snippets.map((item) => (
                        <SnippetCard key={item.id || item.title} {...item} />
                    ))}
                </section>
            ) : isError ? (
                <div>
                    {error}
                </div>
            ) : (
                <div className="no-snippets">
                    <FileCode />
                    <div className="no-snippets-txt">
                        You haven't created your first snippet.
                        <Link to="/snippets/new">Create Snippet</Link>
                    </div>
                </div>
            )}
        </>
    )
}

export { SnippetsGallery }