// Components for this view
import { PageTitle } from "@/components/app/atoms/PageTitle"

const FilesView = () => {
    return (
        <main className="app-content">
            <PageTitle
                title="My Files"
                subtitle="Organize your snippets into folders"
            />
        </main>
    )
}

export default FilesView