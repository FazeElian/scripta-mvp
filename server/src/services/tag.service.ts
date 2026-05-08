import { Op } from "sequelize";
import Tag from "../models/Tag";

export default class TagService {
    async search(query: string): Promise<{ name: string }[]> {
        const tags = await Tag.findAll({
            where: { name: { [Op.iLike]: `%${query}%` } },
            attributes: ["name"],
            limit: 8,
            order: [["name", "ASC"]],
        });
        return tags.map(t => ({ name: t.name }));
    }
}