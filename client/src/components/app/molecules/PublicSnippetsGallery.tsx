// Styles
import "@/assets/css/components/SnippetsGallery.css";

// Sub component
import { PublicSnippetCard } from "../atoms/PublicSnippetCard";

const snippets = [
    {
        title: "🐍 Binary Search",
        description: "Classic divide-and-conquer search algorithm",
        visibility: "Public",
        lang: "Python",
        updatedAt: "2026-01-15"
    },
    {
        title: "⚡ React useEffect Hook",
        description: "Side effect management in React components",
        visibility: "Private",
        lang: "Javascript",
        updatedAt: "2026-01-15"
    },
    {
        title: "🗂️ SQL Joins Cheatsheet",
        description: "Visual guide to INNER, LEFT, RIGHT, FULL joins",
        visibility: "Public",
        lang: "SQL",
        updatedAt: "2026-01-15"
    },
    {
        title: "🐹 Merge Sort Implementation",
        description: "Efficient O(n log n) sorting algorithm",
        visibility: "Public",
        lang: "Java",
        updatedAt: "2026-01-15"
    }
];

const PublicSnippetsGallery = () => {
    return (
        <section className="snippets-gallery">
            {snippets.map((item) => (
                <PublicSnippetCard key={item.title} {...item} />
            ))}
        </section>
    )
}

export { PublicSnippetsGallery }