import express from 'express';
import { createPost, getPosts } from '../controllers/postController';

import { isAuth } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getPosts);

router.post('/add', isAuth, createPost);



export default router;
