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
const quizQuestions = require('./routes/quizQuestions');

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
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/quizPage', quizPageRouter);
app.use('/quizQuestions', quizQuestions);
app.use('/user', userRouter);
app.use('/*', errRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});