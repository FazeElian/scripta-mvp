import { Cloud, Hash, FileText, Globe } from "lucide-react";

const HomeFeatures = () => {
    return (
        <section className="home-features">
            <div className="home-features-header">
                <h1 className="home-title">Everything you need</h1>
                <h2 className="home-subtitle">Built for students, by developers who remember being students</h2>
            </div>
            <div className="home-features-runtime home-features-card">
                <div className="home-features-icon">
                    <Cloud />
                </div>
                <h3>Cloud Runtime</h3>
                <p>
                    Write your code and run it instantly in the cloud.
                    No compilers to install, no environments to configure,
                    no time wasted on setup.
                </p>
                <div className="home-features-langs">
                    {["Python", "Java", "C++", "JavaScript", "TypeScript"].map((lang) => (
                        <span key={lang} className="home-features-lang-badge">{lang}</span>
                    ))}
                </div>
            </div>

            <div className="home-features-group">
                <div className="home-features-tags home-features-card home-features-card--wide">
                    <div className="home-features-icon">
                        <Hash />
                    </div>
                    <h3>Dynamic Tagging</h3>
                    <div className="home-features-tags-list">
                        {["#data-structures", "#lab-01", "#final-exam", "#poo", "#algorithms"].map((tag) => (
                            <span key={tag} className="home-features-tag-badge">{tag}</span>
                        ))}
                    </div>
                </div>

                <div className="home-features-bottom">
                    <div className="home-features-md home-features-card">
                        <div className="home-features-icon">
                            <FileText />
                        </div>
                        <h3>Markdown Docs</h3>
                        <p>Document alongside your code</p>
                    </div>
                    <div className="home-features-browser home-features-card">
                        <div className="home-features-icon">
                            <Globe />
                        </div>
                        <h3>Zero Install</h3>
                        <p>Works on any browser, any OS</p>
                    </div>
                </div>
            </div>

        </section>
    );
};

export { HomeFeatures };