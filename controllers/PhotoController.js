const { Photo, User, Like, Comment } = require('../models')

class PhotoController {
    static listPhoto(req, res){
        Photo.findAll({
            include: User
        })
        .then( result => {
            res.send(result)
        } )
        .catch( err => {
            res.send(err)
        } )
    }

}

module.exports = PhotoController