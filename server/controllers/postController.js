const Post = require("../models/postModel.js");
const User = require("../models/userModel.js");
const HttpError = require("../models/errorModel.js");
const fs = require("fs");
const path = require("path");
const {v4: uuid} = require('uuid');


//To get a post
// GET: api/posts/:id
// UNPROTECTED
const getPost = async(req,res,next) =>{
    res.json("Get a post");
}

//To get all posts
// GET: api/posts/
// UNPROTECTED
const getAllPost = async(req,res,next) =>{
    res.json("Get all posts");
}

//To get all posts of a category
// GET: api/posts/category/:category
// UNPROTECTED
const getCategoryPost = async(req,res,next) =>{
    res.json("Getting category wise posts");
}

//To get all posts of an author
// GET: api/posts/user/:id
// UNPROTECTED
const getAuthorPost = async(req,res,next) =>{
    res.json("Getting author wise posts");
}

//To create a new post
// POST: api/posts/create
// PROTECTED
const createNewPost = async(req,res,next) =>{
    try{
        const {title,description,category} = req.body;
        const thumbnail = req.files.thumbnail;
        if(!title || !description || !category){
            return next(new HttpError("Please provide all the fields",422));
        }
        const userId = req.user.userId;
        const user = await User.findById(userId);
        
        if(!user){
            return next(new HttpError("Post author not found",404));
        }

        let uniquefilename="";
        if(thumbnail){
            if(thumbnail.size>2000000)  //>2MB
            {
                return next(new HttpError("File size too large",422));
            }
            const filename = thumbnail.name;
            const splittedfilename = filename.split('.');
            uniquefilename = splittedfilename[0]+"-"+uuid() + "." + splittedfilename[splittedfilename.length - 1];
            thumbnail.mv(path.join(__dirname,"/../uploads",uniquefilename),async (err)=>{
                if(err){
                    return next(new HttpError(err));
                }
            });
        }

        const post = new Post({title:title,
            category:category,
            thumbnail:uniquefilename,
            description:description,
            author:user._id
        });

        const result = await post.save();

        if(!result){
            return next(new HttpError("Post creation failed",422));
        }

        let updatedUser;
        if(user.postCount){
            updatedUser = await User.findByIdAndUpdate(user._id,{postCount:user.postCount+1});
        }
        else{
            updatedUser = await User.findByIdAndUpdate(user._id,{postCount:1});
        }

        if(!updatedUser){
            return next(new HttpError("Post author updation failed",422));
        }

        res.json(result);

    }
    catch(err){
        return next(new HttpError(err));
    }
}

//To edit an existing post
// PATCH: api/posts/:id
// PROTECTED
const editPost = async(req,res,next) =>{
    res.json("Editing post");
}

//To delete an existing post
// DELETE: api/posts/:id
// PROTECTED
const deletePost = async(req,res,next) =>{
    res.json("Deleting post");
}

module.exports = {getPost, getAllPost, getCategoryPost, getAuthorPost, createNewPost, editPost, deletePost};