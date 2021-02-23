const express = require('express');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const users = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(session({
    secret: "soaps", 
    saveUninitialized: true, 
    resave: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use('/users', users);

app.get('/api', (req, res) => {
    res.json({ message: "Hello from server!" });
});


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    //res.sendFile('client/public/index.html');
});

app.listen(PORT, ()=> console.log(`Sever listening on port ${PORT}`) );