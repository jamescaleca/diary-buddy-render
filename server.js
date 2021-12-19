const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

// Middleware //
app.use(express.json())
app.use(morgan('dev'))

// Connect to DB //

mongoose.connect('mongodb://localhost:27017/diary-db',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log('Connected to the DB')
)

// Routes //
app.use('/entries', require('./routes/entryRouter.js'))

// Error handler //
app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// Server listen //
app.listen(5000, () => {
    console.log('The server is running on port 5000')
})