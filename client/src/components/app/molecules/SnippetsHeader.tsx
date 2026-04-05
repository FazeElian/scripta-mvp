// Styles
import "@/assets/css/components/SnippetsHeader.css";

// Sub Components
import { SearchBar } from "../atoms/SearchBar";
import { SortByDate } from "../atoms/SortByDate";
import { SortByLang } from "../atoms/SortByLang";

const SnippetsHeader = () => {
    const dateSortOptions = [
        "Newest First",
        "Oldest First",
        "Recently Updated",
        "Last Modified",
    ];

    const langSortOptions = [
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

    return (
        <form className="snippets-header" method="post">
            <SearchBar placeholder="Search Snippets..." />
            <div className="snippets-filters">
                <SortByDate options={dateSortOptions} />
                <SortByLang options={langSortOptions} />
            </div>
        </form>
    )
}

export { SnippetsHeader };