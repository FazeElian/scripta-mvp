import { Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Github from "@/assets/img/github.png";
import Google from "@/assets/img/google.png";

// Styles
import "@/assets/css/components/Auth.css";

// Components
import { AuthBackground } from "@/components/admin/molecules/AuthBackground";
import { InputTextGroup } from "@/components/admin/atoms/InputTextGroup";
import { InputPasswordGroup } from "@/components/admin/atoms/InputPasswordGroup";
import { ComeBackAuth } from "@/components/admin/atoms/ComeBackAuth";

const LoginView = () => {
    return (
        <div className="auth-page">
            <AuthBackground />
            <ComeBackAuth />
            <form className="form-auth form" method="POST">
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
                    </div>
                    <button type="submit" className="form-auth-btn-submit">
                        <Mail />
                        Login
                    </button>
                    <div className="btm-form-auth">
                        <h2>Don't have an account? <Link to="/auth/register">Create One</Link></h2>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginView