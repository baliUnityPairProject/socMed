"use strict"
const { Photo } = require('../models')

class photoController {
    static findAll(req, res) {
        Photo.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.render(err)
        })
    }

    static 
}

module.exports = photoController