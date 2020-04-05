require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// const expressSwagger = require('express-swagger-generator')(app)
// const options = require('./swagger.js')

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Database'))

const tasks = require('./routes/tasks')
app.use('/tasks', tasks)

// expressSwagger(options)
app.listen(process.env.PORT, () => console.log('Server started at port: ' + process.env.PORT))