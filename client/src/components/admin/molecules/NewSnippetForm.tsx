import { BookText, Braces, Globe, NotepadText, type LucideIcon } from 'lucide-react';

// Styles
import "@/assets/css/components/Forms.css";

// Subcomponents
import { InputTextGroup } from "@/components/admin/atoms/InputTextGroup";
import { InputSelectGroup } from '../atoms/InputSelectGroup';
import { InputTextAreaGroup } from '../atoms/InputTextAreaGroup';
import { Link } from 'react-router-dom';

type NewSnippetFormType = {
    title: string;
    subtitle: string;
    icon: LucideIcon;
};

const langOptions = [
    "🐍 Python",
    "🟨 JavaScript",
    "🔷 TypeScript",
    "☕ Java",
    "⚙️ C",
    "⚡ C++",
    "🟣 C#",
    "🐹 Go",
    "🦀 Rust",
    "💎 Ruby",
    "🐘 PHP",
    "🍎 Swift",
    "🤖 Kotlin",
    "🎯 Dart",
    "📊 R",
    "🔴 Scala",
    "🐪 Perl",
    "λ Haskell",
    "🌙 Lua",
    "🖥️ Shell / Bash",
    "💙 PowerShell",
    "🗄️ SQL",
    "🌐 HTML",
    "🎨 CSS",
    "💅 SASS / SCSS",
    "◈ GraphQL",
    "📄 YAML",
    "📦 JSON",
    "📰 XML",
    "❓ Not Listed",
];
const visibilityOptions = [
    "🌐 Public (Anyone can see this snippet)",
    "🔒 Private (Only you can see this snippet)",
    "🔗 Unlisted (Only people with the link can see)",
];

const NewSnippetForm = ({ title, subtitle, icon: Icon } : NewSnippetFormType) => {
    return (
        <form method="POST" className="form">
            <div className="form-head">
                <div className="form-head--title">
                    {<Icon />}
                    <h1>{title}</h1>
                </div>
                <h2>{subtitle}</h2>
            </div>
            <div className="form-body">
                <div className="input-group-3">
                    <InputTextGroup
                        label="Title"
                        name="title"
                        icon={BookText}
                        placeholder="Example: Binary Search Implementation"
                    />
                    <InputSelectGroup
                        label="Select Language"
                        name="lang"
                        icon={Braces}
                        placeholder="Select a language"
                        options={langOptions}
                    />
                    <InputSelectGroup
                        label="Visibility"
                        name="visibility"
                        icon={Globe}
                        options={visibilityOptions}
                        placeholder="Select who can view your snippet"
                    />
                </div>
                <InputTextAreaGroup
                    label="Description (optional)"
                    name="description"
                    icon={NotepadText}
                    placeholder="A brief description of what this snippet does..."
                />
            </div>
            <div className="form-actions">
                <Link
                    to="/dashboard"
                    className="form-actions--btn-cancel"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="form-actions--btn-submit"
                >
                    Create & Open Editor
                </button>
            </div>
        </form>
    )
}

export { NewSnippetForm };