import { ArrowRight } from "lucide-react";
import HomeGeneratedDiagram from "@/assets/img/home-diagram.webp";

const HomeDiagram = () => {
    return (
        <section className="home-diagram">
            <h1 className="home-title">From Logic to Diagram</h1>
            <h2 className="home-subtitle">Visualize your algorithms when you write them with AI</h2>
            <div className="home-diagram-cont">
                <div className="home-diagram-code">
                    <h1>&lt;/&gt; Your Code</h1>
                    <pre>
                        <code>
                            <span className="code-keyword">if</span>{` score > 90:\n`}
                            {`    grade = `}<span className="code-string">{`"A"`}</span>{`\n`}
                            <span className="code-keyword">elif</span>{` score > 80:\n`}
                            {`    grade = `}<span className="code-string">{`"B"`}</span>{`\n`}
                            <span className="code-keyword">else</span>{`:\n`}
                            {`    grade = `}<span className="code-string">{`"C"`}</span>
                        </code>
                    </pre>
                </div>
                <div className="home-diagram-ai">
                    <div className="home-diagram-ai-badge">
                        <span>✦</span> Powered by AI
                    </div>
                    <div className="home-diagram-ai-arrow">
                        <span className="home-diagram-ai-line" />
                        <ArrowRight />
                    </div>
                </div>
                <div className="home-diagram-result">
                    <h1>✦ Generated Diagram</h1>
                    <img 
                        src={HomeGeneratedDiagram} 
                        fetchPriority="high"
                        loading="eager"
                        width={800}
                        height={500}
                        alt="diagram preview"
                    />
                </div>
            </div>
        </section>
    )
}

export { HomeDiagram };