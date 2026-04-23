import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    PrimaryKey,
    Unique,
    AllowNull,
    BelongsToMany
} from "sequelize-typescript";

// Models
import Snippet from "./Snippet";
import SnippetTag from "./SnippetTag";

@Table({
    tableName: "tags",
    timestamps: true
})
class Tag extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING(50))
    declare name: string;

    @BelongsToMany(() => Snippet, () => SnippetTag)
    declare snippets: Snippet[];
}

export default Tag;