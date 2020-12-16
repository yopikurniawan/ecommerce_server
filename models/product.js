'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsToMany(models.User, {
        through: models.Cart
      })
      Product.belongsToMany(models.User, {
        through: models.History
      })
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
          msg: "Name cannot be empty"
        },
        notEmpty: {
          args: true,
          msg: "Name cannot be empty"
        },
        isAlphanumeric: {
          args: true,
          msg: 'Only allow alphanumeric characters'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image cannot be empty"
        },
        notEmpty: {
          msg: "Image cannot be empty"
        },
        isUrl: {
          msg: 'Url format required'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Price can't be empty`
        },
        notEmpty: {
          msg: `Price can't be empty`
        },
        isNumeric: {
          msg: 'Price must be a number'
        },
        min: {
          args: 1,
          msg: `Price can't be a minus`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Stock can't be empty`
        },
        notEmpty: {
          msg: `Stock can't be empty`
        },
        isNumeric: {
          msg: 'Stock must be a number'
        },
        min: {
          args: 1,
          msg: `Stock can't be a minus`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};