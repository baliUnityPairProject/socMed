'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  
  class Like extends Model {}

  Like.init({
    user_id: DataTypes.INTEGER,
    photo_id: DataTypes.INTEGER
  }, {sequelize})

  Like.associate = function(models) {
    Like.belongsTo( models.User, {foreignKey: 'user_id'} )
    Like.belongsTo( models.Photo, {foreignKey: 'photo_id'} )
  };
  return Like;
};