const mongoose = require('mongoose');
const validator = require("validator");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },

    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },

    emailID: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Address");
            }
        }
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error(
                    "Password must contain uppercase, lowercase, number and special character"
                );
            }
        }
    },

    age: {
        type: Number,
        min: 12,
        max: 100
    },

    gender: {
        type: String,
        lowercase: true,
        enum: ["male", "female", "other"]
    },

    photoUrl: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid Photo URL");
            }
        }
    },

    about: {
        type: String,
        trim: true,
        maxlength: 500,
        default: "Hello! I'm new to DevTinder."
    },

    skills: {
        type: [String],
        validate(value) {
            if (value.length > 20) {
                throw new Error("Maximum 20 skills allowed");
            }
        }
    }
}, {
    timestamps: true
});
userSchema.index({ firstName: 1, lastName: 1 });
userSchema.methods.getJWT = async function () {

    const user = this;

    const token = await jwt.sign(
        { _id: user._id },
        "DEV@tinder$790",
        {
            expiresIn: "7d",
        }
    );

    return token;
};
// const User= mongoose.model("User", userSchema);
// module.exports = User;
module.exports = mongoose.model("User", userSchema);
