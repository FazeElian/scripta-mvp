// Components for this view
import { PageTitle } from "@/components/app/atoms/PageTitle"

const AccountView = () => {
    return (
        <main className="app-content">
            <PageTitle
                title="My Account"
                subtitle="Manage your account information"
            />
        </main>
    )
}

export default AccountView