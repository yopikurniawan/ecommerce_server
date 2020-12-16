'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      History.belongsTo(models.User, {
        foreignKey: 'UserId',
        targetKey: 'id'
      })
      History.belongsTo(models.Product, {
        foreignKey: 'ProductId',
        targetKey: 'id'
      })
    }
  };
  History.init({
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
    modelName: 'History',
  });
  return History;
};