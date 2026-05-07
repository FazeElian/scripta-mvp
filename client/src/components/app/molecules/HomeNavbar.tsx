import { Link } from "react-router-dom";
import { useState } from "react";

// Images & icons
import Logo from "@/assets/img/logo.webp";
import { ArrowRight, Menu, X } from "lucide-react";

// user from context
import { useUser } from "@/services/users/context";

const HomeNavbar = () => {
    const { user } = useUser();
    // const [lang, setLang] = useState("EN");
    const [menuOpen, setMenuOpen] = useState(false);

    // const handleLang = () => {
    //     setLang((prev) => prev === "EN" ? "ES" : "EN");
    // };

    return (
        <nav className="home-nav">
            <div className="home-nav-logo">
                <img src={Logo} alt="Scripta Logo" fetchPriority="high" width={120} height={40} />
            </div>
                
            <ul className="home-nav-list">
                <li>Features</li>
                <li>Use Cases</li>
                <li>Community</li>
            </ul>

            <div className="home-nav-btns">
                {/* <button type="button" onClick={handleLang}>
                    <Languages />
                    {lang}
                </button> */}
                <div className="home-nav-btns-auth">
                    {user ? (
                        <Link to="/app/dashboard" className="home-nav-dashboard-btn">
                            Go to Dashboard
                            <ArrowRight strokeWidth={2.2} />
                        </Link>
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
                        <li onClick={() => setMenuOpen(false)}>Features</li>
                        <li onClick={() => setMenuOpen(false)}>Use Cases</li>
                        <li onClick={() => setMenuOpen(false)}>Community</li>
                    </ul>
                    <div className="home-nav-mobile-auth">
                        {user ? (
                            <Link to="/app/dashboard" className="home-nav-dashboard-btn" onClick={() => setMenuOpen(false)}>
                                Go to Dashboard
                                <ArrowRight strokeWidth={2.2} />
                            </Link>
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
    );
};

export { HomeNavbar };