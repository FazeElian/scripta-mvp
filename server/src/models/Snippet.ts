import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    HasOne,
    AllowNull
} from "sequelize-typescript";

// Models
import User from "./User";
import Folder from "./Folder";
import SnippetContent from "./SnippetContent";

@Table({
    tableName: "snippets"
})

class Snippet extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    declare title: string;

    @Column(DataType.STRING(100))
    declare description: string;

    @AllowNull(false)
    @Column(DataType.STRING(30))
    declare language: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    declare isTemplate: boolean;

    @Column(DataType.ENUM("public", "private", "not-listed"))
    declare visibility: string;

    // User relation
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    declare userId: string;

    @BelongsTo(() => User)
    declare user: User;

    // Folder relation
    @ForeignKey(() => Folder)
    @Column(DataType.UUID)
    declare folderId: string;

    @BelongsTo(() => Folder)
    declare folder: Folder;

    // Content relation
    @HasOne(() => SnippetContent)
    declare content: SnippetContent;
}

export default Snippet;