// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");
// Initialize ProductTag model (table) by extending off Sequelize's Model class
class ProductTag extends Model {}
// set up fields and rules for ProductTag model
ProductTag.init(
  {
    //id column is integer, doesn't allow null, auto increments, and is primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    //product id column is integer and value is from the id column in product table
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "product", 
        key: "id",
      },
    },
    //tag id column is integer and value is from id column in tag table
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
