const express = require('express')
const Router = express.Router()

const PhotoController = require('../controllers/PhotoController')
// const loginRegister = require('../controllers/logRegController')
const UserController = require('../controllers/UserController')

const checkLogin = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login')
    } else {
        next()
    }
}

Router.get('/', PhotoController.listPhoto)
Router.get('/home', PhotoController.listPhoto)

Router.get('/login', UserController.loginForm)
Router.post('/login', UserController.login)

Router.get('/register', UserController.registerForm)
Router.post('/register', UserController.register)

Router.get('/photos/:photo_id', checkLogin, PhotoController.listPhotoById)

Router.post('/photos/:photo_id/add-comment', checkLogin, UserController.addComment)

Router.get('/photos/:photo_id/add-like', checkLogin, UserController.addLike)
Router.get('/photos/:photo_id/un-like', checkLogin, UserController.unLike)

//Kurang add photo oleh user

Router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        res.redirect('/home')
    })
})

module.exports = Router