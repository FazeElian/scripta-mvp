import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { UseFormRegister, FieldError, Path, FieldValues } from "react-hook-form";

type InputPasswordGroupType<T extends FieldValues> = {
    label: string;
    name: Path<T>;
    icon?: LucideIcon;
    placeholder: string;
    forgotPassword?: boolean;
    register: UseFormRegister<T>;
    error?: FieldError;
};

const InputPasswordGroup = <T extends FieldValues>({
    icon: Icon,
    label,
    name,
    placeholder,
    forgotPassword,
    register,
    error,
}: InputPasswordGroupType<T>) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`input-group ${error ? "input-group--error" : ""}`}>
            <div className="input-group--label">
                {Icon && <Icon />}
                <label htmlFor={name}>{label}</label>
            </div>
            <div className="input-group--password-wrapper">
                <input
                    id={name}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    {...register(name)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                />
                <button
                    type="button"
                    className="input-group--password-toggle"
                    onClick={() => setShowPassword(prev => !prev)}
                >
                    {showPassword ? <EyeOff /> : <Eye />}
                </button>
            </div>
            {error && (
                <span className="input-group--error-msg">
                    {error.message}
                </span>
            )}
            {forgotPassword && <h2 className="forgot-pass-txt">Forgot Password?</h2>}
        </div>
    );
};

export { InputPasswordGroup };