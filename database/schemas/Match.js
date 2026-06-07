// Candidate Match Profile Schema Model Definition (Mongoose Style)
// Represents a potential candidate in the matchmaking pool database.

const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  dob: { type: String, required: true },
  age: { type: Number, required: true },
  country: { type: String, default: 'India' },
  city: { type: String, required: true },
  height: { type: Number, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  undergraduateCollege: { type: String },
  degree: { type: String },
  income: { type: Number, required: true },
  currentCompany: { type: String },
  designation: { type: String },
  languagesKnown: { type: String },
  siblings: { type: Number, default: 0 },
  caste: { type: String, default: 'Open/Other' },
  religion: { type: String, required: true },
  maritalStatus: { type: String, enum: ['Single', 'Divorced', 'Widowed'], default: 'Single' },
  wantKids: { type: String, enum: ['Yes', 'No', 'Maybe'], default: 'Maybe' },
  openToRelocate: { type: String, enum: ['Yes', 'No', 'Maybe'], default: 'No' },
  openToPets: { type: String, enum: ['Yes', 'No', 'Maybe'], default: 'No' },
  gotra: { type: String, default: 'N/A' },
  motherTongue: { type: String, required: true },
  dietaryPreference: { type: String, enum: ['veg', 'non-veg', 'jain', 'eggetarian'], required: true },
  manglikStatus: { type: String, enum: ['Yes', 'No', 'Maybe', 'N/A'], default: 'N/A' },
  familyType: { type: String, enum: ['nuclear', 'joint'], default: 'nuclear' },
  familyValues: { type: String, enum: ['traditional', 'moderate', 'liberal'], default: 'moderate' },
  complexion: { type: String, default: 'Wheatish' },
  horoscopeMatchPreference: { type: String, enum: ['Yes', 'No'], default: 'No' }
}, {
  timestamps: true
});

module.exports = mongoose.models.Match || mongoose.model('Match', MatchSchema);
