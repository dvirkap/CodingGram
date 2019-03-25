const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const addPostRoute = require('./routes/post.route')
const addUserRoute = require('./routes/user.route')
// const addCommentRoute = require('./routes/comment.route')

const app = express()
app.use(express.static('public'));
app.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:8081'],
    credentials: true // enable set cookie
}));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(session({
    secret: 'none',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

addPostRoute(app)
addUserRoute(app)
// addCommentRoute(app)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`))
