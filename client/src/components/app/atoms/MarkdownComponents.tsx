import type { Components } from "react-markdown";

const MarkdownComponents: Components = {
    h1: (props) => <h1 className="md-h1" {...props} />,
    h2: (props) => <h2 className="md-h2" {...props} />,
    h3: (props) => <h3 className="md-h3" {...props} />,
    p: (props) => <p className="md-p" {...props} />,
    ul: (props) => <ul className="md-ul" {...props} />,
    li: (props) => <li className="md-li" {...props} />,
    a: (props) => <a className="md-link" target="_blank" rel="noopener noreferrer" {...props} />,
    table: (props) => <table className="md-table" {...props} />,
    th: (props) => <th className="md-th" {...props} />,
    td: (props) => <td className="md-td" {...props} />,
    hr: () => <hr className="md-hr" />,
    blockquote: (props) => <blockquote className="md-quote" {...props} />,

    code: ({ className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');
        const isInline = !match;

        return isInline ? (
            <code className="md-code-inline" {...props}>
                {children}
            </code>
        ) : (
            <div className="md-code-block-container">
                <code className={className} {...props}>
                    {children}
                </code>
            </div>
        );
    }
};

export default MarkdownComponents;