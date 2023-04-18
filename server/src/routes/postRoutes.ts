import express from 'express';
import {
  createPost,
  getPostLikes,
  getPosts,
  getSinglePost,
  getUserPosts,
  likePost,
} from '../controllers/postController';

import { isAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getPosts);

router.get('/user/:id', getUserPosts);

router.get('/:id/likes', getPostLikes);

router.get('/:id', getSinglePost);

router.post('/add', isAuth, createPost);

// like / dislike a post
router.post('/like/:id', isAuth, likePost);

export default router;
