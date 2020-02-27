const bcrypt = require('bcrypt')
const saltRounds = 10;
// const password = 's0/\/\P4$$w0rD';

// let seedData = [
//     {
//       username: "agunggst",
//       name: "I Gusti Agung",
//       password: "password123",
//       email: "rqz.agastya@gmail.com",
//       gender: "male"
//     },
//     {
//       username: "gustiputra",
//       name: "Gusti Putra",
//       password: "password123",
//       email: "gustiputra@gmail.com",
//       gender: "male"
//     }
//   ]

//   for(let i=0; i<seedData.length; i++){
//     bcrypt.hash(seedData[i].password, saltRounds)
//     .then( result => {
//       seedData[i].password = result
//       console.log(seedData[i])
//     } )
//     .catch( err => {
//       console.log('error')
//     } )
//   }

const { Photo, User, Like, Comment } = require('./models')

// User.findOne({
//   where: {
//     "username": "abcde"
//   }
// })
// .then( result => {
//   console.log(result)
// } )
// .catch( err => {
//   console.log('error')
// } )

let data_login = {
  username: 'agunggst',
  password: 'aaaa'
}
User.findOne({
  where:{
      "username": data_login.username
  }
})
.then( result => {
  if(!result){
      throw `Sorry you have not registered yet!`
  }else{
      return bcrypt.compare(data_login.password, result.password)
  }
} )
.then( result => {
  if(result){
      let user = {
          name: data_login.username
      }
      console.log(user)
      //redirect ke home
  }else{
      throw 'Wrong Password'
  }
} )
.catch( err => {
  //send error ke login form
  console.log('error')
  // res.send(err)
} )