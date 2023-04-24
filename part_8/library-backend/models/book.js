const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5
  },
  published: {
    required: true,
    type: Number
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  },
  genres: [
    {
      type: String,
      required: true
    }
  ]
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Book', schema)
