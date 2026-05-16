import "@/assets/css/components/PublicSnippet.css";
import "highlight.js/styles/atom-one-dark.css";

import { Link } from "react-router-dom";
import { ArrowRight, Play, Telescope } from "lucide-react";
import { useState } from "react";

// highlight
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
hljs.registerLanguage("python", python);

const INITIAL_CODE = `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Print first 10 numbers
for i in range(10):
    print(fibonacci(i))`;

const lines = INITIAL_CODE.split("\n");
const highlighted = hljs.highlight(INITIAL_CODE, { language: "python", ignoreIllegals: true }).value;
const highlightedLines = highlighted.split("\n");

const INITIAL_OUTPUT = ["0", "1", "1", "2", "3", "5", "8", "13", "21", "34"];

const HomeBanner = () => {
    const [output, setOutput] = useState<string[]>(['Click "Run" to execute']);
    const [running, setRunning] = useState(false);

    const handleRun = () => {
        setRunning(true);
        setOutput(["Loading..."]);
        setTimeout(() => {
            setOutput(INITIAL_OUTPUT);
            setRunning(false);
        }, 250);
    };

    return (
        <section className="home-banner">
            <div className="home-banner-txt">
                {/* <h1>{useTypewriter("Code, document, visualize.", 110)}</h1> */}
                <h1>Code, document, visualize</h1>
                <h2>No setup required</h2>
                <p>
                    The pedagogical IDE for the next generation of engineers.
                    Run Python, Java, C++, JS, and TS directly in your browser.
                </p>
                <div className="home-banner-txt-btns">
                    <Link to="/auth/register" className="home-banner-txt-btns-register">
                        Get Started Free
                        <ArrowRight />
                    </Link>
                    <Link to="/explore" className="home-banner-txt-btns-login">
                        <Telescope />
                        Explore Snippets
                    </Link>
                </div>
            </div>
            <div className="home-banner-editor">
                <div className="code-window">
                    <div className="code-window-bar">
                        <div className="code-window-dots">
                            <span className="dot red" />
                            <span className="dot yellow" />
                            <span className="dot green" />
                        </div>
                        <span className="code-window-filename">
                            &lt;/&gt; fibonacci.py
                        </span>
                        <button
                            className={`code-window-run ${running ? "running" : ""}`}
                            onClick={handleRun}
                            disabled={running}
                            aria-label={running ? "Running" : "Run code"}
                        >
                            <Play size={13} strokeWidth={3} />
                            <span className="code-window-run-label">{running ? "Running…" : "Run"}</span>
                        </button>
                    </div>

                    <div className="code-window-panels">
                        <div className="code-window-editor">
                            <span className="panel-label">&lt;/&gt; Editor</span>
                            <div style={{ overflow: "auto", flex: 1 }}>
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
                        </div>
                        <div className="code-window-terminal">
                            <span className="panel-label">&gt;_ Terminal</span>
                            <p className="terminal-cmd">$ python fibonacci.py</p>
                            <pre className="terminal-output">
                                {output.map((line, i) => (
                                    <span key={i} className="terminal-line">{line}</span>
                                ))}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export { HomeBanner };