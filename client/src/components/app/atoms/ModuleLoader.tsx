import "@/assets/css/components/Loaders.css";

type ModuleLoaderType = {
    txt: string;
}

const ModuleLoader = ({ txt } : ModuleLoaderType) => {
    return (
        <div className="module-loader">
            <div className="page-loader-spinner" />
            <h1>{txt}</h1>
        </div>
    )
}

export { ModuleLoader };