'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'UserId',
        targetKey: 'id'
      })
      Cart.belongsTo(models.Product, {
        foreignKey: 'ProductId',
        targetKey: 'id'
      })
    }
  };
  Cart.init({
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'ProductId cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'ProductId cannot be empty'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'UserId cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'UserId cannot be empty'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Quantity cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'Quantity cannot be empty'
        },
        min: {
          args: 1,
          msg: 'Minimal of 1 product'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};