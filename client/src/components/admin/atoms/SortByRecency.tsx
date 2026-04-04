import { ChevronDown } from "lucide-react";

const SortByRecency = ({ options }: { options: string[] }) => {
    return (
        <div className="sort-by input-group--select-wrapper">
            <select required defaultValue="Most Recent">
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