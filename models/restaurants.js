var mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    location: {
        type: {
          type: String,
          default: 'Point'
        },
        coordinates: [{
          type: Number,
          required: 'You must supply coordinates!'
        }],
    }
})


var restaurantModele = mongoose.model('restaurant', restaurantSchema)
module.exports = restaurantModele


