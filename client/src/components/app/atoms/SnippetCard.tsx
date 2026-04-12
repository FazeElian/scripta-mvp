import { Dot, Ellipsis, Globe, Lock, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";

// Langs
import { langsColors } from "@/lib/langs";

// Utils
import { formatSnippetDate } from "@/utils/formatSnippetDate";

type SnippetCardType = {
    title: string;
    description: string;
    lang: string;
    updatedAt: Date;
    visibility: string;
}

const SnippetCard = (props : SnippetCardType) => {
    const handleDetail = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        alert("Snippet detail button pressed")
    };

    return (
        <Link to={`/snippets/editor/${props.title}`} className="snippet-card">
            <div className="top-snippet-card">
                <div className="top-head-snippet-card">
                    <h1>{props.title}</h1>
                    <button type="button" onClick={handleDetail}>
                        <Ellipsis />
                    </button>
                </div>
                <p>{props.description}</p>
            </div>
            <div className="btm-snippet-card">
                <div className="btm-snippet-card-left">
                    <span className={`
                        btm-snippet-card-left--lang ${langsColors[props.lang] ??
                        "btm-snippet-card-left--lang--default"}`}
                    >
                        {props.lang}
                    </span>
                    <Dot />
                    {formatSnippetDate(props.updatedAt)}
                </div>
                <div className="btm-snippet-card-visibility">
                    {props.visibility === "Public" ? <Globe /> : props.visibility === "unListed" ? <LinkIcon /> : <Lock />}
                    {props.visibility.charAt(0).toUpperCase() + props.visibility.slice(1)}
                </div>
            </div>
        </Link>
    )
}

export { SnippetCard };