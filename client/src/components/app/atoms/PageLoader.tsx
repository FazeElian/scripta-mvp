import "@/assets/css/components/Loaders.css";

const PageLoader = () => {
    return (
        <div className="page-loader">
            <div className="page-loader-spinner" />
            <h1>Loading...</h1>
        </div>
    );
};

export { PageLoader };