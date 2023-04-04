import express from 'express';
import { createPost, getPosts, getSinglePost, likePost } from '../controllers/postController';

import { isAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getPosts);

router.get('/:id', getSinglePost);

router.post('/add', isAuth, createPost);

// like / dislike a post
router.post('/like/:id', isAuth, likePost);

export default router;
