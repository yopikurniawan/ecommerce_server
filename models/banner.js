'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    static associate(models) {
      // define association here
    }
  };
  Banner.init({
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `URL can't be empty`
        },
        notEmpty: {
          args: true,
          msg: `URL can't be empty`
        },
        isUrl: {
          args: 'true',
          msg: 'Must be in url format'
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `status can't be empty`
        },
        notEmpty: {
          args: true,
          msg: `status can't be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};