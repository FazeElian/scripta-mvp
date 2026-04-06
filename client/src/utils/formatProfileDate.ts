export const formatProfileDate = (date: Date | string): string => {
    return new Date(date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });
};