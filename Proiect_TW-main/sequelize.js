const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sqlite/NotesApp.db'
});

sequelize.sync().then(() => {
    console.log("All models were synced");
})

module.exports = sequelize;