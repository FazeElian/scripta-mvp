import { useEffect, useRef, useState } from "react";
import { Dot, Ellipsis, Globe, Lock, Link as LinkIcon, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";

// Langs
import { langsColors } from "@/lib/langs";

// Utils
import { formatSnippetDate } from "@/utils/formatSnippetDate";

type SnippetCardType = {
    id: string;
    title: string;
    description: string;
    lang: string;
    updatedAt: Date;
    visibility: string;
}

const SnippetCard = (props : SnippetCardType) => {
    const [snippetOptions, setSnippetOptions] = useState(false);
    const optionsRef = useRef<HTMLDivElement>(null);
    const handleDetail = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSnippetOptions(prev => !prev);
    };

    useEffect(() => {
        if (!snippetOptions) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (optionsRef.current && !optionsRef.current.contains(e.target as Node)) {
                setSnippetOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [snippetOptions]);

    const handleEdit = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        alert(`You pressed the button to edit the snippet with the id: ${id}`)
    }

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        alert(`You pressed the button to delete the snippet with the id: ${id}`)
    }

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
            {snippetOptions && (
                <div className="snippet-options" ref={optionsRef}>
                    <button
                        type="button"
                        className="btn-edit-snippet-options"
                        onClick={(e) => handleEdit(props.id, e)}
                    >
                        <Pencil />
                        Edit
                    </button>
                    <button
                        type="button"
                        className="btn-delete-snippet-options"
                        onClick={(e) => handleDelete(props.id, e)}
                    >
                        <Trash />
                        Delete
                    </button>
                </div>
            )}
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