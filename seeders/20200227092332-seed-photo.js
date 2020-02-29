'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let seedData =[
      {
        link: 'https://i.imgur.com/bTjNJBP.jpg',
        description: 'Waktunya hacktiv8 dulu gengs',
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        link: 'https://i.imgur.com/dbyo2bB.jpg',
        description: 'Photo keren lagi di Paris',
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    return queryInterface.bulkInsert('Photos', seedData)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Photos', null, {});
  }
};
