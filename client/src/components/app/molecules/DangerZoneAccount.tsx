import { AlertTriangle } from "lucide-react";

const DangerZoneAccount = () => {
    return (
        <section className="account account-danger">
            <h3 className="account-title account-title-danger">Danger Zone</h3>
            <div className="account-danger-content">
                <div>
                    <h4>Delete Account</h4>
                    <p>Permanently remove your account and all your saved snippets. This action is irreversible.</p>
                </div>
                <button type="button" className="account-danger-btn">
                    <AlertTriangle size={16} />
                    Delete Account
                </button>
            </div>
        </section>
    )
}

export { DangerZoneAccount };