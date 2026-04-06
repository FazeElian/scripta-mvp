import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"

// Styles
import "@/assets/css/components/SideBar.css";

// Icons & images
import {
    Code,
    FolderOpen,
    FilePlus,
    Telescope,
    UserRoundCog,
    SquareArrowRightExit,
    ExternalLink,
    type LucideIcon,
    Terminal,
    Braces,
    Cpu,
    Hash,
    Bug,
    Binary,
    GitGraph
} from "lucide-react";
import Logo from "@/assets/img/logo.png";

// Query
import { useGetAuthenticatedUser } from "@/services/users/queries";

// Type
import type { User } from "@/types/users.types";

// Context for user
import { UserContext } from "@/services/users/context";

// Loader comp
import { PageLoader } from "./atoms/PageLoader";

const listSideBar = [
    {
        name: "My Snippets",
        icon: Code,
        link: "/app/dashboard",
        strokeWidth: 2.4
    },
    {
        name: "My Files",
        icon: FolderOpen,
        link: "/app/files",
        strokeWidth: 2.4
    },
    {
        name: "New Snippet",
        icon: FilePlus,
        link: "/app/snippets/new",
        strokeWidth: 2.4
    },
    {
        name: "Explore Community",
        icon: Telescope,
        link: "/app/explore",
        strokeWidth: 2
    },
    {
        name: "Manage Account",
        icon: UserRoundCog,
        link: "/app/account",
        strokeWidth: 2.4
    },
];

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

const SideBar = () => {
    const location = useLocation();
    const redirect = useNavigate();

    const logOut = () => {
        localStorage.removeItem("AUTH_TOKEN");
        redirect("/auth/login/");
    }

    // get authenticated user result from query
    const { data: userResult, isError, isLoading } = useGetAuthenticatedUser();

    if (isLoading) {
        return <PageLoader />;
    }

    if (isError) {
        redirect("/auth/login")
    }

    const user = userResult as User;
    const avatarKey = user?.avatar ?? "Terminal";
    const AvatarIcon = avatarConfig[avatarKey]?.icon ?? Terminal;
    const avatarClass = avatarConfig[avatarKey]?.className ?? "avatar--yellow";

    return (
        <UserContext.Provider value={{ user }}>
            <nav className="side-bar">
                <div className="top-side-bar">
                    <img src={Logo} alt="" />
                </div>
                <ul className="list-side-bar">
                    {listSideBar.map((item) => (
                        <Link
                            to={item.link}
                            className={`
                                ${location.pathname === item.link ?
                                    "item-list-side-bar item-list-side-bar--active" :
                                    "item-list-side-bar"
                                }`
                            }
                            key={item.name}
                        >
                            {<item.icon strokeWidth={item.strokeWidth} />}
                            {item.name}
                        </Link>
                    ))}
                </ul>
                <div className="btm-side-bar">
                    <div className="user-side-bar">
                        <div className="avatar-side-bar">
                            <div className={`avatar-icon-side-bar btm-snippet-card-author--avatar ${avatarClass}`}>
                                <AvatarIcon />
                            </div>
                            <div className="txt-user-side-bar">
                                <h1>{user.fullName}</h1>
                                <h2>{user.email}</h2>
                            </div>
                        </div>
                        <Link to={`/app/profile/${user.userName}`} target="_blank">
                            <ExternalLink />
                        </Link>
                    </div>
                    <div className="logout-side-bar">
                        <button
                            className="btn-logout"
                            onClick={logOut}
                            type="button"
                        >
                            <SquareArrowRightExit />
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>
            <Outlet />
        </UserContext.Provider>
    )
}

export { SideBar }