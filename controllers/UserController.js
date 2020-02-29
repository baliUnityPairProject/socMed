const bcrypt = require('bcrypt')
const {
    Photo,
    User,
    Like,
    Comment
} = require('../models')
const Op = require('sequelize').Sequelize.Op
const nodemailer = require('nodemailer')
const msgGenerate = require('../helper/msgGenerate')

class UserController {
    static registerForm(req, res) {
        let msg = req.query.msg
        res.render('register', {
            msg
        })
    }

    static register(req, res) {
        let newData = {
            username: (req.body.username == '') ? null : req.body.username,
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            gender: req.body.gender,
        }
        User.create(newData)
            .then(result => {
                let output_msg = msgGenerate(newData)

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'lnvavnl@gmail.com', // generated ethereal user
                        pass: '-silahkan isi password-' // generated ethereal password
                    }
                });

                // send mail with defined transport object
                transporter.sendMail({
                    from: '"socMed" <lnvavnl@gmail.com>', // sender address
                    to: `${newData.email}`, // list of receivers
                    subject: "Registration Confirmation", // Subject line
                    text: "Hello world?", // plain text body
                    html: output_msg // html body
                }, (err, info) => {
                    if (err) {
                        return console.log(err)
                    }
                    console.log("Message sent: success");
                });

                res.redirect('/login')
            })
            .catch(err => {
                //send error message berdasarkan error validation
                let err_msg = 'Username already taken'
                res.redirect(`/register?msg=${err_msg}`)
            })
    }

    static loginForm(req, res) {
        let msg = req.query.msg
        res.render('login', {
            msg
        })
    }

    static login(req, res) {
        let data_login = {
            username: req.body.username,
            password: req.body.password
        }
        let id
        User.findOne({
                where: {
                    "username": data_login.username
                }
            })
            .then(result => {
                if (!result) {
                    throw `Sorry you have not registered yet!`
                } else {
                    id = result.id
                    return bcrypt.compare(data_login.password, result.password)
                }
            })
            .then(result => {
                if (result) {
                    req.session.user = {
                        "id": id,
                        name: data_login.username
                    }
                    res.redirect('/home')
                } else {
                    throw 'Wrong Password'
                }
            })
            .catch(err => {
                //send error ke login form
                if (typeof (err) == typeof ('')) {
                    res.redirect(`/login?msg=${err}`)
                } else {
                    res.send(err)
                }
            })
    }

    static addLike(req, res) {
        let newData = {
            photo_id: req.params.photo_id
        }
        User.findOne({
                where: {
                    "username": req.session.user.name
                }
            })
            .then(result => {
                newData.user_id = result.id
                Like.create(newData)
            })
            .then(result => {
                res.redirect(`/photos/${newData.photo_id}`)
            })
            .catch(err => {
                res.send(err)
                //redirect ke postingan itu dengan message error
            })
    }

    static unLike(req, res) {
        let data = {
            photo_id: Number(req.params.photo_id)
        }
        User.findOne({
                where: {
                    "username": req.session.user.name
                }
            })
            .then(result => {
                data.user_id = result.id
                return Like.destroy({
                    where: {
                        [Op.and]: [{
                                "photo_id": data.photo_id
                            },
                            {
                                "user_id": data.user_id
                            }
                        ]
                    }
                })
            })
            .then(result => {
                //redirect ke postingan itu
                res.redirect(`/photos/${data.photo_id}`)
            })
            .catch(err => {
                //redirect ke postingan itu dengan message error
                // res.send('error')
                res.redirect(`/photos/${data.photo_id}`)
            })
    }

    static addComment(req, res) {
        let newData = {
            photo_id: req.params.photo_id,
            message: req.body.message
        }
        User.findOne({
                where: {
                    "username": req.session.user.name
                }
            })
            .then(result => {
                newData.user_id = result.id
                return Comment.create(newData)
            })
            .then(result => {
                //redirect ke postingan itu
                res.redirect(`/photos/${newData.photo_id}`)
            })
            .catch(err => {
                res.send(err)
                //redirect ke postingan itu dengan message error
            })
    }

    static updateForm(req, res) {
        let user_id = req.params.id
        User.findByPk(user_id)
            .then(result => {
                //render update form
            })
            .catch(err => {
                //something went wrong
            })
    }

    static update(req, res) {
        let user_id = req.params.user_id
        let newData = {
            username: req.body.username,
            name: req.body.name,
            gender: req.body.gender,
        }

        User.update(newData, {
                where: {
                    "id": user_id
                },
                individualHooks: true
            })
            .then(result => {
                //redirect ke user page
            })
            .catch(err => {
                //something went wrong
            })
    }

    // static addPhotoForm(req, res) {
    //     res.render('photoForm')
    // }

    static addPhoto(req, res) {
        let newData = {
            link: req.file.path,
            description: req.body.description,
            user_id: req.session.user.id
        }
        console.log(newData)

        Photo.create(newData)
            .then(result => {
                res.redirect('/home')
            })
            .catch(err => {
                //something went wrong
            })
    }

    static deletePhoto(req, res) {
        let photo_id = req.params.photo_id
        Photo.destroy({
                where: {
                    "id": photo_id
                }
            })
            .then(result => {
                //redirect ke user page
            })
            .catch(err => {
                //something went wrong
            })
    }

    static deleteUser(req, res) {
        let user_id = req.params.user_id
        User.destroy(user_id)
            .then(result => {

            })
            .catch(err => {

            })
    }

}

module.exports = UserController
