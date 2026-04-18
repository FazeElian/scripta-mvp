import { cleanLangName } from "./editorLangs";

const PISTON_API = "https://piston-api.emkc.org/api/v2/piston/execute";

const langMap: Record<string, { language: string; version: string }> = {
    "javascript":       { language: "javascript",   version: "18.15.0" },
    "typescript":       { language: "typescript",   version: "5.0.3"   },
    "python":           { language: "python",       version: "3.10.0"  },
    "c++":              { language: "c++",          version: "10.2.0"  },
    "c":                { language: "c",            version: "10.2.0"  },
    "c#":               { language: "csharp",       version: "6.12.0"  },
    "java":             { language: "java",         version: "15.0.2"  },
    "go":               { language: "go",           version: "1.16.2"  },
    "rust":             { language: "rust",         version: "1.50.0"  },
    "php":              { language: "php",          version: "8.2.3"   },
    "swift":            { language: "swift",        version: "5.3.3"   },
    "kotlin":           { language: "kotlin",       version: "1.8.20"  },
    "ruby":             { language: "ruby",         version: "3.0.1"   },
    "lua":              { language: "lua",          version: "5.4.4"   },
    "shell / bash":     { language: "bash",         version: "5.2.0"   },
    "r":                { language: "r",            version: "4.1.1"   },
    "scala":            { language: "scala",        version: "3.2.2"   },
    "dart":             { language: "dart",         version: "2.19.6"  },
    "elixir":           { language: "elixir",       version: "1.14.3"  },
    "coffeescript":     { language: "coffeescript", version: "2.7.0"   },
    "nim":              { language: "nim",          version: "1.6.2"   },
    "zig":              { language: "zig",          version: "0.10.1"  },
    "powershell":       { language: "powershell",   version: "7.1.4"   },
};

export type RunResult = {
    output: string[];
    isError: boolean;
};

export const runCode = async (code: string, lang: string): Promise<RunResult> => {
    const clean = cleanLangName(lang).toLowerCase();
    const runtime = langMap[clean];

    if (!runtime) {
        return {
            output: [`"${cleanLangName(lang)}" is not supported for execution.`],
            isError: true,
        };
    }

    try {
        const response = await fetch(PISTON_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                language: runtime.language,
                version: runtime.version,
                files: [{ content: code }],
            }),
        });

        if (!response.ok) throw new Error(`Piston API error: ${response.status}`);

        const data = await response.json();
        const stdout = data.run?.stdout || "";
        const stderr = data.run?.stderr || "";
        const isError = !!stderr;

        return {
            output: (stdout + stderr).split("\n").filter(Boolean),
            isError,
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return {
            output: [`Network error: ${message}`],
            isError: true,
        };
    }
};