//Controllers
const config = require('../config/config.json');
const utils = require('../utils/utils');
const universityRepository = require('../repositories/universityRepository');
let CustomError = require('../models/general/customError')

async function getUniversities(req) {
    try {
        let {
            query
        } = req;

        let {
            limit,
            offset,
            filter
        } = req.query;

        limit = limit ? parseInt(limit) : config.limit;
        offset = offset ? parseInt(offset) : config.offset;

        //process universities
        let universities = await universityRepository.getUniversities({
            limit,
            offset,
            filter
        });

        return universities;
    } catch (error) {
        throw error;
    }
}

async function createUniversity(req) {
    try {
        let {
            body,
            headers
        } = req;
        //TODO: Enhance to have unique checking
        let university = await universityRepository.createUniversity(body);

        return university;
    } catch (error) {
        throw error;
    }

}

async function getUniversityById(req) {
    try {
        let {
            id
        } = req.params;

        id = id ? parseInt(id) : null;
        if (!id)
            throw new CustomError(400, 'University ID is not valid')

        let university = await universityRepository.getUniversityById({
            id
        });

        //process universities (Can be improve to set into configuration file)
        if (!university) {
            throw new CustomError(404, 'Record Not found');
        }

        return university;
    } catch (error) {
        throw error;
    }
}

async function updateUniversityById(req, res) {
    try {
        let {
            body,
            params
        } = req

        let {
            id
        } = params;

        id = id ? parseInt(id) : null;
        if (!id)
            throw new CustomError(400, 'University ID is not valid')

        let university = await universityRepository.getUniversityById({
            id
        });
        if (!university) {
            throw new CustomError(404, 'Record Not found');
        }

        let result = await universityRepository.updateUniversityById(body, university);
        return result;
    } catch (error) {
        throw error;
    }
}

async function deleteUniversitybyId(req, res) {
    try {
        let {
            params
        } = req

        let {
            id
        } = params;

        id = id ? parseInt(id) : null;
        if (!id)
            throw new CustomError(400, 'University ID is not valid')

        let university = await universityRepository.getUniversityById({
            id
        });
        if (!university) {
            throw new CustomError(404, 'Record Not found');
        }

        let result = await universityRepository.deleteUniversitybyId(university);



        return result;
    } catch (error) {
        throw error;
    }
}

async function bookmarkUniversityById(req, res) {
    try {
        let {
            params
        } = req

        let {
            id
        } = params;

        id = id ? parseInt(id) : null;
        if (!id)
            throw new CustomError(400, 'University ID is not valid')

        let university = await universityRepository.getUniversityById({
            id
        });
        if (!university) {
            throw new CustomError(404, 'Record Not found');
        }

        let result = await universityRepository.updateUniversityById({
            isBookmark: true
        }, university);

        return result;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getUniversities,
    createUniversity,
    getUniversityById,
    updateUniversityById,
    deleteUniversitybyId,
    bookmarkUniversityById
}