import express from 'express';
import { createPost, getPosts, likePost } from '../controllers/postController';

import { isAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getPosts);

router.post('/add', isAuth, createPost);

// like / dislike a post
router.post('/like/:id', isAuth, likePost);

export default router;
