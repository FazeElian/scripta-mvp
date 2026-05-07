import { lazy, Suspense, useState } from "react";
import { BookText, Sparkles, Terminal, Waypoints } from "lucide-react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { toast } from "sonner";

// Run
import type { RunResult } from "@/lib/runCode";

// markdown custom comps
import MarkdownComponents from "../atoms/MarkdownComponents";

// Diagram
import { generateDiagram } from "@/services/snippets/api";

type OutputPanelType = {
    result: RunResult | null;
    running: boolean;
    code: string;
    diagram: string;
    lang: string;
    markdown: string;
    onMarkdownChange: (val: string) => void;
    setDiagram: (val: string) => void;
};

type TabType = "console" | "docs" | "diagram";

const MermaidDiagram = lazy(() => 
    import("./MermaidDiagram").then(m => ({ default: m.MermaidDiagram }))
);

const OutputPanel = ({ result, running, markdown, onMarkdownChange, lang, code, setDiagram, diagram }: OutputPanelType) => {
    const [selectedTab, setSelectedTab] = useState<TabType>("console");
    const [generating, setGenerating] = useState(false);

    const getButtonClass = (tab: TabType) =>
        `top-editor--title ${
            selectedTab === tab ? "top-editor-selected--title" : ""
        }`;

    const handleGenerateDiagram = async () => {
        if (!code.trim()) return;
        setGenerating(true);
        try {
            const result = await generateDiagram(code, lang);
            setDiagram(result);
        } catch {
            toast.error("Failed to generate diagram, try again later.");
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="editor-output-container">
            <div className="top-editor-titles">
                <button
                    type="button"
                    className={getButtonClass("console")}
                    onClick={() => setSelectedTab("console")}
                >
                    <Terminal />
                    Console
                </button>

                <button
                    type="button"
                    className={getButtonClass("docs")}
                    onClick={() => setSelectedTab("docs")}
                >
                    <BookText />
                    Documentation
                </button>

                <button
                    type="button"
                    className={getButtonClass("diagram")}
                    onClick={() => setSelectedTab("diagram")}
                >
                    <Waypoints />
                    Diagram View
                </button>
            </div>

            <div className="output-result-container">
                {selectedTab === "console" && (
                    <div className="cont-editor-console">
                        {running ? (
                            "Running..."
                        ) : !result ? (
                            'Click "Run Code" to execute your snippet'
                        ) : (
                            result.output.map((block, i) => {
                                let display = block;
                                try {
                                    const parsed = JSON.parse(block);
                                    display = JSON.stringify(parsed, null, 2);
                                } catch {
                                    // is not a JSON, show it just like it is
                                }

                                return (
                                    <p
                                        key={i}
                                        className={result.isError ? "output-error" : "output-line"}
                                        style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                                    >
                                        {display}
                                    </p>
                                );
                            })
                        )}
                    </div>
                )}

                {selectedTab === "docs" && (
                    <div className="editor-doc">
                        <div className="cont-editor-doc cont-editor-doc--code">
                            <textarea
                                value={markdown}
                                onChange={(e) => onMarkdownChange(e.target.value)}
                            />
                        </div>
                        <div className="cont-editor-doc">
                            {markdown.length === 0 ?
                                "Here will appear the view of the markdown" :
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={MarkdownComponents}
                                >
                                    {markdown}
                                </ReactMarkdown>
                            }
                        </div>
                    </div>
                )}

                {selectedTab === "diagram" && (
                    !diagram ? (
                        <div className="editor-diagram">
                            <button
                                type="button"
                                onClick={handleGenerateDiagram}
                                className="generate-diagram-btn"
                            >
                                {generating ? "Generating..." : "Generate Diagram with AI"}
                                <Sparkles />
                            </button>
                        </div>
                    ) : (
                        <div className="cont-editor-diagram">
                            <Suspense fallback={<div>Loading diagram...</div>}>
                                <MermaidDiagram
                                    chart={diagram}
                                    regenerate={handleGenerateDiagram}
                                    generating={generating}
                                />
                            </Suspense>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export { OutputPanel };