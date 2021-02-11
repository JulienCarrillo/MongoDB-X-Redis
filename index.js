var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var routerRestaurants = require('./routers/restaurants')


mongoose.Promise = Promise
// mongoose.connect('mongodb+srv://root:proot@freecluster.vko1w.mongodb.net/sitemanger?retryWrites=true&w=majority', {useNewUrlParser : true, useUnifiedTopology: true})
mongoose.connect('mongodb://root:root@localhost:27017/rpi?authSource=admin&readPreference=primary', {useNewUrlParser : true, useUnifiedTopology: true})
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', () => {
    console.log('db connected')
})
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-width, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next()
})

app.get("/", (req, res) => {
    res.json({status : "ok"})
})


app.use('/restaurants', routerRestaurants)
app.listen(3001);