// Styles
import "@/assets/css/components/SnippetsGallery.css";

// Sub component
import { PublicSnippetCard } from "../atoms/PublicSnippetCard";

type PublicSnippetCardType = {
    title: string;
    description: string;
    lang: string;
    updatedAt: string;
}

type PublicSnippetsGalleryType = {
    snippets: PublicSnippetCardType[]
}

const PublicSnippetsGallery = ({ snippets } : PublicSnippetsGalleryType) => {
    return (
        <>
            <h2 className="profile-snippets-title">Public Snippets ({snippets.length})</h2>
            <section className="snippets-gallery">
                {snippets.map((item) => (
                    <PublicSnippetCard key={item.title} {...item} />
                ))}
            </section>
        </>
    )
}

export { PublicSnippetsGallery }