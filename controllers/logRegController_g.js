"use strict"
const { User } = require('../m odels')

class LoginRegister {

    static formLogin(req, res) {
        res.render('./login-register/login')
    }

    static login(req, res) {
        let error = `Sorry you have not registered yet!`
        const body = {
            username: req.body.username,
            password: req.body.password
        }
        User.findOne({ where: { username: body.username } })
            .then(() => {
                res.redirect('/home')
            })
            .then(err => {
                res.redirect(`/login?err=${error}`)
            })
    }

    static formRegister(req, res) {
        res.render('./login-register/login')
    }
    
    static register(req, res) {
        const body = {
            username: req.body.username,
            mail: req.body.mail,
            gender: req.body.gender,
            password: req.body.password
        }
        User.create(body)
            .then(() => {
                res.redirect('/login')
            })
            .catch(err => {
                res.redirect(`/register=${err.message}`)
            })
    }

}

module.exports = LoginRegister
