const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const roomsRouter = require('./routes/rooms');
const authRouter = require('./routes/auth');
const adminsRouter = require('./routes/admins');
const playersRouter = require('./routes/players');
const spectatorsRouter = require('./routes/spectators');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
let cors = require("cors");
app.use((req,res,next)=>{
    res.setHeader('Acces-Control-Allow-Origin','*');
    res.setHeader('Acces-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Acces-Contorl-Allow-Methods','Content-Type','Authorization');
    next();
})
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

/* Open connection to Mongo Atlas */
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then(() => console.log('MongoDB database connection established successfully!'))
    .catch(err => console.log(err));

app.use('/api/rooms', roomsRouter);
app.use('/api/auth', authRouter);
app.use('/api/admins', adminsRouter);
app.use('/api/players', playersRouter);
app.use('/api/spectators', spectatorsRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));