import { ChevronDown } from "lucide-react";

type SortByRecencyType = {
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

const SortByRecency = ({ options, value, onChange }: SortByRecencyType) => {
    return (
        <div className="sort-by input-group--select-wrapper">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((option: string) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
            <ChevronDown className="input-group--select-arrow" />
        </div>
    )
}

export { SortByRecency };