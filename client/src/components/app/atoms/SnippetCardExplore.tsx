import {
    Code,
    Dot,
    Globe,
    Lock
} from "lucide-react";
import { Link } from "react-router-dom";

// Avatars & langs colors
import { avatars  } from "@/lib/avatars";
import { langsColors } from "@/lib/langs";

type SnippetCardExploreType = {
    title: string;
    description: string;
    lang: string;
    updatedAt: string;
    visibility: string;
    authorName: string;
    authorAvatar: string;
}


const SnippetCardExplore = (props : SnippetCardExploreType) => {
    const avatar = avatars[props.authorAvatar] ?? { icon: Code, className: "avatar--default" };
    const AvatarIcon = avatar.icon;

    return (
        <Link to={`/snippets/editor/${props.title}`} className="snippet-card">
            <div className="top-snippet-card">
                <div className="top-head-snippet-card">
                    <h1>{props.title}</h1>
                </div>
                <p>{props.description}</p>
            </div>
            <div className="snippet-card-author">
                <div className={`btm-snippet-card-author--avatar ${avatar.className}`}>
                    <AvatarIcon />
                </div>
                <Link to="/app/profile/johndoe">{props.authorName}</Link>
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
                    {props.updatedAt}
                </div>
                <div className="btm-snippet-card-visibility">
                    {props.visibility === "Public" ? <Globe /> : <Lock />}
                    {props.visibility}
                </div>
            </div>
        </Link>
    )
}

export { SnippetCardExplore };