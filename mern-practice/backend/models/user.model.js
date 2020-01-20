// Imports for schema creation
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
})

// exporting schema
const User = mongoose.model('User', userSchema);
module.exports = User;