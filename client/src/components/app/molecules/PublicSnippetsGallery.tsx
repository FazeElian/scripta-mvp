import { GlobeOff } from "lucide-react";

// Styles
import "@/assets/css/components/SnippetsGallery.css";

// Sub component
import { PublicSnippetCard } from "../atoms/PublicSnippetCard";

// Type
import type { AllSnippets } from "@/types/snippets.type";

type PublicSnippetsGalleryType = {
    snippets: AllSnippets[]
}

const PublicSnippetsGallery = ({ snippets } : PublicSnippetsGalleryType) => {
    return (
        <>
            <h2 className="profile-snippets-title">Public Snippets ({snippets.length})</h2>
            {snippets.length === 0 ? (
                <div className="no-snippets">
                    <GlobeOff />
                    <div className="no-snippets-txt">
                        This user doesn't have any public snippet
                    </div>
                </div>
            ): (
                <section className="snippets-gallery snippets-gallery-explore">
                    {snippets.map((item) => (
                        <PublicSnippetCard key={item.title} {...item} />
                    ))}
                </section>
            )}
        </>
    )
}

export { PublicSnippetsGallery }