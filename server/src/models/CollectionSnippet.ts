import {
    Table, Column, Model, DataType, Default,
    ForeignKey, PrimaryKey, BelongsTo
} from "sequelize-typescript";


import Collection from "./Collection";
import Snippet from "./Snippet";

@Table({ tableName: "collection_snippets", timestamps: false })
class CollectionSnippet extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    declare id: string;

    @ForeignKey(() => Collection)
    @Column(DataType.UUID)
    declare collectionId: string;

    @ForeignKey(() => Snippet)
    @Column(DataType.UUID)
    declare snippetId: string;

    @Default(0)
    @Column(DataType.INTEGER)
    declare orderIndex: number;

    @BelongsTo(() => Collection)
    declare collection: Collection;

    @BelongsTo(() => Snippet)
    declare snippet: Snippet;
}

export default CollectionSnippet;