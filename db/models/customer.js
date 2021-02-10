'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer',{
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    dob: DataTypes.STRING
  },{
    indexes: [
      // Create a unique index
      {
        unique: true,
        fields: ['name_idx', 'phone_idx']
      },
    ],
  })
  
  return customer
};