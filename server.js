const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const path = require('path')

const port = process.env.REACT_APP_PORT || 8000;

const secret = process.env.REACT_APP_SECRET || "toiny marsupial gargantuan thirst"

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

// mongoose.connect(process.env.REACT_APP_MONGODB_URI, 
//   {   
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false 
//   },
//   () => console.log("Connected to database")
// )

app.use(
  '/auth',
  require('./routes/authRouter.js'),
  expressJwt({
    secret: process.env.REACT_APP_SECRET,
    algorithms: ['HS256']
  })
)
app.use('/api', expressJwt({
  secret: process.env.REACT_APP_SECRET,
  algorithms: ['HS256']
}))

// Routes //
app.use('/api/entries', require('./routes/entryRouter.js'))

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