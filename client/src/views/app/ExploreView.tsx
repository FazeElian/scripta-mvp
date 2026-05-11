// Components for this view
import { PageTitle } from "@/components/app/atoms/PageTitle"
import { ExploreSnippets } from "@/components/app/molecules/ExploreSnippets"

const ExploreView = () => {
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