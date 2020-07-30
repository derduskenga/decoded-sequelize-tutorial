'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PostTag.init({
    post_id: {
      type:DataTypes.INTEGER,
      references: {
        model: 'Post',
        key:'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references:{
        model:'Tag',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'PostTag',
  });
  return PostTag;
};