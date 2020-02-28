'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 10
// const hashing = require('../helper/hashing')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {
    getCommentName(){
      return `${this.name} as ${this.username} says:`
    }
  }

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
        return bcrypt.hash(instance.password, saltRounds)
                .then( result => {
                    instance.password = result
                } )
                .catch( err => {
                    throw err
                } )
      }
    },
    sequelize
  })

  User.associate = function(models) {
    User.hasMany( models.Photo, {foreignKey: 'user_id', onDelete: 'cascade'} )
    User.hasMany( models.Like, {foreignKey: 'user_id', onDelete: 'cascade'} )
    User.hasMany( models.Comment, {foreignKey: 'user_id', onDelete: 'cascade'} )
  };
  return User;
};