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

    return (
        <>
            <TopBarEditor
                lang={lang}
                onLangChange={setLang}
                onRun={handleRun}
                running={running}
            />
            <div className="editor-wrapper">
                <CodeEditor
                    value={code}
                    onChange={setCode}
                    lang={lang}
                    theme="dark"
                />
                <OutputPanel result={result} running={running} />
            </div>
        </>
    )
}

export default EditorView