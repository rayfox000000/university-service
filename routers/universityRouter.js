var express = require('express');
var router = express.Router();
var universityController = require('../controllers/universityController');
var utils = require('../utils/utils');

router.get('/university', async function (req, res, next) {
  try {

    let response = await universityController.getUniversities(req);
    let cleanResponse = utils.lowercaseKeys(utils.removeModel(response))
    return res.status(200).json(cleanResponse);

  } catch (error) {
    next(error);
  }
})

router.get('/university/:id', async function (req, res, next) {
  try {

    let response = await universityController.getUniversityById(req);
    let cleanResponse = utils.lowercaseKeys(utils.removeModel(response))
    return res.status(200).json(cleanResponse);

  } catch (error) {
    next(error);
  }
})

router.post('/university', async function (req, res, next) {
  try {

    let response = await universityController.createUniversity(req)
    let cleanResponse = utils.lowercaseKeys(utils.removeModel(response))
    return res.status(201).json(cleanResponse);

  } catch (error) {
    next(error);
  }
})

router.put('/university/:id', async function (req, res, next) {
  try {
    let response = await universityController.updateUniversityById(req)
    let cleanResponse = utils.lowercaseKeys(utils.removeModel(response))
    return res.status(200).json(cleanResponse);

  } catch (error) {
    next(error);
  }
})

router.delete('/university/:id', async function (req, res, next) {
  try {
    let response = await universityController.deleteUniversitybyId(req)
    let cleanResponse = utils.lowercaseKeys(utils.removeModel(response))
    return res.status(200).json(cleanResponse);

  } catch (error) {
    next(error);
  }
})

router.post('/university/bookmark/:id', async function (req, res, next) {
  try {
    let response = await universityController.bookmarkUniversityById(req)
    let cleanResponse = utils.lowercaseKeys(utils.removeModel(response))
    return res.status(200).json(cleanResponse);

  } catch (error) {
    next(error);
  }
})



module.exports = router