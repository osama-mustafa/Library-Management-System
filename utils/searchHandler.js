const { Op } = require('sequelize');

const search = async (model, fields, searchTerm) => {
    const result = await model.findAll({
        where: {
            [Op.or]: fields.map(field => ({
                [field]: {
                    [Op.like]: `%${searchTerm}%`
                }
            }))
        }
    });
    return result;
}

module.exports = search;