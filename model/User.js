const mongoose = require("mongoose")
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);

const todoSchema = Schema({
    title:{
        type: String
    },
    description:{
        type: String
    },
    date:{
        type: Date
    }
})
const User = new Schema({
first_name:{
    type: String,
    required: true
},
last_name:{
    type: String,
    required: true
},
email:{
    type: String,
    required: true
},
password:{
    type: String,
    required: true
},
todos:[todoSchema]
})
module.exports = mongoose.model('users', User);