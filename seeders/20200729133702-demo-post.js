'use strict';
const fake = require('faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {

      let users = await queryInterface.sequelize.query(
        `SELECT id from Users;`
      ); 
      let posts = [];      
      for(let i=0; i<=100; i++){
          posts.push({
            post_title:fake.lorem.sentence(),
            post_text:fake.lorem.paragraph(),
            status:fake.random.boolean(),
            userId:fake.random.arrayElement(users[0]).id,
            createdAt: new Date(),
            updatedAt:new Date()
          });
      }
      await queryInterface.bulkInsert('Posts',posts, {});    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
