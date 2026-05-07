import { Link } from "react-router-dom";
import { MoveLeft } from "lucide-react";

// Styles
import "@/assets/css/components/NotFound.css";

// Background comp
import { AuthBackground } from "@/components/app/molecules/AuthBackground"

export default function AppNotFoundView() {
    return (
        <main className="not-found not-found-app">
            <AuthBackground />
            <h1>404</h1>
            <h2>Page not Found</h2>
            <Link to="/app/dashboard">
                <MoveLeft />
                Come Back To Dashboard
            </Link>
        </main>
    )
}