const mongoose = require('mongoose')

const Schema = mongoose.Schema

const vendorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  info: {
    type: String,
  },
  charge: {
    type: String,
  },
  document: {
    type: String,
  },
  confirmation: {
    type: String,
  }
}, { timestamps: true })

module.exports = mongoose.model('Vendor', vendorSchema)