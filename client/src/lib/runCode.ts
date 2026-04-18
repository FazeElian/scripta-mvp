import { cleanLangName } from "./editorLangs";

const JUDGE0_URL = "https://ce.judge0.com";

const langMap: Record<string, number> = {
    "javascript":     63,
    "typescript":     74,
    "python":         71,
    "c++":            54,
    "c":              50,
    "c#":             51,
    "java":           62,
    "go":             60,
    "rust":           73,
    "php":            68,
    "swift":          83,
    "kotlin":         78,
    "ruby":           72,
    "lua":            64,
    "scala":          81,
    "r":              80,
    "dart":           90,
    "shell / bash":   46,
    "powershell":     56,
    "elixir":         57,
    "coffeescript":   38,
};

export type RunResult = {
    output: string[];
    isError: boolean;
};

export const runCode = async (code: string, lang: string): Promise<RunResult> => {
    const clean = cleanLangName(lang).toLowerCase();
    const languageId = langMap[clean];

    if (!languageId) {
        return {
            output: [`"${cleanLangName(lang)}" is not supported for execution.`],
            isError: true,
        };
    }

    try {
        const submitRes = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                language_id: languageId,
                source_code: code,
            }),
        });

        if (!submitRes.ok) throw new Error(`Judge0 error: ${submitRes.status}`);

        const result = await submitRes.json();

        const stdout = result.stdout || "";
        const stderr = result.stderr || result.compile_output || "";
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