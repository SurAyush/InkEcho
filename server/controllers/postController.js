const Post = require("../models/postModel.js");
const User = require("../models/userModel.js");
const HttpError = require("../models/errorModel.js");
const fs = require("fs");
const path = require("path");
const {v4: uuid} = require('uuid');
const valid_categories = require("../helper/categories.js");


//To get a post
// GET: api/posts/:id
// UNPROTECTED
const getPost = async(req,res,next) =>{
    try{
        const postId = req.params.id;

        if(postId.length != 24){
            return next(new HttpError("Invalid post id",400));
        }
        const post = await Post.findById(postId);
        if(!post){
            return next(new HttpError("Post not found",404));
        }
        res.json(post);
    }
    catch(err){
        return next(new HttpError(err));
    }
}

//To get all posts
// GET: api/posts/
// UNPROTECTED
const getAllPost = async(req,res,next) =>{
    try{
        const posts = await Post.find({}).select('-content').sort({updatedAt:-1});         //sort by updatedAt (-1 means descending order)
        if(!posts){
            return next(new HttpError("No posts found",404));
        }
        res.json(posts);
    }
    catch(err){
        return next(new HttpError(err));
    }
}

//To get all posts of a category
// GET: api/posts/category/:category
// UNPROTECTED
const getCategoryPost = async(req,res,next) =>{
    try{
        const {category} = req.params;
        const catPosts = await Post.find({category:category}).select('-content').sort({updatedAt:-1});
        if(!catPosts || catPosts.length==0){
            res.json("No posts found in this category");        //shouldn't be an error
        }
        res.json(catPosts);
    }
    catch(err){
        return next(new HttpError(err));
    }
}

//To get all posts of an author
// GET: api/posts/user/:id
// UNPROTECTED
const getAuthorPost = async(req,res,next) =>{
    try{
        const authorId = req.params.id;
        if(authorId.length!=24){
            return next(new HttpError("Invalid author id",400));
        }
        const authorPosts = await Post.find({author:authorId}).select('-content').sort({updatedAt:-1});
        if(!authorPosts || authorPosts.length==0){
            res.json("No posts found by this author");        //shouldn't be an error
        }
        res.json(authorPosts);
    }
    catch(err){
        return next(new HttpError(err));
    }
}

//To create a new post
// POST: api/posts/create
// PROTECTED
const createNewPost = async(req,res,next) =>{
    try{
        const {title,description,category,content} = req.body;
        const thumbnail = req.files.thumbnail;
        if(!title || !description || !category || !content || !thumbnail){
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
            content:content,
            author:user._id
        });

        const result = await post.save();

        if(!result){
            return next(new HttpError("Post creation failed",422));
        }

        user.postCount = (user?.postCount || 0) + 1;
        user.posts.push(result._id);
        const updatedUser = await user.save();
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
    try{
        const postId = req.params.id;
        const {title,category,description, content} = req.body;
        const thumbnail = req.files?.thumbnail || "";
        if(!title ||!description ||!category || !content){
            return next(new HttpError("Please provide all the fields",422));
        }
        const currUserId = req.user.userId;
        const post = await Post.findById(postId);
        if(!post){
            return next(new HttpError("Post not found",404));
        }
        //Authorization
        if(currUserId != post.author){
            return next(new HttpError("You are not authorized to edit this post",403));
        }

        //Category validation
        if(!valid_categories.includes(category)){
            return next(new HttpError("Invalid category",400));
        }
        let new_thumbnail = post.thumbnail;
        if(thumbnail){
            
            //checking size of thumbnail
            if(thumbnail.size>2000000)  //>2MB
            {
                return next(new HttpError("File size too large",422));
            }
            //remove previous thumbnail
            if(post.thumbnail){
                fs.unlink(path.join(__dirname,'..','uploads',post.thumbnail),(err)=>{
                    if(err){
                        return next(new HttpError(err));
                    }
                });
            }

            //save new thumbnail
            // setup upload file here
            const filename = thumbnail.name;
            const splittedfilename = filename.split('.');
            const uniquefilename = splittedfilename[0]+"-"+uuid() + "." + splittedfilename[splittedfilename.length - 1];
            thumbnail.mv(path.join(__dirname,"/../uploads",uniquefilename),async (err)=>{
                if(err){
                    return next(new HttpError(err));
                }
            });
            new_thumbnail = uniquefilename;
        }
        
        //updating post
        const result  = await Post.findByIdAndUpdate(postId,{title:title,category:category,thumbnail:new_thumbnail,description:description, content: content},{new:true});
        //new:true helps to return the result as the updated document...otherwise it just returns the document before updates
        
        if(!result){
            return next(new HttpError("Failed to update this post",422));
        }

        res.json(result);
        
    }
    catch(err){
        return next(new HttpError(err));
    }
}

//To delete an existing post
// DELETE: api/posts/:id
// PROTECTED
const deletePost = async(req,res,next) =>{
    try{
        const postId = req.params.id;
        
        if(postId.length != 24){
            return next(new HttpError("Invalid post id",400));
        }

        const post = await Post.findById(postId);

        if(!post){
            return next(new HttpError("Post not found",404));
        }

        const postOwner = post.author;
        const currUser = req.user.userId;
    
        //Authorization
        if(postOwner != currUser){
            return next(new HttpError("You are not authorized to delete this post",403));
        }

        const result = await Post.findByIdAndDelete(postId);
        if(!result){
            return next (new HttpError("Failed to Delete this post",422));
        }

        //decrement the user post-count
        const user = await User.findById(postOwner);
        user.postCount = user.postCount - 1;
        user.posts = user.posts.filter(el => el.toString() != postId);
        
        const updated = await user.save();

        //delete the thumbnail
        const thumbnail = result.thumbnail;
        if(thumbnail){
            fs.unlink(path.join(__dirname,'..','uploads',thumbnail),(err)=>{
                if(err){
                    return next(new HttpError(err));
                }
            })
        }
        
        res.json(`Post with id ${result._id} deleted successfully`);
    }
    catch(err){
        return next(new HttpError(err));
    }
}

//To get all posts of a user following
//Protected
//GET: api/posts/following-posts
const getFollowingPosts = async (req, res,next) =>{
    try{
        const userId = req.user.userId;
        const user = await User.findById(userId);
        const followedUserIds = user.following;
        const posts = await Post.find({author:{$in:followedUserIds}}).select('-content');
        if(posts){
            res.json(posts);
        }
        else{
            res.json("No posts found");
        }
    }
    catch(err){
        return next(new HttpError(err));
    }

}


module.exports = {getPost, getAllPost, getCategoryPost, getAuthorPost, createNewPost, editPost, deletePost, getFollowingPosts};