const express = require('express');
const PostController = require('../controllers/post');
const authVerify = require('../middleware/authVerify');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router.post('/', PostController.new_post);
router.post('/files', upload.single('file'), PostController.cloudinary_upload_post);
router.post('/comment', authVerify, PostController.comment);
router.post('/like', authVerify, PostController.like);
router.patch('/:photoid', PostController.update_post);
router.get('/explore', PostController.explore);
router.get('/:username', PostController.get_user_feed);
router.delete('/:photoid', authVerify, PostController.drop_post);

module.exports = router;
