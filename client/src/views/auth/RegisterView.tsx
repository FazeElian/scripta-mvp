import { Lock, Mail, UserPlus } from "lucide-react";
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

const RegisterView = () => {
    return (
        <div className="auth-page">
            <AuthBackground />
            <ComeBackAuth />
            <form className="form-auth form" method="POST">
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
                        />
                        <InputTextGroup
                            label="Email"
                            name="email"
                            placeholder="name@example.com"
                            icon={Mail}
                        />
                        <InputPasswordGroup
                            label="Password"
                            name="password"
                            placeholder="Enter your password"
                            icon={Lock}
                            isPassword
                        />
                        <InputPasswordGroup
                            label="Confirm Password"
                            name="confirmPassword"
                            placeholder="Enter your password again"
                            icon={Lock}
                            isPassword
                        />
                    </div>
                    <button type="submit" className="form-auth-btn-submit">
                        <UserPlus />
                        Create Account
                    </button>
                    <div className="btm-form-auth">
                        <h2>Already have an account? <Link to="/auth/login">Login</Link></h2>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterView