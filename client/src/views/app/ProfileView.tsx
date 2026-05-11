import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Binary, Braces, Bug, Calendar, Code, Cpu, GitGraph, Hash,
    Link as LinkIcon, MoveLeft, Terminal, type LucideIcon
} from "lucide-react";
import { toast } from "sonner";
import Github from "@/assets/img/github.png";

// Styles
import "@/assets/css/components/Profile.css";

// Components
import { PublicSnippetsGallery } from "@/components/app/molecules/PublicSnippetsGallery";
import { PageLoader } from "@/components/app/atoms/PageLoader";

// Query
import { useGetProfile } from "@/services/users/queries";

// Type
import type { User } from "@/types/users.types";

// Utils
import { formatProfileDate } from "@/utils/formatProfileDate";
import { formatWebsite } from "@/utils/formatWebsite";

// Title hook
import useDocumentTitle from "@/hooks/useDocumentTitle";

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

const ProfileView = () => {
    const redirect = useNavigate();
    const { userName } = useParams();
    const cleanUserName = userName?.replace("@", "");
    const { data, isLoading, isError } = useGetProfile(cleanUserName as string);

    // Title
    useDocumentTitle(
        data?.userName
            ? `${data.userName} | Scripta`
            : "Profile | Scripta"
    );

    if (isLoading) return <PageLoader />;

    const user = data as User;

    if (!user || isError) {
        redirect("/app/dashboard");
        toast.error("This user doesn't exist or its account was deleted.");
        return null;
    }

    const avatarKey = user.avatar ?? "Terminal";
    const AvatarIcon = avatarConfig[avatarKey]?.icon ?? Terminal;
    const avatarClass = avatarConfig[avatarKey]?.className ?? "avatar--yellow";

    return (
        <main className="app-content app-public">
            <Link to="/explore" className="profile-top">
                <MoveLeft />
                Come Back to Explore
            </Link>

            <div className="profile-info">
                <div className={`profile-avatar btm-snippet-card-author--avatar ${avatarClass}`}>
                    <AvatarIcon />
                </div>
                <div className="profile-txt">
                    <h1>{user.fullName}</h1>
                    <h2>{user.userName}</h2>
                    <p>{user.bio}</p>

                    <div className="btm-profile-txt">
                        {user.website &&
                            <Link to={user.website} className="btm-profile-txt--item">
                                <LinkIcon />
                                {formatWebsite(user.website)}
                            </Link>
                        }
                        <div className="btm-profile-txt--item">
                            <Calendar />
                            Member since {formatProfileDate(user.memberSince)}
                        </div>
                    </div>
                </div>
                {user.githubUser &&
                    <Link
                        to={`https://github.com/${user.githubUser}`}
                        className="btn-github-profile"
                        target="_blank"
                    >
                        <img src={Github} alt="Github" />
                    </Link>
                }
            </div>

            <PublicSnippetsGallery snippets={data.snippets} />
        </main>
    )
}

export default ProfileView