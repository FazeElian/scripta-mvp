import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

// Images & icons
import Logo from "@/assets/img/logo.webp";
import { ArrowRight, Menu, X } from "lucide-react";

// user from context
import { useUser } from "@/services/users/context";

const HomeNavbar = () => {
    const { user, isLoading } = useUser();
    // const [lang, setLang] = useState("EN");
    const [menuOpen, setMenuOpen] = useState(false);

    // const handleLang = () => {
    //     setLang((prev) => prev === "EN" ? "ES" : "EN");
    // };

    return (
        <>
            <nav className="home-nav">
                <div className="home-nav-logo">
                    <img src={Logo} alt="Scripta Logo" fetchPriority="high" width={120} height={40} loading="lazy" />
                </div>
                    
                <ul className="home-nav-list">
                    <Link to="/">Home</Link>
                    <Link to="/explore">Explore</Link>
                    <Link to="#">Features</Link>
                    <Link to="#">Use Cases</Link>
                </ul>

                <div className="home-nav-btns">
                    {/* <button type="button" onClick={handleLang}>
                        <Languages />
                        {lang}
                    </button> */}
                    <div className="home-nav-btns-auth">
                        <div className="home-nav-btns-auth">
                            {user ? (
                                <Link to="/app/dashboard" className="home-nav-dashboard-btn">
                                    Go to Dashboard
                                    <ArrowRight strokeWidth={2.2} />
                                </Link>
                            ) : isLoading ? (
                                <div className="home-nav-skeleton">
                                    <span className="home-nav-skeleton-btn" />
                                    <span className="home-nav-skeleton-btn home-nav-skeleton-btn--wide" />
                                </div>
                            ) : (
                                <>
                                    <Link to="/auth/login" className="home-nav-login-btn">
                                        Login
                                    </Link>
                                    <Link to="/auth/register" className="home-nav-register-btn">
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    <button
                        type="button"
                        className="home-nav-menu-btn"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                    >
                        {menuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {menuOpen && (
                    <div className="home-nav-mobile-menu">
                        <ul className="home-nav-mobile-list">
                            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                            <Link to="#" onClick={() => setMenuOpen(false)}>Features</Link>
                            <Link to="#" onClick={() => setMenuOpen(false)}>Use Cases</Link>
                            <Link to="/explore" onClick={() => setMenuOpen(false)}>Explore</Link>
                        </ul>
                        <div className="home-nav-mobile-auth">
                            {user ? (
                                <Link to="/app/dashboard" className="home-nav-dashboard-btn" onClick={() => setMenuOpen(false)}>
                                    Go to Dashboard
                                    <ArrowRight strokeWidth={2.2} />
                                </Link>
                            ) : isLoading ? (
                                <div className="home-nav-skeleton">
                                    <span className="home-nav-skeleton-btn" />
                                    <span className="home-nav-skeleton-btn home-nav-skeleton-btn--wide" />
                                </div>
                            ) : (
                                <>
                                    <Link to="/auth/login" className="home-nav-login-btn" onClick={() => setMenuOpen(false)}>
                                        Login
                                    </Link>
                                    <Link to="/auth/register" className="home-nav-register-btn" onClick={() => setMenuOpen(false)}>
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
            <Outlet />
        </>
    );
};

export { HomeNavbar };