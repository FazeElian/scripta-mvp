// Components for this view
import { PageTitle } from "@/components/admin/atoms/PageTitle"
import { SnippetsGalleryExplore } from "@/components/admin/molecules/SnippetsGalleryExplore"
import { SnippetsHeaderExplore } from "@/components/admin/molecules/SnippetsHeaderExplore"

const ExploreView = () => {
    return (
        <main className="admin-content">
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