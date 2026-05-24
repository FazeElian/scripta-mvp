import { lazy, Suspense, useState, useCallback, memo } from "react"
import { BookText, Sparkles, Terminal, Waypoints } from "lucide-react"
import { toast } from "sonner"

// Run
import type { RunResult } from "@/lib/runCode"

// API CALL
import { generateDiagram } from "@/services/snippets/api"

// Types
import type { FlowDiagram as FlowDiagramType } from "@/types/diagrams.type"
import { EditorLoader } from "../atoms/EditorLoader"

// Lazy comps
const MarkdownPreview = lazy(() => import("./MarkdownPreview"))
const FlowDiagram = lazy(() =>
    import("./FlowDiagram").then((m) => ({ default: m.FlowDiagram }))
)

type OutputPanelProps = {
    result: RunResult | null
    running: boolean
    code: string
    diagram: FlowDiagramType | null
    lang: string
    markdown: string
    onMarkdownChange: (val: string) => void
    setDiagram: (val: FlowDiagramType | null) => void
    stdin: string
    onStdinChange: (val: string) => void
}

type TabType = "console" | "docs" | "diagram"

const ConsoleOutput = memo(
    ({ result, running }: Pick<OutputPanelProps, "result" | "running">) => {
        if (running) return <span>Running...</span>
        if (!result) return <span>Click "Run Code" to execute your snippet</span>

        return (
            <>
                {result.output.map((block, i) => {
                    let display = block
                    try {
                        display = JSON.stringify(JSON.parse(block), null, 2)
                    } catch {
                        // not JSON — render as-is
                    }

                    return (
                        <p
                            key={i}
                            className={result.isError ? "output-error" : "output-line"}
                            style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                        >
                            {display}
                        </p>
                    )
                })}
            </>
        )
    }
)

const OutputPanel = ({
    result,
    running,
    markdown,
    onMarkdownChange,
    lang,
    code,
    setDiagram,
    diagram,
    stdin,
    onStdinChange
}: OutputPanelProps) => {
    const [selectedTab, setSelectedTab] = useState<TabType>("console")
    const [generating, setGenerating] = useState(false)

    const handleGenerateDiagram = useCallback(async () => {
        if (!code.trim()) return
        setGenerating(true)
        try {
            const result = await generateDiagram(code, lang)
            setDiagram(result)
        } catch {
            toast.error("Failed to generate diagram, please try again.")
        } finally {
            setGenerating(false)
        }
    }, [code, lang, setDiagram])

    const getButtonClass = (tab: TabType) =>
        `top-editor--title${selectedTab === tab ? " top-editor-selected--title" : ""}`

    return (
        <div className="editor-output-container">
            <div className="top-editor-titles">
                <button
                    type="button"
                    className={getButtonClass("console")}
                    onClick={() => setSelectedTab("console")}
                >
                    <Terminal size={16} />
                    Console
                </button>

                <button
                    type="button"
                    className={getButtonClass("docs")}
                    onClick={() => setSelectedTab("docs")}
                >
                    <BookText size={16} />
                    Documentation
                </button>

                <button
                    type="button"
                    className={getButtonClass("diagram")}
                    onClick={() => setSelectedTab("diagram")}
                >
                    <Waypoints size={16} />
                    Diagram View
                </button>
            </div>

            <div className="output-result-container">
                <div className="cont-editor-console" hidden={selectedTab !== "console"}>
                    <ConsoleOutput result={result} running={running} />
                </div>

                {selectedTab === "console" && (
                    <div className="cont-editor-stdin">
                        <span className="stdin-label">Enter Input</span>
                        <textarea
                            className="stdin-textarea"
                            value={stdin}
                            onChange={(e) => onStdinChange(e.target.value)}
                            placeholder="Enter a input for your program..."
                            spellCheck={false}
                        />
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
                        <Suspense fallback={<EditorLoader text="Loading documentation..." />}>
                            <MarkdownPreview markdown={markdown} />
                        </Suspense>
                    </div>
                )}

                {selectedTab === "diagram" && (
                    !diagram ? (
                        <div className="editor-diagram">
                            <button
                                type="button"
                                onClick={handleGenerateDiagram}
                                className="generate-diagram-btn"
                                disabled={generating || !code.trim()}
                            >
                                {generating ? "Generating..." : "Generate Diagram with AI"}
                                <Sparkles size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="cont-editor-diagram">
                            <Suspense fallback={<EditorLoader text="Loading diagram..." />}>
                                <FlowDiagram
                                    diagram={diagram}
                                    regenerate={handleGenerateDiagram}
                                    generating={generating}
                                    onDiagramChange={setDiagram}
                                />
                            </Suspense>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export { OutputPanel }