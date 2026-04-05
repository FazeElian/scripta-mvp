import { Dot } from "lucide-react";
import { Link } from "react-router-dom";

type PublicSnippetCardType = {
    title: string;
    description: string;
    lang: string;
    updatedAt: string;
}

const langColors: Record<string, string> = {
    Python: "btm-snippet-card-left--lang--purple",
    "C#": "btm-snippet-card-left--lang--purple",
    Javascript: "btm-snippet-card-left--lang--yellow",
    Typescript: "btm-snippet-card-left--lang--blue",
    SQL: "btm-snippet-card-left--lang--sky-blue",
    Java: "btm-snippet-card-left--lang--orange",
    "C++": "btm-snippet-card-left--lang--red",
    CSS: "btm-snippet-card-left--lang--pink",
    SASS: "btm-snippet-card-left--lang--pink",
};

const PublicSnippetCard = (props : PublicSnippetCardType) => {
    return (
        <Link to={`/snippets/editor/${props.title}`} className="snippet-card">
            <div className="top-snippet-card">
                <div className="top-head-snippet-card">
                    <h1>{props.title}</h1>
                </div>
                <p>{props.description}</p>
            </div>
            <div className="btm-snippet-card">
                <div className="btm-snippet-card-left">
                    <span className={`
                        btm-snippet-card-left--lang ${langColors[props.lang] ??
                        "btm-snippet-card-left--lang--default"}`}
                    >
                        {props.lang}
                    </span>
                    <Dot />
                    {props.updatedAt}
                </div>
            </div>
        </Link>
    )
}

export { PublicSnippetCard };