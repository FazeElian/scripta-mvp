// Styles
import "@/assets/css/components/SnippetsHeader.css";

// Sub Components
import { SearchBar } from "../atoms/SearchBar";
import { SortByLang } from "../atoms/SortByLang";
import { SortByRecency } from "../atoms/SortByRecency";

const SnippetsHeaderExplore = () => {
    const recencySortOptions = [
        "Most Recent",
        "Least Recent",
        "Last Modified"
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
            <SearchBar placeholder="Search Community Snippets..." setQuery={() => console.log()} />
            <div className="snippets-filters">
                <SortByRecency options={recencySortOptions} />
                <SortByLang options={langSortOptions} value="" onChange={() => console.log()} />
            </div>
        </form>
    )
}

export { SnippetsHeaderExplore };