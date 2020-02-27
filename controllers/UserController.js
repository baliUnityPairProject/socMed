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

            }else{

            }
        } )
        .catch( err => {

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