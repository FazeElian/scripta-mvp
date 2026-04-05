import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader, Lock, Mail, UserPlus } from "lucide-react";
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
import type { RegisterUser } from "@/types/users.types";

// Schema
import { registerSchema } from "@/schemas/user.schema";

// Mutation
import { useRegisterMutation } from "@/services/users/mutations";

const RegisterView = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterUser>({
        resolver: zodResolver(registerSchema)
    });

    const registerMutation = useRegisterMutation()
    const onSubmit = (formData: RegisterUser) => {
        registerMutation.mutate(formData, {
            onSuccess: () => {
                reset()
            }
        });
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
                        <h1>Create An Account</h1>
                        <h2>Get started with Scripta today</h2>
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
                            label="Full Name"
                            name="fullName"
                            placeholder="John Doe"
                            register={register}
                            error={errors.fullName}
                            type="text"
                        />
                        <InputTextGroup
                            label="User Name"
                            name="userName"
                            placeholder="@johndoe"
                            register={register}
                            error={errors.userName}
                            type="text"
                        />
                        <InputTextGroup
                            label="Email"
                            name="email"
                            placeholder="name@example.com"
                            icon={Mail}
                            register={register}
                            error={errors.email}
                            type="email"
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
                    {registerMutation.status === "pending" ? (
                        <button className="form-auth-btn-submit" disabled>
                            <Loader />
                            Loading...
                        </button>
                    ) : (
                        <button type="submit" className="form-auth-btn-submit">
                            <UserPlus />
                            Create Account
                        </button>
                    )}
                    <div className="btm-form-auth">
                        <h2>Already have an account? <Link to="/auth/login">Login</Link></h2>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterView