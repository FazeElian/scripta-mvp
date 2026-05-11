// Components for this view
import { PageTitle } from "@/components/app/atoms/PageTitle"
import { DashboardSnippets } from "@/components/app/molecules/DashboardSnippets"
import { QuickStats } from "@/components/app/molecules/QuickStats"

// Get user from gloal state (context)
import { useUser } from "@/services/users/context"

// Title hook
import useDocumentTitle from "@/hooks/useDocumentTitle";

const DashboardView = () => {
    // Title
    useDocumentTitle("Dashboard | Scripta")

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
            <DashboardSnippets />
        </main>
    )
}

export default DashboardView