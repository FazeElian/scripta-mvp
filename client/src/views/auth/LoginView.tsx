import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ContactRound, Loader, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Github from "@/assets/img/github.png";
import Google from "@/assets/img/google.png";

// Styles
import "@/assets/css/components/Auth.css";

// Components
import { AuthBackground } from "@/components/app/molecules/AuthBackground";
import { InputTextGroup } from "@/components/app/atoms/InputTextGroup";
import { InputPasswordGroup } from "@/components/app/atoms/InputPasswordGroup";
import { ComeBackAuth } from "@/components/app/atoms/ComeBackAuth";

// Type
import type { LoginUser } from "@/types/users.types";

// Schema
import { loginSchema } from "@/schemas/user.schema";

// Mutation
import { useLoginMutation } from "@/services/users/mutations";

const LoginView = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginUser>({
        resolver: zodResolver(loginSchema)
    });

    const loginMutation = useLoginMutation()
    const onSubmit = (formData: LoginUser) => {
        loginMutation.mutate(formData);
    }

    return (
        <div className="auth-page">
            <AuthBackground />
            <ComeBackAuth />
            <form
                className="form-auth form"
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="form-auth-wrapper">
                    <div className="head-form-auth">
                        <h1>Welcome Back!</h1>
                        <h2>Sign in to your account to continue</h2>
                        <div className="btns-head-form-auth">
                            <button type="button">
                                <img src={Google} alt="Google" />
                                Google
                            </button>
                            <button type="button">
                                <img src={Github} alt="Github" />
                                Github
                            </button>
                        </div>
                    </div>
                    <div className="auth-divider">
                        <span />
                        <p>OR CONTINUE WITH</p>
                        <span />
                    </div>
                    <div className="form-auth-group">
                        <InputTextGroup
                            label="Email or Username"
                            name="identifier"
                            placeholder="name@example.com or @johndoe"
                            icon={ContactRound}
                            register={register}
                            error={errors.identifier}
                            type="text"
                        />
                        <InputPasswordGroup
                            label="Password"
                            name="password"
                            placeholder="Enter your password"
                            icon={Lock}
                            register={register}
                            error={errors.password}
                        />
                    </div>
                    {loginMutation.status === "pending" ? (
                        <button className="form-auth-btn-submit" disabled>
                            <Loader />
                            Loading...
                        </button>
                    ) : (
                        <button type="submit" className="form-auth-btn-submit">
                            <Mail />
                            Login
                        </button>
                    )}
                    <div className="btm-form-auth">
                        <h2>Don't have an account? <Link to="/auth/register">Create One</Link></h2>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginView