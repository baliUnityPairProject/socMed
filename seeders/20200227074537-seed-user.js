'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 10;

module.exports = {
  up: (queryInterface, Sequelize) => {
    let seedData = [
      {
        username: "agunggst",
        name: "I Gusti Agung",
        password: "$2b$10$bEoWwJawt2.dpQyrA53cYeQszEzAqg9T6lXx/QRApxTJpq8Nzlx2i",
        email: "rqz.agastya@gmail.com",
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: "gustiputra",
        name: "Gusti Putra",
        password: "$2b$10$cEeABlfOZ/SNSoBNmaBWcuzkHNbgjJIxtv5B9Rds5wbAs0U095xA2",
        email: "gustiputra@gmail.com",
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]

    return queryInterface.bulkInsert('Users', seedData)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
