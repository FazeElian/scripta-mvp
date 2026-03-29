# Database Design

The database is designed to handle a hierarchical structure where users own folders and snippets.

### Core Entities
- **User:** The owner of the data. Includes profile metadata and hashed credentials.
- **Folder:** A logical container for snippets. A folder belongs to one user.
- **Snippet:** The main resource. It contains metadata like `title` and `language`.
- **Snippet_Content:** A specialized table for heavy data (code, docs, diagram strings).

## Relationships & Constraints
- **One-to-Many (User -> Folder/Snippet):** A user can create multiple resources.
- **Optional Association (Folder -> Snippet):** A snippet can exist without a folder (`0..*`).
- **Composition (Snippet -> Snippet_Content):** We use a **1:1 relationship**. When a Snippet is deleted, its content is removed via `ON DELETE CASCADE`.

## Data Types Strategy
- **Text:** Used for `code` and `documentation` in `Snippet_Content` to bypass the 255-character limit of standard strings.
- **String(7):** Specifically for the `color` field in Folders to store Hexadecimal codes (e.g., `#FFFFFF`).