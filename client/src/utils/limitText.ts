export const limitText = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;

    return text.substring(0, maxLength).trim() + "...";
};