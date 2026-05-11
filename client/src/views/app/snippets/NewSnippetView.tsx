import { Code } from "lucide-react"

// Components for this view
import { PageTitle } from "@/components/app/atoms/PageTitle"
import { NewSnippetForm } from "@/components/app/molecules/NewSnippetForm"

// Title hook
import useDocumentTitle from "@/hooks/useDocumentTitle"

const NewSnippetView = () => {
    // Title
    useDocumentTitle("New Snippet | Scripta")

    return (
        <main className="app-content">
            <PageTitle
                title="New Snippet"
                subtitle="Create a new code snippet to document and share"
            />
            <NewSnippetForm
                icon={Code}
                title="Snippet Details"
                subtitle="Fill in the basic information for your snippet"
            />
        </main>
    )
}

export default NewSnippetView