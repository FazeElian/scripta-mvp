import type { LucideIcon } from "lucide-react";
import type { UseFormRegister, FieldError, Path, FieldValues } from "react-hook-form";

type InputTextGroupType<T extends FieldValues> = {
    label: string;
    name: Path<T>;
    icon?: LucideIcon;
    placeholder: string;
    register: UseFormRegister<T>;
    error?: FieldError;
    type?: "text" | "email" | "password" | "number";
};

const InputTextGroup = <T extends FieldValues>({
    label,
    name,
    icon: Icon,
    placeholder,
    register,
    error,
    type = "text",
}: InputTextGroupType<T>) => {
    return (
        <div className={`input-group ${error ? "input-group--error" : ""}`}>
            <div className="input-group--label">
                {Icon && <Icon />}
                <label htmlFor={name}>
                    {label}
                </label>
            </div>
            <input
                id={name}
                type={type}
                placeholder={placeholder}
                {...register(name)}
            />
            {error && (
                <span className="input-group--error-msg">
                    {error.message}
                </span>
            )}
        </div>
    );
};

export { InputTextGroup };