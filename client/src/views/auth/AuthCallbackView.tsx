import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const AuthCallbackView = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const called = useRef(false);

    useEffect(() => {
        if (called.current) return;
        called.current = true;

        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const error = params.get("error");

        if (error) {
            navigate("/auth/login");
            return;
        }

        if (token) {
            localStorage.setItem("AUTH_TOKEN", token);
            queryClient.invalidateQueries({ queryKey: ["auth-user"] }).then(() => {
                navigate("/app/dashboard", { replace: true });
            });
        } else {
            const existing = localStorage.getItem("AUTH_TOKEN");
            navigate(existing ? "/app/dashboard" : "/auth/login");
        }
    }, [navigate, queryClient]);

    return <p>Redirecting...</p>;
};

export default AuthCallbackView;