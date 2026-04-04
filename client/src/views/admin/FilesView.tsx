// Components for this view
import { PageTitle } from "@/components/admin/atoms/PageTitle"

const FilesView = () => {
    return (
        <main className="admin-content">
            <PageTitle
                title="My Files"
                subtitle="Organize your snippets into folders"
            />
        </main>
    )
}

export default FilesView