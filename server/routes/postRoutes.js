const {Router} = require('express');
const {getPost, getAllPost, getCategoryPost, getAuthorPost, createNewPost, editPost, deletePost} = require("../controllers/postController.js");
const authMiddleware = require("../middlewares/authMiddlewares.js");

const router = Router();

router.get('/',getAllPost);
router.get('/:id',getPost);
router.get('/category/:category',getCategoryPost);
router.get('/user/:id',getAuthorPost);
router.post('/create',authMiddleware, createNewPost);   
router.patch('/:id',authMiddleware, editPost);          
router.delete('/:id',authMiddleware, deletePost);       

module.exports = router;