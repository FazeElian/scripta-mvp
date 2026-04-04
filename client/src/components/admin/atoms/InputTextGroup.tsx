import type { LucideIcon } from "lucide-react";

type InputTextGroupType = {
    label: string;
    name: string;
    icon?: LucideIcon;
    placeholder: string;
};

const InputTextGroup = (props: InputTextGroupType) => {
    return (
        <div className="input-group" key={props.name}>
            <div className="input-group--label">
                {props.icon && <props.icon />}
                <label htmlFor={props.name}>
                    {props.label}
                </label>
            </div>
            <input
                required
                type="text"
                name={props.name}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export { InputTextGroup };