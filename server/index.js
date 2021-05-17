require('dotenv').config();
const express = require('express'),
userCtrl = require('./controllers/user'),
postCtrl = require('./controllers/posts')

const session = require('express-session')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

const massive = require('massive')
massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    console.log('db is connected')
})

const app = express();
app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60}
}))


//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/logout', userCtrl.logout);
app.get('/api/auth/me', userCtrl.getUser);

//Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)

app.listen(SERVER_PORT, () => console.log(`running on ${SERVER_PORT}`));