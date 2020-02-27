'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Photo extends Model {}

  Photo.init({
    link: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {sequelize})

  Photo.associate = function(models) {
    Photo.belongsTo( models.User, {foreignKey: 'user_id'} )
    Photo.hasMany( models.Like, {foreignKey: 'photo_id'} )
    Photo.hasMany( models.Comment, {foreignKey: 'photo_id'} )
  };
  return Photo;
};