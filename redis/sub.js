var redis = require("redis")
var subscriber = redis.createClient()

subscriber.on("message", (channel, message) => {
  console.log("Message '" + message + "' on channel '" + channel + "' arrived!")
})

subscriber.subscribe("test")
