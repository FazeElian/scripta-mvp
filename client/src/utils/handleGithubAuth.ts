export const handleGithubAuth = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
};