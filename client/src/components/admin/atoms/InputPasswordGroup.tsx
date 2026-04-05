import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type InputPasswordGroupType = {
    label: string;
    name: string;
    icon?: LucideIcon;
    placeholder: string;
    isPassword?: boolean;
    forgotPassword?: boolean;
};

const InputPasswordGroup = ({ icon: Icon, isPassword, ...props }: InputPasswordGroupType) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="input-group" key={props.name}>
            <div className="input-group--label">
                {Icon && <Icon />}
                <label htmlFor={props.name}>
                    {props.label}
                </label>
            </div>
            <div className={isPassword ? "input-group--password-wrapper" : ""}>
                <input
                    required
                    id={props.name}
                    type={isPassword && !showPassword ? "password" : "text"}
                    name={props.name}
                    placeholder={props.placeholder}
                />
                {isPassword && (
                    <button
                        type="button"
                        className="input-group--password-toggle"
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                )}
            </div>
            {props.forgotPassword && <h2 className="forgot-pass-txt">Forgot Password?</h2>}
        </div>
    );
};

export { InputPasswordGroup };