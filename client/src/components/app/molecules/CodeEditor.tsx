import { FileText } from "lucide-react";
import { Editor } from "./Editor";

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
            <Editor
                value={value}
                onChange={onChange}
                lang={lang}
                theme={theme}
                readOnly={readOnly}
            />
        </section>
    );
};

export { CodeEditor };