import { BookOpenText, Code, Boxes, Network, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const collections = [
    {
        icon: Code,
        label: "Programming Fundamentals",
        description: "Variables, loops, functions, and control flow. The building blocks every developer needs.",
        snippets: 12, docs: 5, diagrams: 3, color: "blue"
    },
    {
        icon: Boxes,
        label: "Object-Oriented Programming",
        description: "Inheritance, polymorphism, encapsulation, and design patterns for scalable code.",
        snippets: 18, docs: 8, diagrams: 6, color: "purple"
    },
    {
        icon: Network,
        label: "Data Structures",
        description: "Arrays, linked lists, trees, graphs, and stacks. Know your data, master your code.",
        snippets: 24, docs: 10, diagrams: 8, color: "seagreen"
    },
    {
        icon: Zap,
        label: "Algorithms",
        description: "Sorting, searching, recursion, and complexity analysis. Think algorithmically.",
        snippets: 15, docs: 12, diagrams: 7, color: "orange"
    },
];

export const ExploreCollections = () => (
    <section className="explore-collections">
        <div className="explore-section-header">
            <h2 className="explore-section-title">
                <BookOpenText /> Featured Knowledge Collections
            </h2>
        </div>
        <div className="coming-soon-wrapper">
            <div className="explore-collections-grid coming-soon-dimmed">
                {collections.map((c) => (
                    <Link
                        to="#"
                        key={c.label}
                        className={`explore-collection-card explore-collection-card--${c.color}`}
                    >
                        <div className="top-explore-collection-card">
                            <span className="explore-collection-icon">{<c.icon />}</span>
                            <p className="explore-collection-name">{c.label}</p>
                        </div>
                        <p className="explore-collection-description">{c.description}</p>
                        <div className="explore-collection-meta">
                            <span>{"</>"} {c.snippets} snippets</span>
                            <span>📄 {c.docs} docs</span>
                            <span>⎇ {c.diagrams} diagrams</span>
                        </div>
                    </Link>
                ))}
            </div>
            {/* <div className="coming-soon-overlay">
                <span className="coming-soon-badge">Coming soon...</span>
            </div> */}
        </div>
    </section>
);