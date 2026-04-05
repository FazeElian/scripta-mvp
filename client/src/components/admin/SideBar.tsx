import { Link, Outlet, useLocation } from "react-router-dom"

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
    ExternalLink
} from "lucide-react";
import Logo from "@/assets/img/logo.png";

const listSideBar = [
    {
        name: "My Snippets",
        icon: Code,
        link: "/dashboard",
        strokeWidth: 2.4
    },
    {
        name: "My Files",
        icon: FolderOpen,
        link: "/files",
        strokeWidth: 2.4
    },
    {
        name: "New Snippet",
        icon: FilePlus,
        link: "/snippets/new",
        strokeWidth: 2.4
    },
    {
        name: "Explore Community",
        icon: Telescope,
        link: "/explore",
        strokeWidth: 2
    },
    {
        name: "Manage Account",
        icon: UserRoundCog,
        link: "/account",
        strokeWidth: 2.4
    },
];

const SideBar = () => {
    const location = useLocation()

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
                        >
                            {<item.icon strokeWidth={item.strokeWidth} />}
                            {item.name}
                        </Link>
                    ))}
                </ul>
                <div className="btm-side-bar">
                    <div className="user-side-bar">
                        <div className="avatar-side-bar">
                            <img src="https://cdn.dribbble.com/userupload/26458491/file/still-b40631fe6510df808dfe57d8ae67cb72.png?resize=400x0" alt="" />
                            <div className="txt-user-side-bar">
                                <h1>John Doe</h1>
                                <h2>john@example.com</h2>
                            </div>
                        </div>
                        <Link to="/profile">
                            <ExternalLink />
                        </Link>
                    </div>
                    <div className="logout-side-bar">
                        <button className="btn-logout">
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