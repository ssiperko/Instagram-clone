const express = require('express');
const UserController = require('../controllers/user');
const authVerify = require('../middleware/authVerify');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();


router.post('/signup', UserController.create_account);
router.post('/login', UserController.login_user);
router.post('/follow', authVerify, UserController.follow_user);
router.post('/addfollower', authVerify, UserController.add_follower);
//router.post('/files', upload.single('file'), UserController.cloudinary_upload_post);
router.patch('/update/:id', UserController.update_user);
router.get('/profile/:username', UserController.get_user);
router.delete('/:id', UserController.drop_user);

module.exports = router;
