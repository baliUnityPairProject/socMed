const bcrypt = require('bcrypt')

const saltRounds = 10;
const password = 's0/\/\P4$$w0rD';

bcrypt.hash(password, saltRounds)
.then( result => {
    console.log(result)
} )
.catch( err => {
    console.log('error')
} )