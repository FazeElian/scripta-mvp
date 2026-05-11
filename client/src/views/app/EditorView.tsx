import { useState, useEffect } from "react";
import { useBlocker, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

// Styles
import "@/assets/css/components/Editor.css";

// Sub comps
import { TopBarEditor } from "@/components/app/molecules/TopBarEditor"
import { CodeEditor } from "@/components/app/molecules/CodeEditor";
import { OutputPanel } from "@/components/app/molecules/OutputPanel";
import { PageLoader } from "@/components/app/atoms/PageLoader";

// Run
import { runCode, type RunResult } from "@/lib/runCode";

// Query
import { useGetSnippetByIdByOwner } from "@/services/snippets/queries";

// mutation
import { useUpdateEditorSnippetMutation } from "@/services/snippets/mutations";

// util
import { cleanLangName } from "@/lib/editorLangs";
import { matchLangOption } from "@/lib/matchLangOption";

// Title hook
import useDocumentTitle from "@/hooks/useDocumentTitle";

const EditorView = () => {
    const redirect = useNavigate();
    const { id } = useParams();
    const { data: snippet, isLoading, isError } = useGetSnippetByIdByOwner(id as string);

    // Title
    useDocumentTitle(
        snippet?.title
            ? `${snippet.title} | Scripta`
            : "Editor | Scripta"
    );

    const [code, setCode] = useState("");
    const [lang, setLang] = useState("🟨 JavaScript");
    const [title, setTitle] = useState("");
    const [visibility, setVisibility] = useState("public");
    const [markdown, setMarkdown] = useState("");
    const [diagram, setDiagram] = useState("");
    const [result, setResult] = useState<RunResult | null>(null);
    const [running, setRunning] = useState(false);
    const [initializedId, setInitializedId] = useState<string | null>(null);

    const hasUnsavedChanges = 
        snippet && (
            code !== snippet.snippetContent.code ||
            title !== snippet.title ||
            markdown !== snippet.snippetContent.documentation ||
            visibility !== snippet.visibility ||
            diagram != snippet.snippetContent.diagramData
        );

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            !!hasUnsavedChanges && currentLocation.pathname !== nextLocation.pathname
    );

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = "";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [hasUnsavedChanges]);

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

    if (snippet && initializedId !== id) {
        setCode(snippet.snippetContent.code);
        setLang(matchLangOption(snippet.lang));
        setTitle(snippet.title);
        setVisibility(snippet.visibility);
        setMarkdown(snippet.snippetContent.documentation);
        setDiagram(snippet.snippetContent.diagramData)
        setInitializedId(id ?? null);
    }

    useEffect(() => {
        if (!isLoading && (isError || (id && !snippet))) {
            toast.error("Snippet not found");
            redirect("/app/dashboard");
        }
    }, [isLoading, isError, snippet, redirect, id]);

    const handleRun = async () => {
        if (!code.trim()) return;
        setRunning(true);
        setResult(null);
        const output = await runCode(code, lang);
        setResult(output);
        setRunning(false);
    };

    const mutation = useUpdateEditorSnippetMutation(id as string)
    const handleSave = () => {
        mutation.mutate({
            title: title,
            lang: cleanLangName(lang),
            visibility: visibility as "public" | "private" | "unListed",
            snippetContent: {
                code: code,
                documentation: markdown,
                diagramData: diagram,
            }
        })
    };

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
                <CodeEditor
                    value={code}
                    onChange={setCode}
                    lang={lang}
                    theme="dark"
                />
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
            </div>
        </>
    );
};

export default EditorView;