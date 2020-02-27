const express = require('express')
const routerMain = express.Router()

const PhotoController = require('../controllers/PhotoController')

routerMain.get('/', PhotoController.listPhoto)

module.exports = routerMain