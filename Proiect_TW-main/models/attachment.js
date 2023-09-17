const { DataTypes } = require("sequelize")
const sequelize = require("../sequelize")

const ATTACHMENT_TYPE = Object.freeze({
    IMAGE: "Image",
    DOCUMENT: "Document"
})

const Attachment = sequelize.define(
    "Attachment",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.BLOB
        },
    },
    {
        tableName: "Attachments"
    }
);

module.exports=Attachment;