const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/problem'

const app = express()

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const Router = require('./routes/model')
app.use('/',Router)

app.listen(3020, () => {
    console.log('Server started at port 3020')
})