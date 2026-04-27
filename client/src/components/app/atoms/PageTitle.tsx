import { Link } from "react-router-dom";
import { ArrowLeft, Check, Copy, FilePlus, Share2 } from 'lucide-react';

// Styles
import "@/assets/css/components/PageTitle.css";

// Props type
type PageTitleType = {
    title: string;
    subtitle?: string;
    button?: boolean;
    returnBtn?: boolean;
    snippetsBtns?: boolean;
    onCopy?: () => void;
    copied?: boolean;
}

const PageTitle = ({ title, subtitle, button, returnBtn, snippetsBtns, onCopy, copied } : PageTitleType) => {
    return (
        <div className="page-title">
            <div className="title">
                {returnBtn &&
                    <Link to="/app/explore" className="title-btn-return">
                        <ArrowLeft />
                    </Link>
                }
                <div className="title-txt">
                    <h1>{title}</h1>
                    <h2>{subtitle}</h2>
                </div>
            </div>
            {button &&
                <Link to="/app/snippets/new" className="title-btn-new">
                    <FilePlus />
                    New Snippet
                </Link>
            }
            {snippetsBtns &&
                <>
                    <div className="title-snippet-btns">
                        <button
                            type="button"
                            onClick={onCopy}
                            className="title-btn-snippet"
                        >
                            {copied ? <Check color="#07B863" /> : <Copy />}
                            {copied ? "Copied!" : "Copy Code"}
                        </button>
                        <button className="title-btn-snippet">
                            <Share2 />
                            Share
                        </button>
                    </div>
                </>
            }
        </div>
    )
}

export { PageTitle };