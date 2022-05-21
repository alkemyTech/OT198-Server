const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('new', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, {timestamps: true, paranoid: true});
};