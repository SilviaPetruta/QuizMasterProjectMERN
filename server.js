const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//* Database connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log(`MongoDB is connected.`));

app.get('/', (req, res) => {
    res.send('Hello from NodeJS.');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});