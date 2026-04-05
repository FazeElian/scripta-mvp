import {
    Braces,
    Cpu,
    Code,
    Hash,
    Bug,
    Terminal,
    Binary,
    GitGraph,
    type LucideIcon,
    Dot,
    Globe,
    Lock
} from "lucide-react";
import { Link } from "react-router-dom";

type SnippetCardExploreType = {
    title: string;
    description: string;
    lang: string;
    updatedAt: string;
    visibility: string;
    authorName: string;
    authorAvatar: string;
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

type AvatarConfig = {
    icon: LucideIcon;
    className: string;
}

const avatarConfig: Record<string, AvatarConfig> = {
    Terminal:   { icon: Terminal,     className: "avatar--yellow" },
    Braces:     { icon: Braces,       className: "avatar--pink" },
    Cpu:        { icon: Cpu,          className: "avatar--purple" },
    Code:       { icon: Code,         className: "avatar--blue" },
    Hash:       { icon: Hash,         className: "avatar--sky-blue" },
    Bug:        { icon: Bug,          className: "avatar--seagreen" },
    Binary:     { icon: Binary,       className: "avatar--orange" },
    GitGraph:   { icon: GitGraph,     className: "avatar--red" },
};

const SnippetCardExplore = (props : SnippetCardExploreType) => {
    const avatar = avatarConfig[props.authorAvatar] ?? { icon: Code, className: "avatar--default" };
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
                <Link to="/profile/johndoe">{props.authorName}</Link>
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
                <div className="btm-snippet-card-visibility">
                    {props.visibility === "Public" ? <Globe /> : <Lock />}
                    {props.visibility}
                </div>
            </div>
        </Link>
    )
}

export { SnippetCardExplore };