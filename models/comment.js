'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Comment extends Model {}

  Comment.init({
    user_id: DataTypes.INTEGER,
    photo_id: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {sequelize})

  Comment.associate = function(models) {
    Comment.belongsTo( models.User, {foreignKey: 'user_id'} )
    Comment.belongsTo( models.Photo, {foreignKey: 'photo_id'} )
  };
  return Comment;
};