const {Router} = require('express');
const {getPost, getAllPost, getCategoryPost, getAuthorPost, getFollowingPosts, createNewPost, editPost, deletePost} = require("../controllers/postController.js");
const authMiddleware = require("../middlewares/authMiddlewares.js");

const router = Router();

router.get('/',getAllPost);
router.get('/following-posts',authMiddleware, getFollowingPosts);
router.post('/create',authMiddleware, createNewPost);   
router.get('/:id',getPost);
router.patch('/:id',authMiddleware, editPost);          
router.delete('/:id',authMiddleware, deletePost);       
router.get('/category/:category',getCategoryPost);
router.get('/user/:id',getAuthorPost);

module.exports = router;