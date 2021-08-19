const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
      userId: {type: String, required: true},
      bookIds: {type: Array, required: true}
})

module.exports = model('Favorites', schema)