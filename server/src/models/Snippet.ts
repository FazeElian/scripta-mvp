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

    @Column(DataType.TEXT)
    declare description: string;

    @AllowNull(false)
    @Column(DataType.STRING(30))
    declare lang: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    declare isTemplate: boolean;

    @Column(DataType.ENUM("public", "private", "unListed"))
    declare visibility: string;

    // User relation
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    declare userId: string;

    @BelongsTo(() => User)
    declare user: User;

    // Content relation
    @HasOne(() => SnippetContent)
    declare content: SnippetContent;
}

export default Snippet;