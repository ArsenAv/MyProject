const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    autor: {type: String, required: true},
    discription: {type: String, required: true}
})

module.exports = model('Book', schema)