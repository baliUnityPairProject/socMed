const generalRouter = require('./router/generalRouter')
const express = require('express');
const app = express();
const session = require('express-session')
const port = 3000;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use('/', generalRouter)

app.listen(port, () => { console.log('app listerning to port', port) })