// Components for this view
import { PageTitle } from "@/components/app/atoms/PageTitle"
import { ExploreSnippets } from "@/components/app/molecules/ExploreSnippets"

// Title hook
import useDocumentTitle from "@/hooks/useDocumentTitle";

const ExploreView = () => {
    // Title
    useDocumentTitle("Explore Community | Scripta")

    return (
        <main className="app-content app-public">
            <PageTitle
                title="Explore Community"
                subtitle="Discover and learn from code snippets shared by the community"
            />
            <ExploreSnippets />
        </main>
    )
}

export default ExploreView