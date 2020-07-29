var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var api = require('./routes/api')
var cors = require('cors')

var app = express()
app.use(cors())
app.use(bodyParser.json())
mongoose.connect("mongodb+srv://bansalkrishna:bansal@cluster0-fukdt.mongodb.net/<dbname>?retryWrites=true&w=majority", err => {
    if (err) {
        console.log("An error occured")
        console.log(err)
    }
    else {
        console.log("Database connected successfully")
    }
})

app.use('/', api)

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
    console.log(`Server running at port ${port}`)
})