const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config()


const port = process.env.PORT || 3001;

const app = express();

//Import Routes
const GovRoutes = require('./routes/GovRoutes');

//Import Controller 
const GovController = require('./controllers/GovController');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

//session
app.use(
    session({
        name: 'session',
        secret: process.env.SECRET,
        resave: 'false', 
        saveUninitialized: 'false',
        store: new FileStore({
            logFn: function(){},
            path: require('path').join(require('os').tmpdir(),'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true,
        }
    }),
);

//receber resposta do body
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

//public path
app.use(express.static('public'));

//flash message
app.use(flash());


//Routes
app.use('/', GovRoutes);
app.get('/', (req, res) => {res.render('gov/home');});

app.listen(port);
