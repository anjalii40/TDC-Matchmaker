// Matchmaker Coordinator User Schema Model Definition (Mongoose Style)
// Represents a login user for the CRM dashboard.

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['matchmaker', 'admin'], default: 'matchmaker' },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
