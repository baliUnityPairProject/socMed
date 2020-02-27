const bcrypt = require('bcrypt')
const { Photo, User, Like, Comment } = require('../models')

class UserController {
    static registerForm(req, res){
        res.render('addForm')
    }

    static register(req, res){
        let newData = {
            username: req.body.username,
            name: req.body.name,
            password: req.body,
            email: req.body.password,
            gender: req.body.gender,
        }
        User.create(newData)
        .then( result => {
            res.redirect('/login')
        } )
        .catch( err => {
            //send error message berdasarkan error validation
            res.send(err)
        } )
    }

    static loginForm(req, res){
        res.render('./login-register/login')
    }

    static login(req, res){
        let error = `Sorry you have not registered yet!`
        let data_login = {
            username: req.body.username,
            password: req.body.password
        }
        User.findOne({
            where:{
                "username": data_login.username
            }
        })
        .then( result => {
            if(!result){
                throw error
            }else{
                return bcrypt.compare(data_login.password, result.password)
            }
        } )
        .then( result => {
            if(result){
                //redirect ke user page
            }else{
                throw 'Wrong Password'
            }
        } )
        .catch( err => {
            //send error ke login form
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
            //redirect ke postingan itu
        } )
        .catch( err => {
            //redirect ke postingan itu dengan message error
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
            //redirect ke postingan itu
        } )
        .catch( err => {
            //redirect ke postingan itu dengan message error
        } )
    }

    static updateForm(req, res){
        let user_id = req.params.id
        User.findByPk(user_id)
        .then( result => {
            //render update form
        } )
        .catch( err => {
            //something went wrong
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
            },
            individualHooks: true
        })
        .then( result => {
            //redirect ke user page
        } )
        .catch( err => {
            //something went wrong
        } )
    }

    static addPhotoForm(req, res){
        res.render('photoForm')
    }

    static addPhoto(req, res){
        let newData = {
            link: req.body.link,
            user_id: Number(req.params.user_id)
        }

        Photo.create(newData)
        .then( result => {
            //redirect ke user page
        } )
        .catch( err => {
            //something went wrong
        } )
    }

    static deletePhoto(req, res){
        let photo_id = req.params.photo_id
        Photo.destroy({
            where:{
                "id":photo_id
            }
        })
        .then( result => {
            //redirect ke user page
        } )
        .catch( err => {
            //something went wrong
        } )
    }


}

module.exports = UserController