import { useState, useEffect, lazy, Suspense, useCallback, useMemo } from "react";
import { useBlocker, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

// Styles
import "@/assets/css/components/Editor.css";

// Types
import { type FlowDiagram } from "@/types/diagrams.type";

// Eager (lightweight, always needed)
import { TopBarEditor } from "@/components/app/molecules/TopBarEditor";
import { PageLoader } from "@/components/app/atoms/PageLoader";

// Lazy (heavy, only needed once user is in editor)
const CodeEditor = lazy(() =>
    import("@/components/app/molecules/CodeEditor").then(m => ({ default: m.CodeEditor }))
);
const OutputPanel = lazy(() =>
    import("@/components/app/molecules/OutputPanel").then(m => ({ default: m.OutputPanel }))
);

// Run
import { runCode, type RunResult } from "@/lib/runCode";

// Query / Mutation
import { useGetSnippetByIdByOwner } from "@/services/snippets/queries";
import { useUpdateEditorSnippetMutation } from "@/services/snippets/mutations";

// Utils
import { cleanLangName } from "@/lib/editorLangs";
import { matchLangOption } from "@/lib/matchLangOption";

// Title hook
import useDocumentTitle from "@/hooks/useDocumentTitle";

function parseDiagramData(raw: unknown): FlowDiagram | null {
    if (!raw) return null;
    if (typeof raw === "object") return raw as FlowDiagram;
    if (typeof raw === "string") {
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed.nodes) && Array.isArray(parsed.edges))
                return parsed as FlowDiagram;
        } catch { /* old Mermaid string — discard */ }
    }
    return null;
}

function normalizeDiagram(d: FlowDiagram | null) {
    if (!d) return null;
    return {
        nodes: d.nodes.map(({ id, data, position, type }) => ({ id, data, position, type })),
        edges: d.edges.map(({ id, source, target, label, animated }) => ({ id, source, target, label, animated })),
    };
}

const EditorFallback = () => (
    <div style={{ flex: 1, background: "#0d0d0d" }} />
);

const EditorView = () => {
    const redirect = useNavigate();
    const { id } = useParams();
    const { data: snippet, isLoading, isError } = useGetSnippetByIdByOwner(id as string);

    useDocumentTitle(snippet?.title ? `${snippet.title} | Scripta` : "Editor | Scripta");

    const [code, setCode]             = useState("");
    const [lang, setLang]             = useState("🟨 JavaScript");
    const [title, setTitle]           = useState("");
    const [visibility, setVisibility] = useState("public");
    const [markdown, setMarkdown]     = useState("");
    const [diagram, setDiagram]       = useState<FlowDiagram | null>(null);
    const [result, setResult]         = useState<RunResult | null>(null);
    const [running, setRunning]       = useState(false);
    const [initializedId, setInitializedId] = useState<string | null>(null);

    // Initialize state from fetched snippet (once per id)
    if (snippet && initializedId !== id) {
        setCode(snippet.snippetContent.code);
        setLang(matchLangOption(snippet.lang));
        setTitle(snippet.title);
        setVisibility(snippet.visibility);
        setMarkdown(snippet.snippetContent.documentation);
        setDiagram(parseDiagramData(snippet.snippetContent.diagramData));
        setInitializedId(id ?? null);
    }

    // Memoize parsed diagram to avoid re-parsing on every render
    const savedDiagram = useMemo(
        () => parseDiagramData(snippet?.snippetContent.diagramData),
        [snippet?.snippetContent.diagramData]
    );

    const hasUnsavedChanges = useMemo(() =>
        !!snippet && (
            code       !== snippet.snippetContent.code ||
            title      !== snippet.title ||
            markdown   !== snippet.snippetContent.documentation ||
            visibility !== snippet.visibility ||
            JSON.stringify(diagram) !== JSON.stringify(savedDiagram)
        ),
        [snippet, code, title, markdown, visibility, diagram, savedDiagram]
    );

    // Block in-app navigation
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            !!hasUnsavedChanges && currentLocation.pathname !== nextLocation.pathname
    );

    useEffect(() => {
        if (blocker.state === "blocked") {
            const proceed = window.confirm(
                "You have unsaved changes. Are you sure you want to exit?"
            );
            if (proceed) {
                blocker.proceed();
            } else {
                blocker.reset();
            }
        }
    }, [blocker]);

    // Redirect if snippet not found
    useEffect(() => {
        if (!isLoading && (isError || (id && !snippet))) {
            toast.error("Snippet not found");
            redirect("/app/dashboard");
        }
    }, [isLoading, isError, snippet, redirect, id]);

    // Stable callbacks (avoid child re-renders)
    const handleRun = useCallback(async () => {
        if (!code.trim()) return;
        setRunning(true);
        setResult(null);
        const output = await runCode(code, lang);
        setResult(output);
        setRunning(false);
    }, [code, lang]);

    const mutation = useUpdateEditorSnippetMutation(id as string);

    const handleSave = useCallback(() => {
        mutation.mutate({
            title,
            lang: cleanLangName(lang),
            visibility: visibility as "public" | "private" | "unListed",
            snippetContent: {
                code,
                documentation: markdown,
                diagramData: normalizeDiagram(diagram)
                    ? JSON.stringify(normalizeDiagram(diagram))
                    : "",
            },
        });
    }, [mutation, title, lang, visibility, code, markdown, diagram]);

    if (isLoading) return <PageLoader />;

    return (
        <>
            <TopBarEditor
                title={title}
                onTitleChange={setTitle}
                visibility={visibility}
                onVisibilityChange={setVisibility}
                lang={lang}
                onLangChange={setLang}
                onRun={handleRun}
                onSave={handleSave}
                saving={mutation.isPending}
                running={running}
            />
            <div className="editor-wrapper">
                <Suspense fallback={<EditorFallback />}>
                    <CodeEditor
                        value={code}
                        onChange={setCode}
                        lang={lang}
                        theme="dark"
                    />
                </Suspense>
                <Suspense fallback={<EditorFallback />}>
                    <OutputPanel
                        lang={lang}
                        code={code}
                        diagram={diagram}
                        setDiagram={setDiagram}
                        result={result}
                        running={running}
                        markdown={markdown}
                        onMarkdownChange={setMarkdown}
                    />
                </Suspense>
            </div>
        </>
    );
};

export default EditorView;