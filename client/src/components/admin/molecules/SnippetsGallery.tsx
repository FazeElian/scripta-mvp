// Styles
import "@/assets/css/components/SnippetsGallery.css";

// Sub component
import { SnippetCard } from "../atoms/SnippetCard";

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
    },
    {
        title: "🎨 CSS Grid Layout",
        description: "Modern two-dimensional layout system",
        visibility: "Public",
        lang: "CSS",
        updatedAt: "2026-01-15"
    },
    {
        title: "⚙️ Linked List",
        description: "Dynamic data structure with pointer-based nodes",
        visibility: "Private",
        lang: "C++",
        updatedAt: "2026-01-15"
    },
    {
        title: "🐍 Graph BFS",
        description: "Breadth-first search for graph traversal",
        visibility: "Public",
        lang: "Python",
        updatedAt: "2026-01-15"
    },
    {
        title: "💎 Quick Sort",
        description: "Partition-based efficient sorting",
        visibility: "Private",
        lang: "Typescript",
        updatedAt: "2026-01-15"
    },
];

const SnippetsGallery = () => {
    return (
        <section className="snippets-gallery">
            {snippets.map((item) => (
                <SnippetCard key={item.title} {...item} />
            ))}
        </section>
    )
}

export { SnippetsGallery }