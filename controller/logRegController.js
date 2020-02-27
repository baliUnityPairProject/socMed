"use strict"
const { User } = require('../models')
const bcrypt = require('bcrypt')

class LoginRegister {

    static formLogin(req, res) {
        res.render('detail')
    }

    // static login(req, res) {
    //     // let error = `Sorry you have not registered yet!`
    //     const body = {
    //         username: req.body.username,
    //         password: req.body.password
    //     }
    //     User.findOne({ where: { username: body.username } })
    //         .then((user) => {
    //             const password = req.body.password
    //             bcrypt.compare(password, user.password)
    //                 .then(pass => {
    //                     req.session.user = {
    //                         name: user.username
    //                     }
    //                     res.redirect('/movies')
    //                 });
    //         })
    //         .cathch(err => {
    //             res.redirect(`/login?err=${err.error}`)
    //         })
    // }

    static formRegister(req, res) {
        res.render('register')
    }
    // static register(req, res) {
    //     const body = {
    //         username: req.body.username,
    //         mail: req.body.mail,
    //         gender: req.body.gender,
    //         password: req.body.password
    //     }
    //     User.create(body)
    //         .then(() => {
    //             res.redirect('/login')
    //         })
    //         .catch(err => {
    //             res.redirect(`/register=${err.message}`)
    //         })
    // }

}

module.exports = LoginRegister
