import { visibilityMapping } from "@/lib/visibility";
import { ChevronDown, type LucideIcon } from "lucide-react";
import type { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputSelectGroupType<T extends FieldValues> = {
    label: string;
    name: Path<T>;
    icon?: LucideIcon;
    placeholder?: string;
    options: string[];
    register: UseFormRegister<T>;
    error?: FieldError;
};

const InputSelectGroup = <T extends FieldValues>({
    label,
    name,
    icon: Icon,
    placeholder,
    options,
    register,
    error
}: InputSelectGroupType<T>) => {
    return (
        <div className="input-group" key={name}>
            <div className="input-group--label">
                {Icon && <Icon />}
                <label htmlFor={name}>{label}</label>
            </div>

            <div className="input-group--select-wrapper">
                <select
                    id={name}
                    {...register(name)}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((option) => {
                        let displayLabel = option;
                        let technicalValue = option;

                        if (visibilityMapping[option as keyof typeof visibilityMapping]) {
                            displayLabel = visibilityMapping[option as keyof typeof visibilityMapping];
                            technicalValue = option; 
                        } 
                        
                        else {
                            displayLabel = option;
                            technicalValue = option.replace(/^[^\w\s]*\s*/, '').trim();
                        }

                        return (
                            <option value={technicalValue} key={option}>
                                {displayLabel}
                            </option>
                        );
                    })}
                </select>
                <ChevronDown className="input-group--select-arrow" />
            </div>

            {error && (
                <span className="input-group--error-msg">
                    {error.message}
                </span>
            )}
        </div>
    );
};

export { InputSelectGroup };