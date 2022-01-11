const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const path = require('path')

const port = process.env.PORT || 8000;

const secret = process.env.SECRET || "toiny marsupial gargantuan thirst"

console.log(process.env)

// Middleware //
app.use(express.json())
app.use(morgan('dev'))

// Connect to DB //

mongoose.connect(
    'mongodb://localhost:27017/diary-db',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log('Connected to the DB')
)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, 
    console.log('Connected to the DB'))

app.use(
    '/auth',
    require('./routes/authRouter.js'),
    expressJwt({
        secret: secret,
        algorithms: ['HS256']
    })
)
app.use('/api', expressJwt({
    secret: secret,
    algorithms: ['HS256']
}))

// Routes //
app.use('/entries', require('./routes/entryRouter.js'))

app.use(express.static(path.join(__dirname, 'client', 'build')))

// Error handler //
app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === 'UnauthorizedError'){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

// Server listen //
app.listen(port, () => {
    console.log('Listening on ' + port)
})