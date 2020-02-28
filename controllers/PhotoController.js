const { Photo, User, Like, Comment } = require('../models')

class PhotoController {
    static listPhoto(req, res){
        Photo.findAll({
            include: [User, Like, Comment]
        })
        .then( result => {
            for(let i=0; i< result.length; i++){
                result[i].numLike = result[i].Likes.length
                result[i].numComment = result[i].Comments.length
            }
            // res.send(result)
            res.render('home', { data: result })
        } )
        .catch( err => {
            res.send(err)
            //something went wrong
        } )
    }

    static listPhotoById(req, res){
        let photo_id = req.params.photo_id
        let data_photo
        let data_like
        let data_comment
        let data_user
        Photo.findByPk(photo_id, {
            include: User
        })
        .then( result => {
            data_photo = result
            return Like.findAll({
                where:{
                    "photo_id": photo_id
                }
            })
        } )
        .then( result => {
            data_like = result
            return Comment.findAll({
                include: User,
                where:{
                    "photo_id": photo_id
                }
            })
        } )
        .then( result => {
            data_comment = result
            return User.findAll({
                where:{
                    "username":req.session.user.name
                }
            })
        } )
        .then( result => {
            data_user = result[0]
            res.render('detail', { data_photo, data_like, data_comment, data_user })
        } )
        .catch( err => {
            res.send('err')
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