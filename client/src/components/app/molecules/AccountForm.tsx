import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
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
    User,
    Mail,
    Contact,
    Code,
    GitGraph,
    Loader,
} from "lucide-react";

// Sub components
import { InputTextGroup } from "../atoms/InputTextGroup";
import { InputTextAreaGroup } from "../atoms/InputTextAreaGroup";

// User from context
import { useUser } from "@/services/users/context";

// Validation schema
import { updateProfileSchema } from "@/schemas/user.schema";

// Mutation
import { useUpdateProfileMutation } from "@/services/users/mutations";

// Avatar config
type AvatarConfig = {
    icon: LucideIcon;
    className: string;
}
type AvatarId = "Terminal" | "Braces" | "Cpu" | "Code" | "Hash" | "Bug" | "Binary" | "GitGraph";

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

const AccountForm = () => {
    const { user } = useUser();
    const defaultAvatar = (user?.avatar as AvatarId) ?? "Terminal";
    const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatar);
    const CurrentIcon = avatarConfig[selectedAvatar].icon;
    
    type UpdateProfileForm = z.infer<typeof updateProfileSchema>;
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<UpdateProfileForm>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            avatar: "Terminal",
            userName: user?.userName,
            fullName: user?.fullName,
            bio: user?.bio,
            website: user?.website,
            githubUser: user?.githubUser,
        }
    });

    const updateProfileMutation = useUpdateProfileMutation();
    const onSubmit = (formData: UpdateProfileForm) => {
        updateProfileMutation.mutate(formData, {
            onSuccess: (res) => {
                reset({
                    avatar: res.avatar,
                    userName: res.userName,
                    fullName: res.fullName,
                    bio: res.bio,
                    website: res.website,
                    githubUser: res.githubUser,
                })
            }
        });
    }

    return (
        <form method="POST" onSubmit={handleSubmit(onSubmit)}>
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
                                    onClick={() => {
                                        setSelectedAvatar(id as AvatarId);
                                        setValue("avatar", id as AvatarId);
                                    }}
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
                            error={errors.fullName}
                        />
                        <InputTextGroup
                            label="Username"
                            name="userName"
                            placeholder="johndoe"
                            icon={User}
                            register={register}
                            type="text"
                            error={errors.userName}
                        />
                        <div className="input-group">
                            <div className="input-group--label">
                                <Mail />
                                <label htmlFor="email">
                                    Email
                                </label>
                            </div>
                            <input
                                id="email"
                                type="email"
                                disabled
                                defaultValue={user?.email}
                                readOnly
                            />
                        </div>
                    </div>
                    <InputTextAreaGroup
                        label="Bio"
                        name="bio"
                        placeholder="Tell us about yourself..."
                        error={errors.bio}
                        register={register}
                    />
                    <div className="input-group-3">
                        <InputTextGroup
                            label="Website"
                            name="website"
                            placeholder="https://johndoe.dev"
                            icon={Link}
                            register={register}
                            type="text"
                            error={errors.website}
                        />
                        <InputTextGroup
                            label="Github Username"
                            name="githubUser"
                            placeholder="@johndoe"
                            icon={Link}
                            register={register}
                            type="text"
                            error={errors.githubUser}
                        />
                    </div>
                </div>
            </section>

            <div className="account-save">
                {updateProfileMutation.status === "pending" ? (
                    <button type="submit" className="account-save-btn" disabled>
                        <Loader />
                        Loading...
                    </button>
                ) : (
                    <button type="submit" className="account-save-btn">
                        <Save />
                        Save Changes
                    </button>
                )}
            </div>
        </form>
    )
}

export { AccountForm }