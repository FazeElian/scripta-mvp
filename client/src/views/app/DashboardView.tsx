// Components for this view
import { PageTitle } from "@/components/app/atoms/PageTitle"
import { QuickStats } from "@/components/app/molecules/QuickStats"
import { SnippetsGallery } from "@/components/app/molecules/SnippetsGallery"
import { SnippetsHeader } from "@/components/app/molecules/SnippetsHeader"

const DashboardView = () => {
    return (
        <main className="app-content">
            <PageTitle
                title="Welcome Back, John"
                subtitle="My Snippets"
                button={true}
            />
            <QuickStats />
            <SnippetsHeader />
            <SnippetsGallery />
        </main>
    )
}

export default DashboardView