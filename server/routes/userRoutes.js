const {Router} = require('express');
const router = Router();
const authMidlleware = require('../middlewares/authMiddlewares.js');
const {registerUser, loginUser, getUserbyId, getAllAuthors, getAllUsers, getUser, updateUserAvatar, updateUserDetails, deleteUser} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/myprofile', authMidlleware, getUser);
router.get('/',getAllUsers);
router.get('/authors',getAllAuthors);
router.get('/:id',getUserbyId);
router.patch('/change-avatar',authMidlleware, updateUserAvatar);
router.patch('/edit-user',authMidlleware, updateUserDetails);


module.exports = router;