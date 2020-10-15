const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const cookieParser = require('cookie-parser');


dotenv.config({path: './.env'});

const errRouter = require('./routes/404');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const quizPageRouter = require('./routes/quizPage');
const logoutRouter = require('./routes/logout');
const isAuthenticatedRouter = require('./routes/authenticated');
const top10Router = require('./routes/top10');
const homeUserRouter = require('./routes/homeUser');

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));
app.use(cookieParser());

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

app.use('/', homeRouter);
app.use('/home', homeUserRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/authenticated', isAuthenticatedRouter);
app.use('/quizPage', quizPageRouter);
app.use('/top10', top10Router);
app.use('/user', userRouter);
app.use('/*', errRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});