import type { LanguageSupport } from "@codemirror/language";

export const cleanLangName = (lang: string) =>
    lang.replace(/[^\w\s/#().+]/gu, "").trim();

export const langToExtension = async (lang: string): Promise<LanguageSupport | null> => {
    const clean = cleanLangName(lang).toLowerCase();

    switch (clean) {
        case "javascript":
            return (await import("@codemirror/lang-javascript")).javascript()
        case "typescript":
            return (await import("@codemirror/lang-javascript")).javascript({ typescript: true })
        case "python":
            return (await import("@codemirror/lang-python")).python()
        case "c++":
            return (await import("@codemirror/lang-cpp")).cpp()
        case "java":
            return (await import("@codemirror/lang-java")).java()
        default:
            return null
    }
};