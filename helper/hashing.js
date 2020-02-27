const bcrypt = require('bcrypt')
const saltRounds = 10

const hashing = (password) => {
    bcrypt.hash(password, saltRounds)
    .then( result => {
        instance.password = result
    } )
    .catch( err => {
        console.log('error hashing password')
    } )
}

module.exports = hashing