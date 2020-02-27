const express = require('express');
const app = express();
const session = require('express-session')

const port = 3000;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use('/', require('./routers'))

app.get('*', (req, res) => {
    res.send('404')
})

app.listen(port, () => { 
    console.log('app listerning to port', port) 
})