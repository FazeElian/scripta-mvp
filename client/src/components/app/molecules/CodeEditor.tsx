import { FileText } from "lucide-react";
import { lazy, Suspense } from "react";

// Lazy load for editor comp
const Editor = lazy(() => import("@/components/app/molecules/Editor").then(m => ({ default: m.Editor })))

type CodeEditorProps = {
    value: string;
    onChange: (value: string) => void;
    lang: string;
    theme?: "dark" | "light";
    readOnly?: boolean;
};

const CodeEditor = ({ value, onChange, lang, theme = "dark", readOnly = false }: CodeEditorProps) => {
    return (
        <section className="code-editor">
            <div className="top-editor--title">
                <FileText />
                Editor
            </div>
            <Suspense fallback={<div className="code-editor-container" />}>
                <Editor
                    value={value}
                    onChange={onChange}
                    lang={lang}
                    theme={theme}
                    readOnly={readOnly}
                />
            </Suspense>
        </section>
    );
};

export { CodeEditor };