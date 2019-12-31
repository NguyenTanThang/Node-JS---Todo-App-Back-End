const Schema = require("mongoose").Schema;
const mongoose = require("mongoose");

const schema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("todos", schema);