const { Photo, User, Like, Comment } = require('../models')

class UserController {
    static addForm(req, res){
        res.render('addForm')
    }

    static addUser(req, res){
        let newData = req.body
        User.create(newData)
        .then( result => {
            res.redirect('/login')
        } )
        .catch( err => {
            res.send(err)
        } )
    }

    static addLike(req, res){
        let newData = {
            user_id: req.query.user_id,
            photo_id: req.query.photo_id
        }

        Like.create(newData)
        .then( result => {

        } )
        .catch( err => {

        } )
    }

    static addComment(req, res){
        let newData = {
            user_id: req.query.user_id,
            photo_id: req.query.photo_id,
            message: req.body.message
        }
        Comment.create(newData)
        .then( result => {

        } )
        .catch( err => {

        } )
    }

    static update(req,res){
        let user_id = req.params.user_id
        let newData= {
            username: req.body.username,
            name: req.body.name,
            gender: req.body.gender
        }

        User.update(newData, {
            where:{
                "id": user_id
            }
        })
        .then( result => {

        } )
        .catch( err => {

        } )
    }

    
}

module.exports = UserController