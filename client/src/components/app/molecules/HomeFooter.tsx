import Logo from "@/assets/img/logo.webp";

const HomeFooter = () => {
    return (
        <footer className="home-footer">
            <div className="home-footer-logo">
                <img src={Logo} alt="Scripta Logo" fetchPriority="high" />
            </div>
            <p>© 2026 Scripta. Built by{" "}
                <a href="https://elianibarra.com/" target="_blank" rel="noreferrer" className="home-footer-link">Elián Ibarra</a>
                , Student at{" "}
                <a href="https://www.escuelaing.edu.co" target="_blank" rel="noreferrer" className="home-footer-link">ECI</a>.
            </p>
        </footer>
    );
};

export { HomeFooter };