import { ChevronDown } from "lucide-react";

type SortByLang = {
    options: string[];
    placeholder: string;
};

const SortByLang = ({ options }: { options: string[] }) => {
    return (
        <div className="sort-by input-group--select-wrapper">
            <select required defaultValue="">
                <option value="" disabled>Sort By Language</option>
                {options.map((option) => (
                    <option value={option} key={option}>
                        {option}
                    </option>
                ))}
            </select>
            <ChevronDown className="input-group--select-arrow" />
        </div>
    )
}

export { SortByLang };