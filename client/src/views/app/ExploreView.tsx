// Components for this view
import { PageTitle } from "@/components/app/atoms/PageTitle"
import { SnippetsGalleryExplore } from "@/components/app/molecules/SnippetsGalleryExplore"
import { SnippetsHeaderExplore } from "@/components/app/molecules/SnippetsHeaderExplore"

const ExploreView = () => {
    return (
        <main className="app-content">
            <PageTitle
                title="Explore Community"
                subtitle="Discover and learn from code snippets shared by the community"
            />
            <SnippetsHeaderExplore />
            <SnippetsGalleryExplore />
        </main>
    )
}

export default ExploreView