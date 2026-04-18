import { ArrowLeft, Copy, Play, Save, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

// Select options
import { langOptions } from "@/lib/langs";
import { editorVisibilityMapping } from "@/lib/visibility";

const visibilityOptions = Object.entries(editorVisibilityMapping);

type TopBarEditorType = {
    title: string;
    onTitleChange: (val: string) => void;
    visibility: string;
    onVisibilityChange: (val: string) => void;
    lang: string;
    onLangChange: (lang: string) => void;
    onRun: () => void;
    onSave: () => void;
    running: boolean;
}

const TopBarEditor = ({ 
    title, onTitleChange, 
    visibility, onVisibilityChange, 
    lang, onLangChange, 
    running, onRun, onSave }: TopBarEditorType) => {
    return (
        <div className="top-bar--editor">
            <div className="name-top-bar--editor">
                <Link to="/app/dashboard">
                    <ArrowLeft />
                </Link>
                <input
                    type="text"
                    placeholder="Snippet name..."
                    value={title}
                    onChange={(e) => onTitleChange(e.target.value)}
                />
            </div>
            <div className="ops-top-bar--editor">
                <select value={lang} onChange={(e) => onLangChange(e.target.value)}>
                    {langOptions.map((l) => (
                        <option key={l} value={l}>{l}</option>
                    ))}
                </select>
                <select value={visibility} onChange={(e) => onVisibilityChange(e.target.value)}>
                    {visibilityOptions.map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
                <button type="button">
                    <Copy />
                    Copy code
                </button>
                <button type="button" onClick={onSave}>
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