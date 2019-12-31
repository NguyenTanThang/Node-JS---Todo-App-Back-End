const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const schema = new Schema({
    facebook_id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("users", schema);