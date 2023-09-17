let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
const routerNote = require('./routes/notes');
const routerStudent = require('./routes/students');
const routerAttachment = require('./routes/attachments');
const routerGroup = require('./routes/groups');

require("dotenv").config();

const sequelize = require("./sequelize");
require("./models/note");
require("./models/student");
require("./models/attachment");
require("./models/group");

let app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routerNote);
app.use('/api', routerStudent);
app.use('/api', routerAttachment);
app.use('/api', routerGroup);

app.use((err, req, res, next) => {
    res.status(500).json({"ERROR":"General error"})
})

app.set("port", process.env.PORT || 8080) 

app.listen(app.get("port"), async () => {
    console.log(`Server is running on http://localhost:${app.get("port")}`);
    try{
        await sequelize.authenticate();
        console.log("Connected");
    }
    catch (error){
        console.log("Unable to connect to the database: ", error);
    }
});