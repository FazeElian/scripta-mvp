import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, lineNumbers } from "@codemirror/view";
import { syntaxHighlighting, defaultHighlightStyle } from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";
import { langToExtension } from "@/lib/editorLangs";

type CodeDisplayProps = {
    value: string;
    lang: string;
    theme?: "dark" | "light";
};

const CodeDisplay = ({ value, lang, theme = "dark" }: CodeDisplayProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const langExtension = langToExtension(lang);

        const view = new EditorView({
            state: EditorState.create({
                doc: value,
                extensions: [
                    lineNumbers(),
                    EditorView.editable.of(false),
                    EditorView.theme({
                        "&": { 
                            backgroundColor: "transparent", 
                            fontSize: "15px",
                            borderRadius: "8px",
                            userSelect: "none",
                        },
                        ".cm-scroller": { 
                            overflow: "auto",
                            maxHeight: "400px"
                        },
                        ".cm-gutters": {
                            backgroundColor: "transparent",
                            borderRight: "1px solid #1e1e1e",
                            borderRadius: "8px 0 0 8px"
                        },
                    }, { dark: true }),
                    ...(theme === "dark"
                        ? [oneDark]
                        : [syntaxHighlighting(defaultHighlightStyle)]),
                    ...(langExtension ? [langExtension] : []),
                ]
            }),
            parent: containerRef.current,
        });

        viewRef.current = view;
        return () => {
            view.destroy();
            viewRef.current = null;
        };
    }, [lang, theme]);

    useEffect(() => {
        const view = viewRef.current;
        if (!view) return;

        const current = view.state.doc.toString();
        const normalized = (value || "").replace(/\\n/g, '\n').replace(/\\"/g, '"');

        if (current !== normalized) {
            view.dispatch({
                changes: { from: 0, to: current.length, insert: normalized }
            });
        }
    }, [value]);

    return <div ref={containerRef} className="public-snippet--editor" />;
};

export { CodeDisplay };