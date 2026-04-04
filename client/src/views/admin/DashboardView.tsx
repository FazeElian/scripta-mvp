// Components for this view
import { PageTitle } from "@/components/admin/atoms/PageTitle"
import QuickStats from "@/components/admin/molecules/QuickStats"

const DashboardView = () => {
    return (
        <main className="admin-content">
            <PageTitle
                title="Welcome Back, John"
                subtitle="My Snippets"
                button={true}
            />
            <QuickStats />
        </main>
    )
}

export default DashboardView