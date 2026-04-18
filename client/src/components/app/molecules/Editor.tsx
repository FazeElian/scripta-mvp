import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView, lineNumbers, highlightActiveLine, keymap } from "@codemirror/view";
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching } from "@codemirror/language";
import { oneDark } from "@codemirror/theme-one-dark";
import { langToExtension } from "@/lib/editorLangs";
import { closeBrackets, autocompletion } from "@codemirror/autocomplete";
import { closeBracketsKeymap } from "@codemirror/autocomplete";
import { indentWithTab, history, historyKeymap } from "@codemirror/commands";
import { indentUnit } from "@codemirror/language";

type EditorProps = {
    value: string;
    onChange: (value: string) => void;
    lang: string;
    theme?: "dark" | "light";
    readOnly?: boolean;
};

const Editor = ({ value, onChange, lang, theme = "dark", readOnly = false }: EditorProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<EditorView | null>(null);
    const onChangeRef = useRef(onChange);

    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    // Recrea el editor si cambia lang o theme
    useEffect(() => {
        if (!containerRef.current) return;

        const langExtension = langToExtension(lang);

        const view = new EditorView({
            state: EditorState.create({
                doc: value,
                extensions: [
                    history(),
                    indentUnit.of("    "),
                    keymap.of([
                        indentWithTab,
                        ...historyKeymap,
                        ...closeBracketsKeymap
                    ]),

                    lineNumbers(),
                    highlightActiveLine(),
                    bracketMatching(),
                    closeBrackets(),
                    autocompletion(),

                    EditorView.updateListener.of((update) => {
                        if (update.docChanged) {
                            onChangeRef.current(update.state.doc.toString());
                        }
                    }),

                    EditorView.editable.of(!readOnly),
                    EditorView.theme({
                        "&": { backgroundColor: "#0d0d0d", fontSize: "15px" },
                        ".cm-gutters": {
                            backgroundColor: "#0d0d0d",
                            borderRight: "1px solid #1e1e1e"
                        },
                        ".cm-activeLineGutter": {
                            backgroundColor: "#161616"
                        },
                        ".cm-activeLine": {
                            backgroundColor: "#161616"
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
    }, [lang, theme, readOnly]);

    // Sincroniza valor externo sin recrear el editor
    useEffect(() => {
        const view = viewRef.current;
        if (!view) return;

        const current = view.state.doc.toString();
        if (current !== value) {
            view.dispatch({
                changes: { from: 0, to: current.length, insert: value },
            });
        }
    }, [value]);

    return <div ref={containerRef} className="code-editor-container" />;
};

export { Editor };