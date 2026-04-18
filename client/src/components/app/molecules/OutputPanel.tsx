import type { RunResult } from "@/lib/runCode";
import { BookText, Terminal, Waypoints } from "lucide-react";

type OutputPanelType = {
    result: RunResult | null;
    running: boolean;
}

const OutputPanel = ({ result, running } : OutputPanelType) => {
    return (
        <div className="editor-output-container">
            <div className="top-editor-titles">
                <button type="button" className="top-editor--title top-editor-selected--title">
                    <Terminal />
                    Console
                </button>
                <button type="button" className="top-editor--title">
                    <BookText />
                    Documentation
                </button>
                <button type="button" className="top-editor--title">
                    <Waypoints />
                    Diagram View
                </button>
            </div>
            <div className="output-result-container">
                {running ? (
                    "Running..."
                ) : !result ? (
                    'Click "Run Code" to execute your snippet'
                ) : (
                    result.output.map((line, i) => (
                        <p key={i} className={result.isError ? "output-error" : "output-line"}>
                            {line}
                        </p>
                    ))
                )}
            </div>
        </div>
    )
}

export { OutputPanel };