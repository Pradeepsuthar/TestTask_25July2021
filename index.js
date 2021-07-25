import express from 'express';
import { APP_PORT, DB_URL } from './config';
import errorHandler from './middelwares/errorHandler';
import mongoose from 'mongoose';
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler); // Use global middelware
app.use('/static', express.static(path.join(__dirname, 'media')));

// create application/x-www-form-urlencoded parser
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
    next();
});


// Routes which should handle requests
import routes from './routes';

app.get('/', (req, res) => { res.send('Server connected to the database'); });
app.use('/api', routes);


// Database connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection failed:'));
db.once('open', () => {
    console.log("Database connected...");
})


// Initialize server
app.listen(APP_PORT, () => {
    console.log(`App run on port ${APP_PORT}`)
});