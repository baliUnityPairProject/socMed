const express = require('express')
const Router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

const PhotoController = require('../controllers/PhotoController')
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

Router.post('/photos/add', checkLogin, upload.single('addfoto'), UserController.addPhoto)

//Kurang add photo oleh user

Router.get('/logout', (req, res) => {
    console.log(req.session.user)
    req.session.destroy(function (err) {
        res.redirect('/home')
    })
})

module.exports = Router