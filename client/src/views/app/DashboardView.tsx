// Components for this view
import { PageTitle } from "@/components/app/atoms/PageTitle"
import { QuickStats } from "@/components/app/molecules/QuickStats"
import { SnippetsGallery } from "@/components/app/molecules/SnippetsGallery"
import { SnippetsHeader } from "@/components/app/molecules/SnippetsHeader"

// Get user from gloal state (context)
import { useUser } from "@/services/users/context"

const DashboardView = () => {
    const { user } = useUser();

    if (!user) return null;
    const firstName = user.fullName.split(" ")[0];

    return (
        <main className="app-content">
            <PageTitle
                title={`Welcome Back, ${firstName} 👋`}
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