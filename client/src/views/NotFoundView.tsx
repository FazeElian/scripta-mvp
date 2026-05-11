import { Link } from "react-router-dom";
import { Home } from "lucide-react";

// Styles
import "@/assets/css/components/NotFound.css";

// Background comp
import { AuthBackground } from "@/components/app/molecules/AuthBackground"

// Title hook
import useDocumentTitle from "@/hooks/useDocumentTitle";

const NotFoundView = () => {
    // Title
    useDocumentTitle("Page Not Found")

    return (
        <main className="not-found">
            <AuthBackground />
            <h1>404</h1>
            <h2>Page not Found</h2>
            <Link to="/">
                <Home />
                Come Back To Home
            </Link>
        </main>
    )
}

export default NotFoundView