const loginRegister = require('../controller/logRegController')
const photoController = require('../controller/lo')
const express = require('express')
const Router = express.Router()

const checkLogin = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login')
    } else {
        next()
    }
}

Router.get('/', (req, res) => { res.render('home') })
Router.get('/home', (req, res) => { res.render('home') })

Router.get('/login', loginRegister.formLogin)
Router.post('/login', loginRegister.login)
Router.get('/register', loginRegister.register)
Routes.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        res.redirect('/movies')
    })
})

module.exports = Router