const express = require('express');
require("dotenv").config();
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT;
const urlRouter = require('./app/routes/url');


// Connect MongoDB
mongoose.connect(process.env.DB_URL).then(() => {
    console.log('Database connected successfully!')
}).catch((err) => { console.error(err) });


app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use('/', urlRouter);


app.listen(PORT, () => console.log(`Server started at port ${PORT}`));