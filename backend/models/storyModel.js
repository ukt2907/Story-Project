const mongoose = require('mongoose');

// Slide schema
const slideSchema = new mongoose.Schema({
  imageUrl: String
}, { _id: false });

// Story schema
const storySchema = new mongoose.Schema({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  slides: {
    type: [slideSchema],
    validate: [arrayLimit, 'A story must have between 3 and 6 slides'],
    required: true
  },
  category: {
    type: String,
    enum: ['food', 'health and fitness', 'travel', 'movie', 'education'],
    required: true
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downloads: { type: Number, default: 0 }
}, { timestamps: true });

// Inline validation function
function arrayLimit(val) {
  return val.length >= 3 && val.length <= 6;
}

module.exports = mongoose.model('Story', storySchema);
