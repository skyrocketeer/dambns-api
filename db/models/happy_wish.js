'use strict';
module.exports = (sequelize, DataTypes) => {
  const happy_wish = sequelize.define('happy_wish', {
    statement: DataTypes.TEXT,
    age_group: DataTypes.STRING
  }, {
    freezeTableName: true,
    indexes: [
      // Create a unique index
      {
        unique: true,
        fields: ['age_group_idx']
      },
    ],
  });
  return happy_wish;
};