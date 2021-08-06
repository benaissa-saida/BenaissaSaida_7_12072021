'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      models.User.hasMany(models.Comment);
 
      models.Post.belongsTo(models.User,{
        onDelete: 'cascade',
        foreignKey :{
          allowNull : false
        }
      })
    }
  };
  Post.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    userName : {
      type: DataTypes.STRING,
      references : {
        model : 'User',
        key : 'username'
      }
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};