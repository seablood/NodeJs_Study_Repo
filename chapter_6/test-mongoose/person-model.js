var mongoose = require("mongoose");
var schema = mongoose.Schema;

const personSchema = new schema({
    name: String, 
    age: Number, 
    email: {type: String, required: true, unique: true}
});

module.exports = mongoose.model('Person', personSchema);