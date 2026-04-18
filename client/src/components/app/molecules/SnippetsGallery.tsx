import { useRef, useState } from "react";
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

const SnippetsGallery = () => {
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

    if (isError) return null;

    return (
        <>
            {snippets && snippets.length > 0 ? (
                <section className="snippets-gallery">
                    {snippets.map((item) => (
                        <SnippetCard
                            key={item.id || item.title}
                            {...item}
                            onEdit={() => setActiveSnippet(item)}
                        />
                    ))}
                </section>
            ) : (
                <div className="no-snippets">
                    <FilePlus />
                    <div className="no-snippets-txt">
                        You haven't created your first snippet.
                        <Link to="/app/snippets/new">Create Snippet</Link>
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