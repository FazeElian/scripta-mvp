import type { LucideIcon } from "lucide-react";

type InputTextAreaGroupType = {
    label: string;
    name: string;
    icon?: LucideIcon;
    placeholder: string;
};

const InputTextAreaGroup = (props: InputTextAreaGroupType) => {
    return (
        <div className="input-group" key={props.name}>
            <div className="input-group--label">
                {props.icon && <props.icon />}
                <label htmlFor={props.name}>
                    {props.label}
                </label>
            </div>
            <textarea
                name={props.name}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export { InputTextAreaGroup };