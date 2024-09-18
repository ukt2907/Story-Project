const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    bookmarks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'
    }],
    likedStories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'
    }],
    createdStories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Story'
    }],

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
