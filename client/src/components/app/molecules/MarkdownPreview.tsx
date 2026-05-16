import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import MarkdownComponents from "../atoms/MarkdownComponents"

type Props = { markdown: string }

const MarkdownPreview = ({ markdown }: Props) => {
    if (!markdown.length) {
        return "Here will appear the view of the markdown"
    }

    return (
        <div className="cont-editor-doc">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={MarkdownComponents}
            >
                {markdown}
            </ReactMarkdown>
        </div>
    )
}

export default MarkdownPreview