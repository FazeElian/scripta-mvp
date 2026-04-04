import { ChevronDown } from "lucide-react";

const SortByDate = ({ options }: { options: string[] }) => {
    return (
        <div className="sort-by input-group--select-wrapper">
            <select required defaultValue="">
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