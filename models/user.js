'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {}

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate: (instance, option) => {
        bcrypt.hash(instance.password, saltRounds)
        .then( result => {
          console.log('hashing success')
          instance.password = result
        } )
        .catch( err => {
            console.log('error hashing password')
        } )
      }
    },
    sequelize
  })

  User.associate = function(models) {
    User.hasMany( models.Photo, {foreignKey: 'user_id'} )
    User.hasMany( models.Like, {foreignKey: 'user_id'} )
    User.hasMany( models.Comment, {foreignKey: 'user_id'} )
  };
  return User;
};