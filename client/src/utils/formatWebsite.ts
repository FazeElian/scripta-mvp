export const formatWebsite = (url: string): string => {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
};