import type { LucideIcon } from "lucide-react";
import type { UseFormRegister, FieldError, Path, FieldValues } from "react-hook-form";

type InputTextAreaGroupType<T extends FieldValues> = {
    label: string;
    name: Path<T>;
    icon?: LucideIcon;
    placeholder: string;
    register: UseFormRegister<T>;
    error?: FieldError;
};

const InputTextAreaGroup = <T extends FieldValues>({
    label,
    name,
    icon: Icon,
    placeholder,
    register,
    error,
}: InputTextAreaGroupType<T>) => {
    return (
        <div className={`input-group ${error ? "input-group--error" : ""}`}>
            <div className="input-group--label">
                {Icon && <Icon />}
                <label htmlFor={name}>
                    {label}
                </label>
            </div>
            <textarea
                id={name}
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

export { InputTextAreaGroup };