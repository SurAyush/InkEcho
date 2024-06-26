const {Schema, model} = require('mongoose');

const postSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, enum:["Technology","Health & Wellness","Travel","Lifestyle","Finance","Food & Drink","Education","Entertainment","Science & Nature","DIY & Crafts","Automotive","Parenting","Sports & Fitness","Politics & Society","Hobbies","others"],
        message:"{Category Value is not supported}", required: true
    },
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    thumbnail: {type: String}
},{timestamps: true});

const Post = new model("Post", postSchema);

module.exports = Post;