// Components for this view
import { PageTitle } from "@/components/app/atoms/PageTitle";
import { DangerZoneAccount } from "@/components/app/molecules/DangerZoneAccount";
import { AccountForm } from "@/components/app/molecules/AccountForm";

// Styles
import "@/assets/css/components/Account.css";
import "@/assets/css/components/Forms.css";

const AccountView = () => {
    return (
        <main className="app-content">
            <PageTitle
                title="Account"
                subtitle="Manage your account information"
            />

            <AccountForm />
            <hr className="account-divider" />
            <DangerZoneAccount />
        </main>
    );
};

export default AccountView;