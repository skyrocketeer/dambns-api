'use strict';
module.exports = (sequelize, DataTypes) => {
  const horoscope = sequelize.define('horoscope', {
    zodiac_sign: DataTypes.STRING,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    horo_element: DataTypes.STRING
  }, {});
  
  return horoscope;
};