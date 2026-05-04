import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FilePlus } from 'lucide-react';

// Styles
import "@/assets/css/components/SnippetsGallery.css";

// Sub component
import { SnippetCard } from "../atoms/SnippetCard";
import { useGetAllSnippetsByOwner } from "@/services/snippets/queries";

// Custom hook
import { useHandleModalForm } from "@/hooks/useHandleModalForm";
import { EditSnippetModalForm } from "./EditSnippetModalForm";
import type { SnippetCardType } from "@/types/snippets.type";

type SnippetsGalleryType = {
    query: string;
    sortDate: string;
    sortLang: string;
};

const SnippetsGallery = ({ query, sortDate, sortLang } : SnippetsGalleryType) => {
    const [activeSnippet, setActiveSnippet] = useState<Omit<SnippetCardType, "onEdit"> | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const modalForm = activeSnippet ? `edit ${activeSnippet.id}` as `edit ${string}` : null;

    useHandleModalForm({
        modalForm,
        setModalForm: (value) => {
            if (!value) setActiveSnippet(null);
        },
        formRef
    });

    const { data: snippets, isError } = useGetAllSnippetsByOwner();
    const filtered = useMemo(() => {
        let result = snippets ?? [];

        if (query) {
            result = result.filter((s) =>
                s.title.toLowerCase().includes(query.toLowerCase())
            );
        }

        // filter by lang
        if (sortLang && sortLang !== "All") {
            result = result.filter((s) => s.lang === sortLang);
        }

        // order by date
        result = [...result].sort((a, b) => {
            if (sortDate === "Newest First") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            if (sortDate === "Oldest First") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            if (sortDate === "Recently Updated") return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            if (sortDate === "Last Modified") return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
            return 0;
        });

        return result;
    }, [snippets, query, sortDate, sortLang]);

    if (isError) return null;
    return (
        <>
            {filtered && filtered.length > 0 ? (
                <section className="snippets-gallery">
                    {filtered.map((item) => (
                        <SnippetCard
                            key={item.id || item.title}
                            {...item}
                            onEdit={() => setActiveSnippet(item)}
                        />
                    ))}
                </section>
            ) : snippets && snippets.length === 0 ? (
                <div className="no-snippets">
                    <FilePlus />
                    <div className="no-snippets-txt">
                        You haven't created your first snippet.
                        <Link to="/app/snippets/new">Create Snippet</Link>
                    </div>
                </div>
            ) : (
                <div className="no-snippets">
                    <FilePlus />
                    <div className="no-snippets-txt">
                        Theres's no snippets with the title: "{query}"
                    </div>
                </div>
            )}

            {activeSnippet && (
                <EditSnippetModalForm
                    snippet={activeSnippet}
                    formRef={formRef}
                    onClose={() => setActiveSnippet(null)}
                />
            )}
        </>
    );
};

export { SnippetsGallery };