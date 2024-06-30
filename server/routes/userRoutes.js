const {Router} = require('express');
const router = Router();
const authMidlleware = require('../middlewares/authMiddlewares.js');
const {registerUser, loginUser, getUserbyId, getAllAuthors, getAllUsers, getUser, updateUserAvatar, updateUserDetails, deleteUser, followUser, unFollowUser, getFollowing} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/myprofile', authMidlleware, getUser);
router.get('/',getAllUsers);
router.get('/authors',getAllAuthors);
router.get('/following-authors',authMidlleware, getFollowing);
router.get('/:id',getUserbyId);
router.patch('/change-avatar',authMidlleware, updateUserAvatar);
router.patch('/edit-user',authMidlleware, updateUserDetails);
router.delete('/delete-account',authMidlleware, deleteUser);
router.post('/follow/:id',authMidlleware,followUser);
router.post('/unfollow/:id',authMidlleware,unFollowUser);

module.exports = router;