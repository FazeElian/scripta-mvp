// Components for this view
import { PageTitle } from "@/components/admin/atoms/PageTitle"

const AccountView = () => {
    return (
        <main className="admin-content">
            <PageTitle
                title="My Account"
                subtitle="Manage your account information"
            />
        </main>
    )
}

export default AccountView