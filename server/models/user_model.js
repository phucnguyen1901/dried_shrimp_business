
const mongoose = require("mongoose");
 const { Schema } = mongoose;

const User = new Schema({
    fullname: {
        type: String,
        maxlength: 50,
        required: true,

    },
    username: {
        type: String,
        maxlength: 16,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
)

module.exports = mongoose.model("User", User)






