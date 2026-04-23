import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    PrimaryKey,
    Default
} from "sequelize-typescript";

// Models
import Snippet from "./Snippet";
import Tag from "./Tag";

@Table({
    tableName: "snippet_tags",
    timestamps: false
})
class SnippetTag extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Snippet)
    @Column(DataType.UUID)
    declare snippetId: string;

    @ForeignKey(() => Tag)
    @Column(DataType.UUID)
    declare tagId: string;
}

export default SnippetTag;