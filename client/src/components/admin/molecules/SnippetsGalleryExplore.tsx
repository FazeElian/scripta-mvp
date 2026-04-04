// Styles
import "@/assets/css/components/SnippetsGallery.css";

// Sub component
import { SnippetCardExplore } from "../atoms/SnippetCardExplore";

const snippets = [
    {
        title: "🐍 Binary Search",
        description: "Classic divide-and-conquer search algorithm",
        visibility: "Public",
        lang: "Python",
        updatedAt: "2026-01-15",
        authorName: "John Doe",
        authorAvatar: "Terminal"
    },
    {
        title: "⚡ React useEffect Hook",
        description: "Side effect management in React components",
        visibility: "Private",
        lang: "Javascript",
        updatedAt: "2026-01-18",
        authorName: "Jane Smith",
        authorAvatar: "Code"
    },
    {
        title: "🗄️ SQL Joins Cheatsheet",
        description: "Visual guide to INNER, LEFT, RIGHT, FULL joins",
        visibility: "Public",
        lang: "SQL",
        updatedAt: "2026-01-20",
        authorName: "Carlos Ruiz",
        authorAvatar: "GitGraph"
    },
    {
        title: "🐹 Merge Sort Implementation",
        description: "Efficient O(n log n) sorting algorithm",
        visibility: "Public",
        lang: "Java",
        updatedAt: "2026-01-22",
        authorName: "Maria Lopez",
        authorAvatar: "Braces"
    },
    {
        title: "🎨 CSS Grid Layout",
        description: "Modern two-dimensional layout system",
        visibility: "Public",
        lang: "CSS",
        updatedAt: "2026-01-25",
        authorName: "Alex Turner",
        authorAvatar: "Hash"
    },
    {
        title: "⚙️ Linked List",
        description: "Dynamic data structure with pointer-based nodes",
        visibility: "Private",
        lang: "C++",
        updatedAt: "2026-01-28",
        authorName: "Sam Chen",
        authorAvatar: "GitGraph"
    },
    {
        title: "🐍 Graph BFS",
        description: "Breadth-first search for graph traversal",
        visibility: "Public",
        lang: "Python",
        updatedAt: "2026-02-01",
        authorName: "John Doe",
        authorAvatar: "Terminal"
    },
    {
        title: "💎 Quick Sort",
        description: "Partition-based efficient sorting",
        visibility: "Private",
        lang: "Typescript",
        updatedAt: "2026-02-03",
        authorName: "Laura Kim",
        authorAvatar: "Cpu"
    },
    {
        title: "🌐 Fetch API Wrapper",
        description: "Reusable HTTP client with error handling",
        visibility: "Public",
        lang: "Javascript",
        updatedAt: "2026-02-05",
        authorName: "Jane Smith",
        authorAvatar: "Code"
    },
    {
        title: "🟣 Singleton Pattern",
        description: "Creational design pattern implementation",
        visibility: "Public",
        lang: "C#",
        updatedAt: "2026-02-08",
        authorName: "Erik Larsson",
        authorAvatar: "Binary"
    },
    {
        title: "💅 SASS Mixins",
        description: "Reusable style blocks with parameters",
        visibility: "Public",
        lang: "SASS",
        updatedAt: "2026-02-10",
        authorName: "Nina Patel",
        authorAvatar: "Bug"
    },
    {
        title: "🔷 Generic Repository",
        description: "Type-safe data access layer pattern",
        visibility: "Private",
        lang: "Typescript",
        updatedAt: "2026-02-12",
        authorName: "Carlos Ruiz",
        authorAvatar: "Database"
    },
];

const SnippetsGalleryExplore = () => {
    return (
        <section className="snippets-gallery">
            {snippets.map((item) => (
                <SnippetCardExplore key={item.title} {...item} />
            ))}
        </section>
    )
}

export { SnippetsGalleryExplore }