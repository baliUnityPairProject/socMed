const { Photo, User, Like, Comment } = require('../models')

class PhotoController {
    static listPhoto(req, res){
        Photo.findAll({
            include: [User, Like, Comment]
        })
        .then( result => {
            for(let i=0; i< result.length; i++){
                result.numLike = result[i].Likes.length
            }
            res.send(result)
            //render home
        } )
        .catch( err => {
            res.send(err)
            //something went wrong
        } )
    }

    static listPhotoById(req, res){
        let photo_id = req.params.photo_id
        Photo.findByPk(photo_id)
        .then( result => {

        } )
        .catch( err => {
            
        } )
    }

    static listPhotoUser(req, res){
        let user_id = req.params.user_id
        Photo.findAll({
            include: [User, Like, Comment],
            where:{
                "id": user_id
            }
        })
        .then( result => {
            //render user page
        } )
        .catch( err => {
            //something went wrong
        } )
    }
}

module.exports = PhotoController