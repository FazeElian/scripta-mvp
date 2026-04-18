import { ArrowLeft, Copy, Play, Save, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

// Select options
import { langOptions } from "@/lib/langs";
import { editorVisibilityMapping } from "@/lib/visibility";

const visibilityOptions = Object.entries(editorVisibilityMapping);

type TopBarEditorType = {
    lang: string;
    onLangChange: (lang: string) => void;
    onRun: () => void;
    running: boolean;
}

const TopBarEditor = ({ lang, onLangChange, running, onRun } : TopBarEditorType) => {
    return (
        <div className="top-bar--editor">
            <div className="name-top-bar--editor">
                <Link to="/app/dashboard">
                    <ArrowLeft />
                </Link>
                <input
                    type="text"
                    placeholder="Snippet name..."
                    value="Binary Search"
                />
            </div>
            <div className="ops-top-bar--editor">
                <select value={lang} onChange={(e) => onLangChange(e.target.value)}>
                    {langOptions.map((l) => (
                        <option key={l} value={l}>{l}</option>
                    ))}
                </select>
                <select>
                    {visibilityOptions.map(([key, label]) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </select>
                <button type="button">
                    <Copy />
                    Copy code
                </button>
                <button type="button">
                    <Save />
                    Save
                </button>
                <button type="button">
                    <Share2 />
                    Share
                </button>
                <button
                    type="button"
                    className="btn-run-code--editor"
                    onClick={onRun}
                    disabled={running}
                >
                    <Play />
                    {running ? "Running..." : "Run Code"}
                </button>
            </div>
        </div>
    )
}

export { TopBarEditor };