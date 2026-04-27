import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import {
    TransformWrapper,
    TransformComponent
} from "react-zoom-pan-pinch";

import { RefreshCw, Sparkles } from "lucide-react";

mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    flowchart: {
        useMaxWidth: false,
        htmlLabels: true
    }
});

type MermaidDiagramProps = {
    chart: string;
    regenerate: () => void;
    generating: boolean;
};

const MermaidDiagram = ({ chart, generating, regenerate }: MermaidDiagramProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!ref.current || !chart || chart.trim() === "") return;
        
        setError(false);
        const timer = setTimeout(async () => {
            const id = `mermaid-svg-${Math.random().toString(36).substr(2, 9)}`;
            const cleanChart = chart
                .replace(/```mermaid/g, "")
                .replace(/```/g, "")
                .trim();

            try {
                if (ref.current) ref.current.innerHTML = "";

                const { svg } = await mermaid.render(id, cleanChart);
                
                if (ref.current) {
                    ref.current.innerHTML = svg;
                    const svgElement = ref.current.querySelector('svg');
                    if (svgElement) {
                        svgElement.style.maxWidth = "none"; 
                        svgElement.style.height = "auto";
                        svgElement.style.width = "100%";
                        svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
                    }
                }
            } catch (err) {
                console.error("Mermaid Render Error:", err);
                setError(true);
            }
        }, 150);

        return () => clearTimeout(timer);
    }, [chart]);

    if (error) return (
        <div className="error-container">
            <button onClick={regenerate} className="generate-diagram-btn">
                {generating ? "Regenerating..." : "Retry"} <RefreshCw />
            </button>
            <p>Syntax Error in Diagram</p>
        </div>
    );

    return (
        <div className="diagram-shell" key={chart}>
            <button onClick={regenerate} className="generate-diagram-btn">
                {generating ? "Regenerating..." : "Regenerate"}
                {generating ? <Sparkles /> : <RefreshCw />}
            </button>

            <TransformWrapper
                initialScale={.8}
                minScale={0.2}
                centerOnInit
                limitToBounds={false}
                wheel={{
                    step: 0.001,
                    wheelDisabled: false,
                    touchPadDisabled: false,
                    activationKeys: [],
                }}
            >
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                        <div className="diagram-toolbar">
                            <button onClick={() => zoomIn()}>+</button>
                            <button onClick={() => zoomOut()}>−</button>
                            <button onClick={() => resetTransform()}>Reset</button>
                        </div>

                        <TransformComponent
                            wrapperStyle={{ width: "100%", height: "100%" }}
                            contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                        >
                            <div ref={ref} className="mermaid-stage" />
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </div>
    );
};

export { MermaidDiagram };