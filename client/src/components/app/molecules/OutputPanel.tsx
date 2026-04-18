import { useState } from "react";
import { BookText, Terminal, Waypoints } from "lucide-react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Run
import type { RunResult } from "@/lib/runCode";

// markdown custom comps
import MarkdownComponents from "../atoms/MarkdownComponents";

type OutputPanelType = {
    result: RunResult | null;
    running: boolean;
};

type TabType = "console" | "docs" | "diagram";

const OutputPanel = ({ result, running }: OutputPanelType) => {
    const [selectedTab, setSelectedTab] = useState<TabType>("console");
    const [markdown, setMarkdown] = useState("");

    const getButtonClass = (tab: TabType) =>
        `top-editor--title ${
            selectedTab === tab ? "top-editor-selected--title" : ""
        }`;

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
                            result.output.map((line, i) => (
                                <p
                                    key={i}
                                    className={
                                        result.isError
                                            ? "output-error"
                                            : "output-line"
                                    }
                                >
                                    {line}
                                </p>
                            ))
                        )}
                    </div>
                )}

                {selectedTab === "docs" && (
                    <div className="editor-doc">
                        <div className="cont-editor-doc cont-editor-doc--code">
                            <textarea
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
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
                    <div className="editor-diagram">
                        Diagram content here
                    </div>
                )}
            </div>
        </div>
    );
};

export { OutputPanel };