import { useState } from "react";

// Styles
import "@/assets/css/components/Editor.css";

// Sub comps
import { TopBarEditor } from "@/components/app/molecules/TopBarEditor"
import { CodeEditor } from "@/components/app/molecules/CodeEditor";
import { OutputPanel } from "@/components/app/molecules/OutputPanel";

// Run
import { runCode, type RunResult } from "@/lib/runCode";

const EditorView = () => {
    const [code, setCode] = useState("");
    const [lang, setLang] = useState("🟨 JavaScript");
    const [title, setTitle] = useState("Untitled Snippet");
    const [visibility, setVisibility] = useState("public");
    const [markdown, setMarkdown] = useState("");

    const [result, setResult] = useState<RunResult | null>(null);
    const [running, setRunning] = useState(false);
    
    const handleRun = async () => {
        if (!code.trim()) return;
        setRunning(true);
        setResult(null);
        const output = await runCode(code, lang);
        setResult(output);
        setRunning(false);
    };

    const handleSave = async () => {
        const payload = {
            title,
            language: lang,
            visibility,
            code,
            documentation: markdown
        };
        console.log("Data sent to DB_ ", payload);
    };
    return (
        <form>
            <TopBarEditor
                title={title}
                onTitleChange={setTitle}
                visibility={visibility}
                onVisibilityChange={setVisibility}
                lang={lang}
                onLangChange={setLang}
                onRun={handleRun}
                onSave={handleSave}
                running={running}
            />
            <div className="editor-wrapper">
                <CodeEditor
                    value={code}
                    onChange={setCode}
                    lang={lang}
                    theme="dark"
                />
                <OutputPanel
                    result={result}
                    running={running}
                    markdown={markdown}
                    onMarkdownChange={setMarkdown}
                />
            </div>
        </form>
    )
}

export default EditorView