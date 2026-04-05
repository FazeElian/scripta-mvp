import { useForm } from "react-hook-form";
import { useState } from "react";
import {
    Terminal,
    Braces,
    Cpu,
    Hash,
    Bug,
    Binary,
    type LucideIcon,
    Save,
    Link,
    AlertTriangle,
    User,
    Mail,
    Contact,
    Code,
    GitGraph
} from "lucide-react";

// Components for this view
import { PageTitle } from "@/components/app/atoms/PageTitle";
import { InputTextGroup } from "@/components/app/atoms/InputTextGroup";
import { InputTextAreaGroup } from "@/components/app/atoms/InputTextAreaGroup";

// Styles
import "@/assets/css/components/Account.css";
import "@/assets/css/components/Forms.css";

// Avatar config
type AvatarConfig = {
    icon: LucideIcon;
    className: string;
}

const avatarConfig: Record<string, AvatarConfig> = {
    Terminal: { icon: Terminal, className: "avatar--yellow" },
    Braces:   { icon: Braces,   className: "avatar--pink" },
    Cpu:      { icon: Cpu,      className: "avatar--purple" },
    Code:     { icon: Code,     className: "avatar--blue" },
    Hash:     { icon: Hash,     className: "avatar--sky-blue" },
    Bug:      { icon: Bug,      className: "avatar--seagreen" },
    Binary:   { icon: Binary,   className: "avatar--orange" },
    GitGraph: { icon: GitGraph, className: "avatar--red" },
};

const AccountView = () => {
    const [selectedAvatar, setSelectedAvatar] = useState("Terminal");
    const CurrentIcon = avatarConfig[selectedAvatar].icon;

    const { register, handleSubmit } = useForm<any>();

    return (
        <main className="app-content">
            <PageTitle
                title="Account"
                subtitle="Manage your account information"
            />

            <form method="POST" onSubmit={handleSubmit(() => "")}>
                <section className="account">
                    <div className="form-head">
                        <div className="form-head--title">
                            <Contact />
                            <h1>Select Avatar</h1>
                        </div>
                    </div>
                    <div className="account-avatars">
                        <div className="account-avatar-current-wrapper">
                            <div className={`account-avatar-item account-avatar-current btm-snippet-card-author--avatar ${avatarConfig[selectedAvatar].className}`}>
                                <CurrentIcon size={30} />
                            </div>
                            <span>Current Avatar</span>
                        </div>
                        <div className="account-avatars-list">
                            {Object.keys(avatarConfig).map(id => {
                                const Icon = avatarConfig[id].icon;
                                return (
                                    <button
                                        key={id}
                                        type="button"
                                        className={`account-avatar-item btm-snippet-card-author--avatar ${avatarConfig[id].className} ${selectedAvatar === id ? "account-avatar-active" : ""}`}
                                        onClick={() => setSelectedAvatar(id)}
                                    >
                                        <Icon />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="account">
                    <div className="form-head">
                        <div className="form-head--title">
                            <h1>Basic Information</h1>
                        </div>
                    </div>
                    <div className="account-form">
                        <div className="input-group-3">
                            <InputTextGroup
                                label="Display Name"
                                name="fullName"
                                placeholder="John Doe"
                                icon={User}
                                register={register}
                                type="text"
                            />
                            <InputTextGroup
                                label="Username"
                                name="userName"
                                placeholder="johndoe"
                                icon={User}
                                register={register}
                                type="text"
                            />
                            <InputTextGroup
                                label="Email"
                                name="email"
                                placeholder="john@example.com"
                                icon={Mail}
                                register={register}
                                type="email"
                            />
                        </div>

                        <InputTextAreaGroup
                            label="Bio"
                            name="bio"
                            placeholder="Tell us about yourself..."
                        />

                        <div className="input-group-3">
                            <InputTextGroup
                                label="Website"
                                name="website"
                                placeholder="https://johndoe.dev"
                                icon={Link}
                                register={register}
                                type="text"
                            />
                            <InputTextGroup
                                label="Github Username"
                                name="githubUser"
                                placeholder="@johndoe"
                                icon={Link}
                                register={register}
                                type="text"
                            />
                        </div>
                    </div>
                </section>

                <div className="account-save">
                    <button type="submit" className="account-save-btn">
                        <Save />
                        Save Changes
                    </button>
                </div>
            </form>

            <hr className="account-divider" />

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
        </main>
    );
};

export default AccountView;