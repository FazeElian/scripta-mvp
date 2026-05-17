import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    PrimaryKey,
    Unique,
    AllowNull,
    HasMany
} from "sequelize-typescript";

// Models
import Snippet from "./Snippet";
import Collection from "./Collection";

@Table({
    tableName: "users"
})

class User extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @Default("student")
    @Column(DataType.ENUM("student", "educator", "admin"))
    declare role: string;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare email: string;

    @AllowNull(false)
    @Column(DataType.STRING(255))
    declare password: string;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING(15))
    declare userName: string;

    @AllowNull(false)
    @Column(DataType.STRING(60))
    declare fullName: string;

    @Column(DataType.ENUM("Terminal", "Braces", "Cpu", "Code", "Hash", "Bug", "Binary", "GitGraph"))
    declare avatar: string;

    @Column(DataType.STRING(200))
    declare bio: string;

    @Column(DataType.STRING(100))
    declare website: string;

    @Column(DataType.STRING(50))
    declare githubUser: string;

    // Relations with snippet
    @HasMany(() => Snippet)
    declare snippets: Snippet[];

    // Relations with collection
    @HasMany(() => Collection)
    declare collections: Collection[];
}

export default User;