const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },

    lastName: { type: String, required: true, trim: true, minlength: 2, maxlength: 50 },

    emailID: { type: String, required: true, unique: true, lowercase: true, trim: true },

    password: { type: String, required: true, minlength: 8 },

    age: { type: Number, min: 12, max: 100 },

    gender: {
        type: String,
        lowercase: true,
        validate(value) {
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("Invalid gender");
            }
        }
    },

    photoUrl: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png"
    },

    about: {
        type: String,
        default: "Hello! I'm new to DevTinder. Looking forward to connecting with fellow developers!",
        maxlength: 500,
        trim: true
    },

    skills: {
        type: [String],
        validate(value) {
            if (value.length > 20) {
                throw new Error("Maximum 20 skills allowed");
            }
        }
    }
}, { timestamps: true });
// const User= mongoose.model("User", userSchema);
// module.exports = User;
module.exports = mongoose.model("User", userSchema);
