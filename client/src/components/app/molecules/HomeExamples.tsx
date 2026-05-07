import { Code2, Hash, Terminal } from "lucide-react";

const examples = [
    {
        icon: <Code2 size={14} />,
        tag: "#algorithms",
        title: "Sorting & Searching",
        description: "Bubble sort, Binary search, Quick sort, Merge sort, and more classic implementations.",
    },
    {
        icon: <Hash size={14} />,
        tag: "#data-structures",
        title: "Linear Structures",
        description: "Linked lists, Stacks, Queues, Arrays, and fundamental data organization patterns.",
    },
    {
        icon: <Terminal size={14} />,
        tag: "#poo",
        title: "Object Oriented Programming",
        description: "Inheritance, Polymorphism, Interfaces, Encapsulation, and design patterns.",
    },
];

const HomeExamples = () => {
    return (
        <section className="home-examples">
            <h1 className="home-title">Ready-to-use snippets for your courses.</h1>
            <h2 className="home-subtitle">Start with curated collections or build your own</h2>

            <div className="home-examples-grid">
                {examples.map((ex) => (
                    <div key={ex.tag} className="home-examples-card">
                        <div className="home-examples-card-header">
                            <span className="home-examples-card-icon">{ex.icon}</span>
                            <span className="home-examples-card-tag">{ex.tag}</span>
                        </div>
                        <h3>{ex.title}</h3>
                        <p>{ex.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export { HomeExamples };