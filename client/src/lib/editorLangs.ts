import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { rust } from "@codemirror/lang-rust";
import { php } from "@codemirror/lang-php";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { sql } from "@codemirror/lang-sql";
import { json } from "@codemirror/lang-json";
import { yaml } from "@codemirror/lang-yaml";
import { xml } from "@codemirror/lang-xml";
import { markdown } from "@codemirror/lang-markdown";
import { go } from "@codemirror/lang-go";
import { sass } from "@codemirror/lang-sass";
import type { LanguageSupport } from "@codemirror/language";

export const cleanLangName = (lang: string) =>
    lang.replace(/[^\w\s/#().]/gu, "").trim();

export const langToExtension = (lang: string): LanguageSupport | null => {
    const clean = cleanLangName(lang).toLowerCase();

    const map: Record<string, () => LanguageSupport> = {
        "javascript":        () => javascript(),
        "typescript":        () => javascript({ typescript: true }),
        "python":            () => python(),
        "c++":               () => cpp(),
        "c":                 () => cpp(),
        "c#":                () => cpp(),
        "java":              () => java(),
        "go":                () => go(),
        "rust":              () => rust(),
        "php":               () => php(),
        "swift":             () => cpp(),
        "kotlin":            () => java(),
        "dart":              () => javascript(),
        "ruby":              () => python(),
        "lua":               () => python(),
        "shell / bash":      () => markdown(),
        "powershell":        () => markdown(),
        "r":                 () => python(),
        "scala":             () => java(),
        "haskell":           () => python(),
        "julia":             () => python(),
        "elixir":            () => python(),
        "erlang":            () => python(),
        "ocaml":             () => python(),
        "lisp":              () => python(),
        "clojure":           () => python(),
        "fortran":           () => python(),
        "html":              () => html(),
        "css":               () => css(),
        "sass / scss":       () => sass(),
        "sql":               () => sql(),
        "graphql":           () => javascript(),
        "json":              () => json(),
        "yaml":              () => yaml(),
        "xml":               () => xml(),
        "markdown":          () => markdown(),
        "zig":               () => cpp(),
        "fish":              () => markdown(),
        "v (vlang)":         () => cpp(),
        "crystal":           () => python(),
        "nim":               () => python(),
        "coffeescript":      () => javascript(),
        "assembly (nasm)":   () => cpp(),
    };

    const factory = map[clean];
    return factory ? factory() : null;
};