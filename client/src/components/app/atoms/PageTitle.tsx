import { Link } from "react-router-dom";
import { FilePlus } from 'lucide-react';

// Styles
import "@/assets/css/components/PageTitle.css";

// Props type
type PageTitleType = {
    title: string;
    subtitle?: string;
    button?: boolean;
}

const PageTitle = ({ title, subtitle, button } : PageTitleType) => {
    return (
        <div className="page-title">
            <div className="title">
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
            </div>
            {button &&
                <Link to="/app/snippets/new" className="title-btn">
                    <FilePlus />
                    New Snippet
                </Link>
            }
        </div>
    )
}

export { PageTitle };