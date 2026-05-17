import {
    Table, Column, Model, DataType, Default,
    PrimaryKey, ForeignKey, BelongsTo,
    AllowNull, BelongsToMany
} from "sequelize-typescript";

// Models
import User from "./User";
import Snippet from "./Snippet";
import CollectionSnippet from "./CollectionSnippet";

export type CollectionVisibility = "public" | "private";

@Table({ tableName: "collections" })
class Collection extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @AllowNull(false)
    @Column(DataType.STRING(100))
    declare title: string;

    @Column(DataType.STRING(120))
    declare slug: string | null;

    @Column(DataType.TEXT)
    declare description: string | null;

    @Column(DataType.ENUM("orange", "red", "seagreen", "green", "sky-blue", "blue", "purple", "pink", "yellow"))
    declare color: string;

    @Column(DataType.ENUM(
        // Programming & Code
        "Code",
        "CodeXml",
        "Terminal",
        "Braces",
        "Hash",
        "Binary",
        "Bug",
        "GitGraph",
        "Cpu",
        "Layers",

        // Education & Knowledge
        "BookOpen",
        "BookText",
        "GraduationCap",
        "Library",
        "Lightbulb",
        "Puzzle",
        "Brain",
        "Telescope",
        "FlaskConical",
        "Atom",

        // Structure & Organization
        "FolderOpen",
        "Network",
        "Waypoints",
        "TreePine",
        "Workflow",
        "LayoutDashboard",
        "Blocks",
        "Shapes",

        // Math & Algorithms
        "Calculator",
        "ChartLine",
        "Sigma",
        "Infinity",
        "SortAsc",
        "Filter",
        "Zap",
        "Rocket"
    ))
    declare icon: string;

    @Default("public")
    @Column(DataType.ENUM("public", "private"))
    declare visibility: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    declare isOfficial: boolean;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.UUID)
    declare ownerId: string;

    @BelongsTo(() => User, { foreignKey: "ownerId" })
    declare owner: User;

    @BelongsToMany(() => Snippet, () => CollectionSnippet)
    declare snippets: Snippet[];
}

export default Collection;