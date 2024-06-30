const {Schema, model} = require('mongoose');
const valid_categories = require('../helper/categories.js');

const postSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, enum:valid_categories,
        message:"{Category Value is not supported}", required: true
    },
    content: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    thumbnail: {type: String}
},{timestamps: true});

const Post = new model("Post", postSchema);

module.exports = Post;