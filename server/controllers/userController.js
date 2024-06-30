const User = require('../models/userModel.js');
const Post = require('../models/postModel.js');
const HttpError = require('../models/errorModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');

//Register a new user
//Unprotected
// POST: /api/users/register
const registerUser = async (req,res,next)=>{
    try{
        const {username,email,password,confirmPassword} = req.body;
        if(!username||!email||!password){
            return next (new HttpError("Please provide all required fields",422));
        }
        //converting email to lowercase
        const encodedemail = email.toLowerCase();
        const doesUsernameExist = await User.findOne({username: username});
        const doesEmailExist = await User.findOne({email: encodedemail});
        if(doesEmailExist){
            return next(new HttpError("Email already exists",422));
        }
        if(doesUsernameExist){
            return next(new HttpError("Username already exists",422));
        }
        if(password.trim().length<8){
            return next(new HttpError("Password must be at least 8 characters long",422));
        }
        if(password!==confirmPassword){
            return next(new HttpError("Passwords do not match",422));
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newUser = new User({
            username: username,
            email: encodedemail,
            password:  hashedPassword,
        });
        const result = await newUser.save();
        res.status(201).json(`New user registered: ${newUser.username}`);
    }
    catch(err)
    {
        return next(new HttpError(err));
    }
    
};

//Login a registeretd user
//Unprotected
// POST: /api/users/login
const loginUser = async (req,res,next)=>{
        try{
            const {username,email,password} = req.body;
        if(!password || (!username && !email)){
            return next (new HttpError("Please provide all required fields",422));
        }
        let user;
        if(username){
            user = await User.findOne({username: username});
        }
        else{
            user = await User.findOne({email: email});
        }

        if(!user){
            return next(new HttpError("Invalid credentials",401));
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return next(new HttpError("Invalid credentials",401));
        }

        const token = jwt.sign({userId: user._id,username: user.username},process.env.JWT_SECRET,{expiresIn: "1d"});

        res.status(200).json({token: token,userId: user._id, username: user.username});
    }
    catch(err){
        return next(new HttpError(err));
    }
};

//Get all users
//Unprotected
// GET: /api/users/
const getAllUsers = async (req,res,next)=>{
    try{
        const users = await User.find({}).select('username');  
        if (!users){
            return next(new HttpError("No users found",404));
        }
        res.json(users);
    }
    catch(err){
        return next(new HttpError(err));
    }
};

//Get all users that have posted
//Unprotected
// GET: /api/users/authors
const getAllAuthors = async (req,res,next)=>{
    try{
        const users = await User.find({ postCount: { $gt: 0 } },'username avatar postCount followerCount').sort({postCount:-1});
        if (!users){
            return next(new HttpError("No users found",404));
        }
        res.json(users);
    }
    catch(err){
        return next(new HttpError(err));
    }
};


//Get user
//Protected
// GET: api/users/myprofile
const getUser = async (req,res,next)=>{
    try{
        const _id = req.user.userId;
        const user = await User.findById(_id).select('-password');  //ensures we are not extracting password from user info
        if(!user){
            return next(new HttpError("User not found",404));
        }
        res.json(user);
    }
    catch(err){
        console.log(err);
        return next(new HttpError(err));
    }
};

//Get user (just another version of getUser, but you can get any user basic details by ID)
//UnProtected
// GET: api/users/:id
const getUserbyId = async (req,res,next)=>{
    try{
        const _id = req.params.id;
        const user = await User.findById(_id).select('-password');  //ensures we are not extracting password from user info
        if(!user){
            return next(new HttpError("User not found",404));
        }
        res.json(user);
    }
    catch(err){
        console.log(err);
        return next(new HttpError(err));
    }
};


//Update user-avatar
//Protected
// PATCH: /api/users/change-avatar
const updateUserAvatar = async(req,res,next)=>{
    try{
        const {avatar}=req.files;
        const _id = req.user.userId;
        const user = await User.findById(_id);

        //if avatar exists previously we need to delete existing avatar
        if(user.avatar){
            fs.unlink(path.join(__dirname,'..','uploads',user.avatar),(err)=>{
                if(err){
                    return next(new HttpError(err));
                }
            })
        }
        const filesize = avatar.size;
        if(filesize>(200000))  //>200KB
        {
            return next(new HttpError("Avatar size is too large: "+filesize,422));
        }
        //filename: userID.extension : can expose id of user to others
        //filename: uuid.extension : can't expose id of user to others: better privacy
        const filename = avatar.name;
        const splittedfilename = filename.split('.');
        const uniquefilename = splittedfilename[0]+"-"+uuid() + "." + splittedfilename[splittedfilename.length - 1];
        
        avatar.mv(path.join(__dirname,"/../uploads",uniquefilename),async (err)=>{
            if(err){
                return next(new HttpError(err));
            }
            const updatedUser = await User.findByIdAndUpdate(_id,{avatar: uniquefilename, new: true}).select('-password');
            if(!updatedUser){
                return next(new HttpError("Avatar Change Failed",422));
            }
            res.json(updatedUser);
        });
    }
    catch(err){
        console.log(err);
        return next(new HttpError(err));
    }
};

//Update user details
//Protected
// PATCH: /api/users/edit-user
const updateUserDetails = async (req,res,next)=>{

    const {username,email,currentPassword,newPassword,confirmNewPassword} = req.body;
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!username || !email || !currentPassword){
        return next(new HttpError("Please provide all necessary fields",422));
    }
    if(!user){
        return next(new HttpError("User not found",404));
    }
    const isPasswordCorrect = await bcrypt.compare(currentPassword,user.password);
    if (!isPasswordCorrect){
        return next(new HttpError("Invalid password",422));
    }
    const updatedUser = new User(
        {
            username: user.username,
            email: user.email,
            password:user.password
        }
    );

    //handling password change

    if(newPassword){
        if(newPassword.trim().length<8){
            return next(new HttpError("New password must be at least 8 characters long",422));
        }
        if(newPassword !== confirmNewPassword){
            return next(new HttpError("New passwords do not match",422));
        }
        const salt = await bcrypt.genSalt(10);
        updatedUser.password = await bcrypt.hash(newPassword,salt);
    }
    //handling username change
    if(username){
        const doesUsernameExist = await User.findOne({username:username});
        if(doesUsernameExist && doesUsernameExist._id != userId){
            return next(new HttpError("Username already exists",422));
        }
        updatedUser.username = username;
    }
    //handling email change
    if(email){
        const doesEmailExist = await User.findOne({email:email});
        if(doesEmailExist && doesEmailExist._id!= userId){
            return next(new HttpError("Email already exists",422));
        }
        updatedUser.email = email;
    }
    //updating in database
    const result = await User.findByIdAndUpdate(userId,{username:updatedUser.username, email:updatedUser.email, password:updatedUser.password},{new:true});
    
    //updating the JWT (username might have changed)
    if(username){
        const token = jwt.sign({userId: user._id,username: updatedUser.username},process.env.JWT_SECRET,{expiresIn: "1d"});
    }

    res.status(200).json(result);

};

