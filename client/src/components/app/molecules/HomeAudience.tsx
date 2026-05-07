import { useState } from "react";
import { GraduationCap, BookOpen, Users } from "lucide-react";

type Tab = "students" | "professors" | "groups";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "students",   label: "Students",     icon: <GraduationCap /> },
    { id: "professors", label: "Professors",   icon: <BookOpen /> },
    { id: "groups",     label: "Study Groups", icon: <Users /> },
];

const content: Record<Tab, { icon: React.ReactNode; title: string; description: string }> = {
    students: {
        icon: <GraduationCap size={32} />,
        title: "Build a semester-long portfolio",
        description: "One link for all your labs. Track your progress from day one to graduation. Keep your academic work organized, semester by semester.",
    },
    professors: {
        icon: <BookOpen size={32} />,
        title: "Share assignments in seconds",
        description: "Create a snippet, share the link. Students get the starter code instantly — no emails, no uploads, no confusion.",
    },
    groups: {
        icon: <Users size={32} />,
        title: "Code together, learn faster",
        description: "Save shared solutions, compare approaches, and keep the group's best code in one place for everyone to reference.",
    },
};

const HomeAudience = () => {
    const [active, setActive] = useState<Tab>("students");
    const current = content[active];

    return (
        <section className="home-audience">
            <h1 className="home-title">Built for everyone in CS</h1>
            <h2 className="home-subtitle">Whether you are learning, teaching, or collaborating</h2>

            <div className="home-audience-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`home-audience-tab ${active === tab.id ? "home-audience-tab--active" : ""}`}
                        onClick={() => setActive(tab.id)}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="home-audience-card">
                <span className="home-audience-card-icon">{current.icon}</span>
                <h3>{current.title}</h3>
                <p>{current.description}</p>
            </div>
        </section>
    );
};

export { HomeAudience };