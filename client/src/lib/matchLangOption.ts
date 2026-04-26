import { langOptions } from "./langs";

export const matchLangOption = (lang: string) => {
    const clean = lang.toLowerCase().trim();
    return (
        langOptions.find(opt => {
            const label = opt.replace(/[\p{Emoji}\s]+/u, "").toLowerCase().trim();
            return label === clean;
        }) ??
        langOptions.find(opt => {
            const words = opt.toLowerCase().split(/\s+/);
            return words.some(w => w === clean);
        }) ??
        langOptions[0]
    );
};