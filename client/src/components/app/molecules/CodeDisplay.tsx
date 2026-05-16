import hljs from "highlight.js/lib/core";

// highlight lib langs
import python from "highlight.js/lib/languages/python";
import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage("python", python);
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