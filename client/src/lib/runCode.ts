import { api } from "@/config/axios";
import { cleanLangName } from "./editorLangs";

const LANG_MAP: Record<string, string> = {
    "javascript": "javascript",
    "typescript": "typescript",
    "python":     "python",
    "c++":        "cpp",
    "java":       "java",
};

export type RunResult = {
    output: string[];
    isError: boolean;
};

export const runCode = async (
    code: string,
    lang: string,
    stdin?: string
): Promise<RunResult> => {
    const clean = cleanLangName(lang).toLowerCase();
    const language = LANG_MAP[clean];

    if (!language) {
        return {
            output: [`"${cleanLangName(lang)}" is not supported for execution.`],
            isError: true,
        };
    }

    try {
        const { data } = await api.post("/snippets/execute", {
            language,
            code,
            ...(stdin?.trim() && { stdin }),   // 👈 solo si hay contenido
        });

        const stdout = data.stdout ?? "";
        const stderr = data.stderr ?? "";
        const isError = data.exitCode !== 0;
        const combined = (stdout + stderr).trimEnd();

        return {
            output: combined ? [combined] : [],
            isError,
        };
    } catch (error: unknown) {
        const axiosError = error as { response?: { data?: unknown }; message?: string };
        const message = axiosError?.response?.data
            ? JSON.stringify(axiosError.response.data)
            : axiosError.message ?? "Unknown error";
        return {
            output: [`Error: ${message}`],
            isError: true,
        };
    }
};