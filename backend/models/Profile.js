const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let profileSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  position: {
    type: String
  },
  office: {
    type: String
  },
  age: {
    type: Number
  },
  startDate: {
    type: String
  },
  salary: {
    type: Number
  },
}, {
  collection: 'profiles'
})

profileSchema.index({'$**': 'text'});
module.exports = mongoose.model('Profile', profileSchema)