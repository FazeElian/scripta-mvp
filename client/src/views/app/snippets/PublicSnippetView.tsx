import { Link, useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
import { toast } from "sonner";
import { BookText, Calendar, Terminal } from "lucide-react";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import MarkdownComponents from "@/components/app/atoms/MarkdownComponents";
import ReactMarkdown from 'react-markdown'

// Styles
import "@/assets/css/components/PublicSnippet.css";
import "@/assets/css/components/SnippetsGallery.css";

// Sub comps
import { PageTitle } from "@/components/app/atoms/PageTitle"
import { PageLoader } from "@/components/app/atoms/PageLoader";
import { CodeDisplay } from "@/components/app/molecules/CodeDisplay";

// Query
import { useGetSnippetById } from "@/services/snippets/queries";

// util
import { formatSnippetDate } from "@/utils/formatSnippetDate";

// lists
import { langsColors } from "@/lib/langs";
import { avatars } from "@/lib/avatars";

// Title hook
import useDocumentTitle from "@/hooks/useDocumentTitle";

const PublicSnippetView = () => {
    const [copied, setCopied] = useState(false);

    // get snippet id
    const { id } = useParams();

    // get snippet (query)
    const { data: snippet, isLoading, isError } = useGetSnippetById(id as string);

    // Title
    useDocumentTitle(
        snippet?.title
            ? `${snippet.title} | Scripta`
            : "Public Snippet | Scripta"
    );

    const redirect = useNavigate();
    if (isLoading) return <PageLoader />;
    if (isError || !snippet) {
        toast.error("Snippet not found");
        redirect("/app/dashboard");
        return null;
    }

    const avatar = avatars[snippet.ownerInfo.avatar] ?? { icon: Terminal, className: "avatar--yellow" };
    const AvatarIcon = avatar.icon;

    const handleCopy = () => {
        navigator.clipboard.writeText(snippet.snippetContent.code);
        setCopied(true);
    };

    return (
        <main className="app-content app-public">
            <PageTitle
                title={snippet.title}
                returnBtn
                snippetsBtns
                onCopy={handleCopy}
                copied={copied}
            />

            <section className="public-snippet">
                <div className="public-snippet--author">
                    <div className="public-snippet--author-profile">
                        <div className={`btm-snippet-card-author--avatar ${avatar.className}`}>
                            <AvatarIcon />
                        </div>
                        <Link to={`/profile/${snippet.ownerInfo.userName}`}>
                            {snippet.ownerInfo.fullName}
                        </Link>
                    </div>
                    <span className={`
                        btm-snippet-card-left--lang ${langsColors[snippet.lang] ??
                        "btm-snippet-card-left--lang--default public-snippet--author-lang"}`}
                    >
                        {snippet.lang}
                    </span>
                    <div className="public-snippet--author-date">
                        <Calendar />
                        {formatSnippetDate(snippet.updatedAt)}
                    </div>
                </div>
                <p>{snippet.description}</p>
                {snippet.tags && snippet.tags.length > 0 && (
                    <div className="snippet-card-tags">
                        {snippet.tags.map((tag) => (
                            <span key={tag} className="snippet-card-tag">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
                <CodeDisplay
                    lang={snippet.lang}
                    value={snippet.snippetContent.code}
                />
                <div className="cont-public-snippet">
                    <div className="cont-public-snippet--title">
                        <BookText />
                        Documentation
                    </div>
                    <div className="cont-public-snippet--content">
                        {snippet.snippetContent.documentation === "" ?
                            "This snippet doesn't have any documentation yet." :
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                                components={MarkdownComponents}
                            >
                                {snippet.snippetContent.documentation}
                            </ReactMarkdown>
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}

export default PublicSnippetView