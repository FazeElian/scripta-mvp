import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query";

// Styles
import "@/assets/css/components/SideBar.css";

// Icons & images
import {
    Code,
    FilePlus,
    Telescope,
    UserRoundCog,
    SquareArrowRightExit,
    ExternalLink,
    Terminal,
} from "lucide-react";
import Logo from "@/assets/img/logo.png";

// lists
import { avatars } from "@/lib/avatars";

// global context
import { useUser } from "@/services/users/context";
import { PageLoader } from "./atoms/PageLoader";

const listSideBar = [
    {
        name: "My Snippets",
        icon: Code,
        link: "/app/dashboard",
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
        link: "/explore",
        strokeWidth: 2,
        withTarget: true
    },
    {
        name: "Manage Account",
        icon: UserRoundCog,
        link: "/app/account",
        strokeWidth: 2.4
    },
];

const SideBar = () => {
    const location = useLocation();
    const redirect = useNavigate();
    const queryClient = useQueryClient();

    const logOut = () => {
        localStorage.removeItem("AUTH_TOKEN");

        // Invalidate all
        queryClient.setQueryData(["auth-user"], null);
        queryClient.clear();

        redirect("/auth/login");
    };

    const { user, isLoading } = useUser();
    if (isLoading) {
        return <PageLoader />;
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    const avatarKey = user.avatar ?? "Terminal";
    const AvatarIcon = avatars[avatarKey].icon ?? Terminal;
    const avatarClass = avatars[avatarKey].className ?? "avatar--yellow";

    return (
        <>
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
                            target={`${item.withTarget === true && "_blank"}`}
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
                        <Link to={`/profile/${user.userName}`} target="_blank">
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
        </>
    )
}

export { SideBar }