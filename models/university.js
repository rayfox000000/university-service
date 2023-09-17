const { DataTypes } = require('sequelize');
const sequelize = require('../models/database');

const University = sequelize.define('University', {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Webpages: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  IsBookmark: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  IsActive:{
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  DeletedAt:{
    type: DataTypes.DATE,
    allowNull: true
  }
  //TODO: Add createdBy and UpdatedBy
  // CreatedBy:{
  //   type: DataTypes.STRING,
  //   allowNull: false
  // },
  // UpdatedBy:{
  //   type: DataTypes.STRING,
  //   allowNull: false
  // }

},{
  updatedAt: 'LastModified', // Change default updatedAt column name to LastModified
  createdAt: 'Created'//Change default createdAt column name to Created
});

module.exports = University;