import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import type { LanguageSupport } from "@codemirror/language";

export const cleanLangName = (lang: string) =>
    lang.replace(/[^\w\s/#().]/gu, "").trim();

export const langToExtension = (lang: string): LanguageSupport | null => {
    const clean = cleanLangName(lang).toLowerCase();

    const map: Record<string, () => LanguageSupport> = {
        "javascript":  () => javascript(),
        "typescript":  () => javascript({ typescript: true }),
        "python":      () => python(),
        "c++":         () => cpp(),
        "java":        () => java(),
    };

    const factory = map[clean];
    return factory ? factory() : null;
};