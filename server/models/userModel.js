const {Schema,model} = require('mongoose');

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    avatar: {type: String},
    password: {type: String, required: true},
    postCount: {type: Number, defaultValue:0},
});

const User = new model("User", userSchema);

module.exports = User;