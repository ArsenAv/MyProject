const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    book_id: {type: String, required: true},
    ratecount: {type: Number, required: true},
    
})

module.exports = model('Rating', schema)