var redis = require("redis")
const config = {
    host: 'localhost',
    port: 6379
}
var publisher  = redis.createClient(config)

publisher.publish("test", "wesh")