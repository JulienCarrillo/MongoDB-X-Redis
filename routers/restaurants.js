var express = require('express')
var redis = require("redis")
var Restaurant = require('../models/restaurants')

///////////// Config redis
const config = {
    host: 'localhost',
    port: 6379
}
var publisher  = redis.createClient(config)
var subscriber = redis.createClient()
subscriber.on("message", (channel, message) => {
  console.log("Message '" + message + "' on channel '" + channel + "' arrived!")
})
//////////// fin config redis ///////////////

var router = express.Router()

router.get('/', async (req, res) => {
    // On sub en debut de requete 
    subscriber.subscribe("GET")
    let Restaurants = await Restaurant.find({}) 
    console.log("/",req.params.id)
    //On publish en fin de requete
    publisher.publish("GET", "OK")
    res.json(Restaurants)
})
router.get('/:id', async (req, res) => {
     // On sub en debut de requete 
    subscriber.subscribe("POST")
    let restaurant = await Restaurant.findOne({_id: req.params.id})
    console.log(req.params.id)
    //On publish en fin de requete
    publisher.publish("POST", "OK")
    res.json(restaurant)
})

router.post('/',  async (req, res) => {
    // On sub en debut de requete 
    subscriber.subscribe("POST")
    let restaurant = new Restaurant({
        name: req.body.name,
        location: {
            type : "Point",
            coordinates : 
            [ 
                req.body.x, 
                req.body.y
            ],
        }
    });
    //On publish en fin de requete
    publisher.publish("POST", "OK")
    res.send(restaurant) 
    restaurant.save()
})

router.put('/:id',async(req, res) => {
    // On sub en debut de requete 
    subscriber.subscribe("UPDATE")
    let restaurant = await Restaurant.findOneAndUpdate({_id: req.params.id}, {$set:{name:req.body.name, location: {type : "Point",coordinates : [ req.body.x, req.body.y],}}},{new: true, useFindAndModify: false})
    //On publish en fin de requete
    publisher.publish("UPDATE", "OK")
    restaurant.save()
    res.json(restaurant)
})


router.delete('/:id', async (req, res) => {
    // On sub en debut de requete 
    subscriber.subscribe("DELETE")
    let restaurant = await Restaurant.findOneAndDelete({_id: req.params.id})
    console.log("test")
    //On publish en fin de requete
    publisher.publish("DELETE", "OK")
    res.json(restaurant)
})

module.exports = router