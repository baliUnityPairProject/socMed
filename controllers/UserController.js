const bcrypt = require('bcrypt')
const { Photo, User, Like, Comment } = require('../models')
const Op = require('sequelize').Sequelize.Op

class UserController {
    static registerForm(req, res){
        res.render('register')
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
        res.render('login')
    }

    static login(req, res){
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
                throw `Sorry you have not registered yet!`
            }else{
                return bcrypt.compare(data_login.password, result.password)
            }
        } )
        .then( result => {
            if(result){
                req.session.user = {
                    name: data_login.username
                }
                //redirect ke home
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
            photo_id: req.params.photo_id
        }
        User.findOne({
            where:{
                "username": req.session.username
            }
        })
        .then( result => {
            newData.user_id = result.id
            Like.create(newData)
        } )
        .then( result => {
            //redirect ke postingan itu
        } )
        .catch( err => {
            //redirect ke postingan itu dengan message error
        } )
    }

    static unLike(req, res){
        let data = {
            photo_id: Number(req.params.photo_id)
        }
        User.findOne({
            where:{
                "username": req.session.username
            }
        })
        .then( result => {
            data.user_id = result.id
            return Like.destroy({
                where:{
                    [Op.and]:[
                        {"photo_id": photo_id},
                        {"user_id": user_id}
                    ]
                }
            })
        } )
        .then( result => {
            //redirect ke postingan itu
        } )
        .catch( err => {
            //redirect ke postingan itu dengan message error
        } )
    }

    static addComment(req, res){
        let newData = {
            photo_id: req.params.photo_id,
            message: req.body.message
        }
        User.findOne({
            where:{
                "username": req.session.username
            }
        })
        .then( result =>{
            newData.user_id = result.id
            return Comment.create(newData)
        } )
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

    static deleteUser(req, res){
        let user_id = req.params.user_id
        User.destroy(user_id)
        .then( result => {

        } )
        .catch( err => {

        } )
    }
}

module.exports = UserController