import {
    Dot,
    Terminal,
} from "lucide-react";
import { Link } from "react-router-dom";

// Avatars & langs colors
import { avatars  } from "@/lib/avatars";
import { langsColors } from "@/lib/langs";
import { formatSnippetDate } from "@/utils/formatSnippetDate";

type SnippetCardExploreType = {
    id: string;
    title: string;
    description: string;
    lang: string;
    updatedAt: Date;
    ownerName: string;
    ownerAvatar: string;
    ownerUserName: string;
}

const SnippetCardExplore = (props : SnippetCardExploreType) => {
    const avatar = avatars[props.ownerAvatar] ?? { icon: Terminal, className: "avatar--yellow" };
    const AvatarIcon = avatar.icon;

    return (
        <Link to={`/app/snippets/view/${props.id}`} className="snippet-card">
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
                <Link to={`/app/profile/${props.ownerUserName}`}>{props.ownerName}</Link>
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

export { SnippetCardExplore };