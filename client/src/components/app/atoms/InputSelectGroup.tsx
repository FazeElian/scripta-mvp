import { ChevronDown, type LucideIcon } from "lucide-react";

type InputSelectGroupType = {
    label: string;
    name: string;
    icon?: LucideIcon;
    placeholder?: string;
    options: string[];
};

const InputSelectGroup = (props: InputSelectGroupType) => {
    return (
        <div className="input-group" key={props.name}>
            <div className="input-group--label">
                {props.icon && <props.icon />}
                <label htmlFor={props.name}>
                    {props.label}
                </label>
            </div>
            <div className="input-group--select-wrapper">
                <select name={props.name} required defaultValue="">
                    <option value="" disabled>{props.placeholder}</option>
                    {props.options.map((option) => (
                        <option value={option} key={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <ChevronDown className="input-group--select-arrow" />
            </div>
        </div>
    )
}

export { InputSelectGroup };