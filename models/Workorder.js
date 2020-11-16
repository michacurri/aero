const mongoose = require('mongoose');
const { Schema } = mongoose;

// TODO
// workorderSchema
// memberId:    Number
// dateIn:      Number
// dateOut:     Number
// brand:       String
// model:       String
// colour:      String
// service:     []
// status:      []

const workorderSchema = new Schema({
  memberId: {
    type: Number,
    default: true,
  },
  workorderNum: {
    type: Number,
    default: true,
  },
  dateIn: {
    type: Number,
    default: true,
  },
  dateOut: {
    type: Number,
    default: true,
  },
  brand: {
    type: String,
    default: true,
  },
  model: {
    type: String,
    default: true,
  },
  colour: {
    type: String,
    default: true,
  },
  service: {
    type: [],
    default: true,
  },
  status: {
    type: [],
    default: true,
  },
  parts: [],
});

module.exports = mongoose.model('Workorder', workorderSchema);