import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    HasMany,
    AllowNull
} from "sequelize-typescript";

// Models
import User from "./User";
import Snippet from "./Snippet";

@Table({
    tableName: "folders"
})

class Folder extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @AllowNull(false)
    @Column(DataType.STRING(80))
    declare name: string;

    @Default("#07B863")
    @Column(DataType.STRING(7))
    declare color: string;

    // User relation
    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    declare userId: string;

    @BelongsTo(() => User)
    declare user: User;

    // Snippet relation
    @HasMany(() => Snippet)
    declare snippets: Snippet[];
}

export default Folder;