import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    AllowNull
} from "sequelize-typescript";

// Models
import Snippet from "./Snippet";

@Table({
    tableName: "snippet_contents",
    timestamps: false
})

class SnippetContent extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    declare code: string;

    @Column(DataType.TEXT)
    declare documentation: string;

    @Column(DataType.TEXT)
    declare diagramData: string;

    @ForeignKey(() => Snippet)
    @AllowNull(false)
    @Column(DataType.UUID)
    declare snippetId: string;

    // Snippet relation
    @BelongsTo(() => Snippet, { onDelete: 'CASCADE' })
    declare snippet: Snippet;
}

export default SnippetContent;