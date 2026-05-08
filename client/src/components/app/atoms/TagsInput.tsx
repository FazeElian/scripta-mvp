import { useState, useRef } from "react";
import { X, Tag } from "lucide-react";
import { toast } from "sonner";

// Query & util
import { useSearchTags } from "@/services/tags/queries";

type TagsInputProps = {
    value: string[] | undefined;
    onChange: (tags: string[]) => void;
};

const TagsInput = ({ value = [], onChange }: TagsInputProps) => {
    const [input, setInput] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { data: suggestions } = useSearchTags(input);
    const inputRef = useRef<HTMLInputElement>(null);

    const addTag = (tag: string) => {
        const clean = tag.trim().toLowerCase();
        if (!clean) return;
        if (value.includes(clean)) {
            toast.warning(`Tag "#${clean}" is already added`, { id: "duplicate-tag" });
            return;
        }
        onChange([...value, clean]);
        setInput("");
        setShowSuggestions(false);
    };

    const removeTag = (tag: string) => {
        onChange(value.filter(t => t !== tag));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.key === "Enter" || e.key === ",") && input.trim()) {
            e.preventDefault();
            addTag(input);
        }
        if (e.key === "Backspace" && !input && value.length > 0) {
            removeTag(value[value.length - 1]);
        }
    };

    return (
        <div className="tags-input-wrapper input-group">
            <div className="input-group--label">
                <Tag />
                <label htmlFor="tags-input">Tags (optional)</label>
            </div>
            <div className="tags-input-field" onClick={() => inputRef.current?.focus()}>
                {value.map((tag) => (
                    <span key={tag} className="tag-chip">
                        #{tag}
                        <button type="button" onClick={() => removeTag(tag)}>
                            <X size={12} />
                        </button>
                    </span>
                ))}
                <input
                    id="tags-input"
                    ref={inputRef}
                    value={input}
                    onChange={e => { setInput(e.target.value); setShowSuggestions(true); }}
                    onKeyDown={handleKeyDown}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    placeholder={value.length === 0 ? "Press Enter or comma to add a tag..." : ""}
                />
            </div>
            {showSuggestions && suggestions?.length > 0 && (
                <ul className="tags-suggestions">
                    {suggestions.map((s: { name: string }) => (
                        <li key={s.name} onMouseDown={() => addTag(s.name)}>
                            #{s.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export { TagsInput };