//Delete user
//Protected
// DELETE: /api/users/delete-account
const deleteUser = async (req,res,next)=>{
    try{
        const userId = req.user.userId;
        const user = await User.findById(userId);
        const {password} = req.body;
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return next(new HttpError("Invalid password",422));
        }

        //Cascading delete of posts
        let postId;
        for (postId of user.posts){
            const post = await Post.findById(postId);
            const thumbnail = post.thumbnail;
            if(thumbnail){
                fs.unlink(path.join(__dirname,'..','uploads',thumbnail),(err)=>{
                    if(err){
                        return next(new HttpError(err));
                    }
                })
            }
            await Post.findByIdAndDelete(postId);
        }

        //Delete avatar
        if(user.avatar){
            fs.unlink(path.join(__dirname,'..','uploads',user.avatar),(err)=>{
                if(err){
                    return next(new HttpError(err));
                }
            })
        }

        //Iterate followers, and remove id from their following list
        let followerId;
        for (followerId of user.follower){
            const follower = await User.findByIdAndUpdate(followerId,{ $pull: { following: userId }},{new: true});
            follower.followingCount = follower.following.length;
            await follower.save();
        }

        //Iterate following, and remove id from their follower list and reduce their follower count
        let followingId;
        for (followingId of user.following){
            const following = await User.findByIdAndUpdate(followingId,{ $pull: { follower: userId }},{new: true});
            following.followerCount = following.follower.length;
            await following.save();
        }

        await User.findByIdAndDelete(userId);
    }
    catch(err){
        return next(new HttpError(err));
    }
    res.json("User Deleted Successfully");
};

//Follow user
//Protected
//POST: api/users/follow/:id
const followUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req.user.userId);
        const followedUserId = req.params.id;
        const followedUser = await User.findById(followedUserId);
        if(followedUser){
        if(!user.following || !user.following.includes(followedUserId)){
            user.following.push(followedUserId);
            await user.save();
            followedUser.followerCount = (followedUser?.followerCount || 0) + 1;
            followedUser.follower.push(req.user.userId);
            await followedUser.save();
            res.json("User followed successfully");
        }
        else{
            return next(new HttpError("Already following this user",409));
        }
        }
    }
    catch(err){
        return next(new HttpError(err));
    }
}

//Follow user
//Protected
//POST: api/users/follow/:id
const unFollowUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req.user.userId);
        const followedUserId = req.params.id;
        const followedUser = await User.findById(followedUserId);
        if(followedUser){
        if(user.following && user.following.includes(followedUserId)){
            user.following = user.following.filter(element => element.toString() !== followedUserId);
            await user.save();
            followedUser.followerCount = (followedUser?.followerCount || 0) - 1;
            followUser.follower = followUser.follower.filter(element => element.toString() !== req.user.userId);
            await followedUser.save();
            res.json("User unfollowed successfully");
        }
        else{
            return next(new HttpError("Not following this user",409));
        }
        }
    }
    catch(err){
        return next(new HttpError(err));
    }
}

//To get all users following
//Protected
//GET: api/users/following-authors
const getFollowing = async (req, res, next) =>{
    try{
        const userId = req.user.userId;
        const user = await User.findById(userId);
        const followedUserIds = user.following;
        const followedUsers = await User.find({_id:{$in:followedUserIds}},'username avatar postCount followerCount');
        if(followedUsers){
            res.json(followedUsers);
        }
        else{
            res.json("No followers found");
        }
    }
    catch(err){
        return next(new HttpError(err));
    }
}

module.exports = {registerUser, loginUser, getAllUsers, getUser,getUserbyId, updateUserAvatar, getAllAuthors, updateUserDetails, deleteUser, followUser, unFollowUser, getFollowing};