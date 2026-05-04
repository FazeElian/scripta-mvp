import { cleanLangName } from "@/lib/editorLangs";
import { ChevronDown, X } from "lucide-react";

type SortByLangType = {
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

const SortByLang = ({ options, value, onChange }: SortByLangType) => {
    const hasValue = value !== "All";
    return (
        <div className="sort-by input-group--select-wrapper">
            <select required defaultValue="All" onChange={(e) => onChange(e.target.value)} value={value}>
                <option value="All" disabled>Sort By Language</option>
                {options.map((option) => (
                    <option value={cleanLangName(option)} key={cleanLangName(option)}>
                        {option}
                    </option>
                ))}
            </select>
            {hasValue
                ?
                    <button type="button" className="input-group--select-clear" onClick={() => onChange("All")}>
                        <X />
                    </button>
                : <ChevronDown className="input-group--select-arrow" />
            }
        </div>
    )
}

export { SortByLang };