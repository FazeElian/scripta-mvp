import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

// Styles
import "@/assets/css/components/Editor.css";

// Sub comps
import { TopBarEditor } from "@/components/app/molecules/TopBarEditor"
import { CodeEditor } from "@/components/app/molecules/CodeEditor";
import { OutputPanel } from "@/components/app/molecules/OutputPanel";

// Run
import { runCode, type RunResult } from "@/lib/runCode";

// Query
import { useGetSnippetByIdByOwner } from "@/services/snippets/queries";

// ops
import { langOptions } from "@/lib/langs";

// mutation
import { useUpdateEditorSnippetMutation } from "@/services/snippets/mutations";

// util
import { cleanLangName } from "@/lib/editorLangs";

const matchLangOption = (lang: string) =>
    langOptions.find(opt => opt.toLowerCase().includes(lang.toLowerCase())) ?? "🟨 JavaScript";

const EditorView = () => {
    const redirect = useNavigate();
    const { id } = useParams();
    const { data: snippet, isLoading, isError } = useGetSnippetByIdByOwner(id as string);

    const [code, setCode] = useState("");
    const [lang, setLang] = useState("🟨 JavaScript");
    const [title, setTitle] = useState("");
    const [visibility, setVisibility] = useState("public");
    const [markdown, setMarkdown] = useState("");
    const [result, setResult] = useState<RunResult | null>(null);
    const [running, setRunning] = useState(false);
    const [initializedId, setInitializedId] = useState<string | null>(null);

    if (snippet && initializedId !== id) {
        setCode(snippet.snippetContent.code);
        setLang(matchLangOption(snippet.lang));
        setTitle(snippet.title);
        setVisibility(snippet.visibility);
        setMarkdown(snippet.snippetContent.documentation);
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
                diagramData: "",
            }
        })
    };

    if (isLoading) return "Loading...";
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
                    result={result}
                    running={running}
                    markdown={markdown}
                    onMarkdownChange={setMarkdown}
                />
            </div>
        </form>
    );
};

export default EditorView;