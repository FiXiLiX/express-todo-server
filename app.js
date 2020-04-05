require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Database'))

const tasks = require('./routes/tasks')
app.use('/tasks', tasks)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.listen(process.env.PORT || 3000, () => console.log('Server started at port: ' + process.env.PORT))