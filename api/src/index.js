const express = require("express");
const app = express();
const path = require("path");
const { PORT , DB_URL } = require('./config');
const routes = require("./router");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//express configurations
app.use(cors({origin: 'http://localhost:3000', optionsSuccessStatus: 200}));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, './public')));
app.use(cookieParser());
app.use(express.json());

//database connection
async function dbConnect() {
  await mongoose.connect(DB_URL);
}

dbConnect()
.then(()=> console.log('Successfully connected to the DB.'))
.catch(err => console.log('Error while connecting to the DB. Error: ' + err));

//routes
app.use(routes);
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));
