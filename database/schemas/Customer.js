// Customer Schema Model Definition (Mongoose Style)
// Represents a premium client record in the Matchmaker CRM.

const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  dob: { type: String, required: true },
  age: { type: Number, required: true },
  country: { type: String, default: 'India' },
  city: { type: String, required: true },
  height: { type: Number, required: true }, // in cm
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  undergraduateCollege: { type: String },
  degree: { type: String },
  income: { type: Number, required: true }, // Annual income in INR
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
  horoscopeMatchPreference: { type: String, enum: ['Yes', 'No'], default: 'No' },
  
  // Scored metadata configurations
  agePreferenceMin: { type: Number },
  agePreferenceMax: { type: Number },
  preferredIncomeRange: {
    min: { type: Number },
    max: { type: Number }
  },

  // Read-only Priorities config
  partnerPriorities: {
    ranked: [
      {
        key: { type: String },
        label: { type: String },
        weight: { type: Number }
      }
    ],
    notes: { type: String }
  },

  // CRM dynamic tracking states
  matchesGenerated: { type: Boolean, default: false },
  searchPaused: { type: Boolean, default: false },
  accountClosed: { type: Boolean, default: false },
  
  // Proposals & Notes histories
  sentMatches: [
    {
      profileId: { type: String, required: true },
      firstName: { type: String },
      lastName: { type: String },
      designation: { type: String },
      city: { type: String },
      score: { type: Number },
      intro: { type: String },
      status: { type: String, enum: ['Proposed', 'Accepted', 'Rejected'], default: 'Proposed' },
      sentAt: { type: Date, default: Date.now }
    }
  ],
  notes: [
    {
      id: { type: String, required: true },
      text: { type: String, required: true },
      date: { type: String, required: true }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
