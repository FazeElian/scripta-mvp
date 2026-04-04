// Components for this view
import { PageTitle } from "@/components/admin/atoms/PageTitle"
import { QuickStats } from "@/components/admin/molecules/QuickStats"
import { SnippetsGallery } from "@/components/admin/molecules/SnippetsGallery"
import { SnippetsHeader } from "@/components/admin/molecules/SnippetsHeader"

const DashboardView = () => {
    return (
        <main className="admin-content">
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