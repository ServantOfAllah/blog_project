var mongoose = require("mongoose");

//creating a schema for the db
var blogSchema = new mongoose.Schema({
    name: String,
    title: String,
    article: String,
    created: {type: Date, default: Date.now}
});

//creating a medel
module.exports = mongoose.model("Post", blogSchema);