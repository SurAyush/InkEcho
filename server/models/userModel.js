const {Schema,model} = require('mongoose');

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    avatar: {type: String},
    password: {type: String, required: true},
    postCount: {type: Number, defaultValue:0},
    followerCount: {type: Number, defaultValue:0},
    followingCount:{type: Number, defaultValue:0},
    posts: [{type: Schema.Types.ObjectId, ref:"Post"}],
    following:[{type: Schema.Types.ObjectId, ref: "User"}],
    follower:[{type: Schema.Types.ObjectId, ref: "User"}]
});

const User = new model("User", userSchema);

module.exports = User;