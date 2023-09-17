const { DataTypes } = require("sequelize")
const sequelize = require("../sequelize")

const Group = sequelize.define(
    "Group",
    {
        id: {
            type: DataTypes.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        tableName: "Groups"
    }
);

module.exports=Group;