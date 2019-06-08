var mongoose = require("mongoose");

var callSchema = new mongoose.Schema({
    name: String,
    time: String,
    school: String,
    age: String,
    image: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});



module.exports = mongoose.model("possibleCall", callSchema);