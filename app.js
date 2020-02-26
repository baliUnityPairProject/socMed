const projectRouter = require('./routers/projectRouter')
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => { res.render('home') })
app.get('/home', (req, res) => { res.render('home') })

app.use('/', projectRouter)


app.listen(port, () => { console.log('app listerning to port', port) })