export const handleGoogleAuth = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
};