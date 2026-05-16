import hljs from "highlight.js/lib/core";

// highlight lib langs
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import cpp from "highlight.js/lib/languages/cpp";
import java from "highlight.js/lib/languages/java";
import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("c++", cpp);
hljs.registerLanguage("java", java);

type CodeDisplayProps = {
    value: string;
    lang: string;
};

export const CodeDisplay = ({ value, lang }: CodeDisplayProps) => {
    const lines = value.split("\n");

    const highlighted = hljs.highlight(value, {
        language: hljs.getLanguage(lang) ? lang : "plaintext",
        ignoreIllegals: true,
    }).value;

    const highlightedLines = highlighted.split("\n");

    return (
        <div className="public-snippet--editor">
            <table className="public-snippet--table">
                <tbody>
                    {lines.map((_, i) => (
                        <tr key={i}>
                            <td className="public-snippet--gutter">{i + 1}</td>
                            <td
                                className="public-snippet--line"
                                dangerouslySetInnerHTML={{ __html: highlightedLines[i] ?? "" }}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};