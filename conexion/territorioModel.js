const mongoose = require('mongoose');

const TerritorioSchema = new mongoose.Schema({
  region: { type: String, required: true },
  provincia: { type: String, required: true },
  comuna: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Territorio', TerritorioSchema);