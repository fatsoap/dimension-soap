const express = require('express');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
require('dotenv').config()

const users = require('./routes/users');
const index = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(session({
    secret: "soaps",  // secret: 必要欄位，用來註冊 session ID cookie 的字串。如此將增加安全性，避免他人在瀏覽器中偽造 cookie。
    saveUninitialized: true, // saveUninitialized: 將 uninitialized session（新的、未被變更過的） 儲存在 session store 中。
    resave: true // resave: 不論是否 request 的過程中有無變更都重新將 session 儲存在 session store。
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.use('/', index);
app.use('/users', users);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, ()=> console.log(`Sever listening on port ${PORT}`) );