import { Code } from "lucide-react"

// Components for this view
import { PageTitle } from "@/components/admin/atoms/PageTitle"
import { NewSnippetForm } from "@/components/admin/molecules/NewSnippetForm"

const NewSnippetView = () => {
    return (
        <main className="admin-content">
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