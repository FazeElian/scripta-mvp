import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

type FlowNode = {
    id: string;
    data: { label: string };
    position: { x: number; y: number };
    type?: "input" | "output" | "default";
};

type FlowEdge = {
    id: string;
    source: string;
    target: string;
    label?: string;
    animated?: boolean;
};

export type FlowDiagram = {
    nodes: FlowNode[];
    edges: FlowEdge[];
};

export default class DiagramService {
    async generateDiagram(code: string, lang: string): Promise<FlowDiagram> {
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are a JSON API. You ONLY output raw JSON, nothing else.
                    Output format (strictly):
                    {"nodes":[{"id":"1","type":"input","data":{"label":"Start"},"position":{"x":250,"y":0}}],"edges":[{"id":"e1-2","source":"1","target":"2"}]}

                    Rules:
                    - NO markdown, NO backticks, NO mermaid, NO explanation
                    - node types:
                    "input"    → entry point (oval, only one)
                    "output"   → exit point (oval, can be multiple)
                    "decision" → if/else/switch conditions (diamond shape)
                    "default"  → all other process steps (rectangle)
                    - x=250 default, decision branches: left x=100, right x=400
                    - y increments by 100 per level
                    - labels max 5 words
                    - edge label only for decision branches: "yes"/"no" or "true"/"false"`,
                },
                {
                    role: "user",
                    content: `Generate flowchart JSON for this ${lang} code. Reply with JSON only:\n\n${code}`,
                },
            ],
            temperature: 0.1, // lower = more deterministic JSON
            max_tokens: 1500, // more tokens for complex diagrams
        });

        const raw = response.choices[0]?.message?.content ?? "{}";
        return this.parseResponse(raw);
    }

    private parseResponse(raw: string): FlowDiagram {
        try {
            const cleaned = raw
                .replace(/```json\n?/g, "")
                .replace(/```\n?/g, "")
                .trim();

            if (/^(flowchart|graph)\s/i.test(cleaned)) {
                throw new Error("Model returned Mermaid instead of JSON");
            }

            const parsed = JSON.parse(cleaned);
            if (!Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) {
                throw new Error("Invalid diagram structure");
            }
            return parsed as FlowDiagram;
        } catch {
            return {
                nodes: [
                    { id: "1", type: "input", data: { label: "Start" }, position: { x: 250, y: 0 } },
                    { id: "2", type: "output", data: { label: "Parse error" }, position: { x: 250, y: 100 } },
                ],
                edges: [{ id: "e1-2", source: "1", target: "2" }],
            };
        }
    }
}