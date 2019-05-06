const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({

    title:{ type: String, required: true, max: [128,'toolong,max is 128 characters']},
    city: {type: String, require: true, lowercase: true},
    street: {type: String, require: true, min:[4,"too short min is 4 characters"]},
    category: {type: String, require: true, lowercase:true},
    image: {type: String, require: true},
    bedrooms: Number,
    shared: Boolean,
    description: {type: String, require: true, lowercase:true},
    dailyrate: Number,
    createdAt: {type: Date ,default: Date.now},
    user: [{type: Schema.Types.ObjectId , ref: 'User'}],

}); 

module.exports = mongoose.model('Rental',rentalSchema)