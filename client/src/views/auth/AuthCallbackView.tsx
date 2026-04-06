import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackView = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        if (token) {
            localStorage.setItem("AUTH_TOKEN", token);
            navigate("/app/dashboard");
        } else {
            navigate("/auth/login");
        }
    }, [navigate]);

    return <p>Redirecting...</p>;
};

export default AuthCallbackView;