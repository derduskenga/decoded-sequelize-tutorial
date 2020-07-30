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
      // define association here
      Post.belongsTo(models.User, { foreignKey: 'userId' });

      //post many to many association with Tag
      Post.belongsToMany(models.Tag,{
        through: 'PostTag',
        as:'tags',
        foreignKey:'post_id'
      });
    }
  };
  Post.init({
    post_title: DataTypes.STRING,
    post_text: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    userId: {
      type: DataTypes.INTEGER,
      references:{
        model:'User',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};