const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    book_id: {type: String, required: true},
    mail: {type: String, required: true},
    text: {type: String, required: true}
})

module.exports = model('Comment', schema)