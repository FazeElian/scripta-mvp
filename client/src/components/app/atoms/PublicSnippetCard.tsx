import { Dot } from "lucide-react";
import { Link } from "react-router-dom";

// Langs
import { langsColors } from "@/lib/langs";

// Type
import type { AllSnippets } from "@/types/snippets.type";

// Utils
import { formatSnippetDate } from "@/utils/formatSnippetDate";

const PublicSnippetCard = (props : AllSnippets) => {
    return (
        <Link
            to={`/snippets/editor/${props.title}`}
            className="snippet-card"
            key={props.id}
        >
            <div className="top-snippet-card">
                <div className="top-head-snippet-card">
                    <h1>{props.title}</h1>
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
            </div>
        </Link>
    )
}

export { PublicSnippetCard };