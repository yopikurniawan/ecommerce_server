'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          message: "Name cannot be empty"
        },
        notEmpty: {
          args: true,
          message: "Name cannot be empty"
        },
        isAlphanumeric: {
          args: true,
          message: 'Only allow alphanumeric characters'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: "Image cannot be empty"
        },
        notEmpty: {
          message: "Image cannot be empty"
        },
        isUrl: {
          message: 'Url format required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          message: `Price can't be empty`
        },
        notEmpty: {
          message: `Price can't be empty`
        },
        isNumeric: {
          message: 'Price must be a number'
        },
        min: {
          args: 1,
          message: `Price can't be a minus`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          message: `Stock can't be empty`
        },
        notEmpty: {
          message: `Stock can't be empty`
        },
        isNumeric: {
          message: 'Stock must be a number'
        },
        min: {
          args: 1,
          message: `Stock can't be a minus`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};