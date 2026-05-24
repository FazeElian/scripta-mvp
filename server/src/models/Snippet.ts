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
    AllowNull,
    CreatedAt,
    UpdatedAt,
    BelongsToMany
} from "sequelize-typescript";

// Models
import User from "./User";
import SnippetContent from "./SnippetContent";
import Tag from "./Tag";
import SnippetTag from "./SnippetTag";

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

    @AllowNull(true)
    @Column(DataType.STRING)
    declare stdin: string;

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

    // Tag relation
    @BelongsToMany(() => Tag, () => SnippetTag)
    declare tags: Tag[];

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;
}

export default Snippet;