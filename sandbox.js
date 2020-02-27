const bcrypt = require('bcrypt')
const saltRounds = 10;
const password = 's0/\/\P4$$w0rD';

let seedData = [
    {
      username: "agunggst",
      name: "I Gusti Agung",
      password: "password123",
      email: "rqz.agastya@gmail.com",
      gender: "male"
    },
    {
      username: "gustiputra",
      name: "Gusti Putra",
      password: "password123",
      email: "gustiputra@gmail.com",
      gender: "male"
    }
  ]

  for(let i=0; i<seedData.length; i++){
    bcrypt.hash(seedData[i].password, saltRounds)
    .then( result => {
      seedData[i].password = result
      console.log(seedData[i])
    } )
    .catch( err => {
      console.log('error')
    } )
  }