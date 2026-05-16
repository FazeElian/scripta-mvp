import "@/assets/css/components/Loaders.css";

type EditorLoader = {
    text: string;
}

const EditorLoader = ({ text } : EditorLoader) => {
    return (
        <div className="editor-loader">
            <div className="page-loader-spinner" />
            <h1>{text}</h1>
        </div>
    )
}

export { EditorLoader };