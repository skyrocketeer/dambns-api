'use strict';
module.exports = (sequelize, DataTypes) => {
  const zodiac_animal = sequelize.define('zodiac_animal', {
    year: DataTypes.INTEGER,
    animal: DataTypes.STRING,
    fengshui_element: DataTypes.STRING
  }, {
    indexes: [
      // Create a unique index on email
      {
        unique: true,
        fields: ['year']
      },
    ],
  });
  return zodiac_animal;
};