// Note Schema Model Definition (Mongoose Style)
// Represents a coordinator note timeline entry.

const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, required: true } // Indian formatted date e.g. "06 Jun 2026"
});

module.exports = NoteSchema;
