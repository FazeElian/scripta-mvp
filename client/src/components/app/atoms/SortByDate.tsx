import { ChevronDown } from "lucide-react";

type SortByDateType = {
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

const SortByDate = ({ options, value, onChange } : SortByDateType) => {
    return (
        <div className="sort-by input-group--select-wrapper">
            <select required defaultValue="" onChange={(e) => onChange(e.target.value)} value={value}>
                <option value="" disabled>Sort by Date</option>
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

export { SortByDate };