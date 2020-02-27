const { Photo, User, Like, Comment } = require('../models')

class LikeCommentController {
    static photoLike(req, res){
        let photo_id = req.params.photo_id
        Like.findAll({
            where:{
                "photo_id": photo_id
            }
        })
        .then( result => {
            let numLike = result.length

        } )
        .catch( err => {

        } )
    }

    static photoComment(req, res){
        let photo_id = req.params.photo_id
        Comment.findAll({
            where:{
                "photo_id": photo_id
            }
        })
        .then( result => {

        } )
        .catch( err => {

        } )
    }
    
}

module.exports = LikeCommentController