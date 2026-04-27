import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default class DiagramService {
    async generateDiagram(code: string, lang: string): Promise<string> {
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are an expert at generating Mermaid flowchart diagrams.
                    You ONLY respond with raw Mermaid syntax starting with 'flowchart TD'.
                    No markdown backticks, no explanation, no comments.

                    IMPORTANT rules:
                    - Node text: If a node contains special characters ((), [], {}, "", '), you MUST wrap the text in double quotes. Example: id1["Text with (brackets)"]
                    - Formatting: Use simple alphanumeric IDs for nodes (e.g., A, B, C or node1, node2).
                    - Clean Text: Do not use characters like > < or # inside node labels unless they are inside double quotes.
                    - No Markdown: Strictly avoid wrapping the response in \`\`\`mermaid or \`\`\` blocks.`
                },
                {
                    role: "user",
                    content: `Generate a Mermaid flowchart for this ${lang} algorithm:\n\n${code}`
                }
            ],
            temperature: 0.3,
            max_tokens: 1000,
        });

        const diagram = response.choices[0]?.message?.content ?? "";
        return diagram.trim();
    }
}