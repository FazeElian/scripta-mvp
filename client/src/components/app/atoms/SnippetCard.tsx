import { useEffect, useRef, useState } from "react";
import { Dot, Ellipsis, Globe, Lock, Link as LinkIcon, Pencil, Trash } from "lucide-react";
import { Link } from "react-router-dom";

// Langs
import { langsColors } from "@/lib/langs";

// Utils
import { formatSnippetDate } from "@/utils/formatSnippetDate";
import { useDeleteSnippetMutation } from "@/services/snippets/mutations";
import { toast } from "sonner";

type SnippetCardType = {
    id: string;
    title: string;
    description: string;
    lang: string;
    updatedAt: Date;
    visibility: string;
    onEdit: () => void;
}

const SnippetCard = ({ id, title, description, lang, updatedAt, visibility, onEdit } : SnippetCardType) => {
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

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onEdit()
    }

    const deleteMutation = useDeleteSnippetMutation();

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        toast.warning(`¿Are you sure you want to delete this snippet: "${title}"?`, {
            action: (
                <button
                    onClick={() => {
                        toast.dismiss();

                        const loadingToast = toast.loading("Deleting snippet...", {
                            style: { color: "--var(--gray-secondary)" }
                        });
                        deleteMutation.mutate(id, {
                            onSuccess: (res) => {
                                toast.dismiss(loadingToast);
                                toast.success(res);
                            },
                            onError: () => {
                                toast.dismiss(loadingToast);
                                toast.error("Failed to delete snippet");
                            },
                        });
                    }}
                    className="btn-confirm-delete"
                >
                    Delete
                </button>
            ),
        });
    };

    return (
        <Link to={`/app/snippets/editor/${id}`} className="snippet-card">
            <div className="top-snippet-card">
                <div className="top-head-snippet-card">
                    <h1>{title}</h1>
                    <button type="button" onClick={handleDetail}>
                        <Ellipsis />
                    </button>
                </div>
                <p>{description}</p>
            </div>
            {snippetOptions && (
                <div className="snippet-options" ref={optionsRef}>
                    <button
                        type="button"
                        className="btn-edit-snippet-options"
                        onClick={(e) => handleEdit(e)}
                    >
                        <Pencil />
                        Edit
                    </button>
                    <button
                        type="button"
                        className="btn-delete-snippet-options"
                        onClick={(e) => handleDelete(id, e)}
                    >
                        <Trash />
                        Delete
                    </button>
                </div>
            )}
            <div className="btm-snippet-card">
                <div className="btm-snippet-card-left">
                    <span className={`
                        btm-snippet-card-left--lang ${langsColors[lang] ??
                        "btm-snippet-card-left--lang--default"}`}
                    >
                        {lang}
                    </span>
                    <Dot />
                    {formatSnippetDate(updatedAt)}
                </div>
                <div className="btm-snippet-card-visibility">
                    {visibility === "public" ? <Globe /> : visibility === "unListed" ? <LinkIcon /> : <Lock />}
                    {visibility.charAt(0).toUpperCase() + visibility.slice(1)}
                </div>
            </div>
        </Link>
    )
}

export { SnippetCard };