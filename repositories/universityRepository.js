const University = require('../models/university');
const config = require('../config/config.json');
const utils = require('../utils/utils');
const {
    Op
} = require('sequelize');

async function getUniversities({
    limit,
    offset,
    filter
}) {
    try {
        let whereQuery = {
            isActive: true
        };
        let orderQuery = [
            ['IsBookmark', 'DESC'] //Default Sort by Bookmarked first
        ];

        if (filter) {
            whereQuery = {
                [Op.and]: [{
                    IsActive: true
                }],
                [Op.or]: [{
                        Name: {
                            [Op.like]: `%${filter}%`,
                        },
                    },
                    {
                        Country: {
                            [Op.like]: `%${filter}%`,
                        },
                    },
                    {
                        Webpages: {
                            [Op.like]: `%${filter}%`,
                        },
                    },
                ],
            }
        }

        let universities = await University.findAndCountAll({
            where: whereQuery,
            order: orderQuery,
            limit,
            offset
        });

        return universities;
    } catch (error) {
        throw error;
    }
}

async function createUniversity({
    name,
    webpages,
    country
}) {
    let university = await University.create({
        Name: name,
        Webpages: webpages,
        Country: country,
        IsBookmark: false,
        IsActive: true
    });

    return university;
}

async function getUniversityById({
    id
}) {
    let university = await University.findOne({
        where: {
            id: id,
            IsActive: true,
        }
    });

    return university;
}

async function updateUniversityById(body, university) {
    let uppercaseBody = utils.capitalizeKeys(body);
    let result = await university.update(uppercaseBody);

    return result;
}

async function deleteUniversitybyId(university){
    let result = await university.update({
        IsActive: false,
        DeletedAt: new Date()
    });
    return result;
}




module.exports = {
    getUniversities,
    createUniversity,
    getUniversityById,
    updateUniversityById,
    deleteUniversitybyId
}