import express from 'express';

import { isAuth } from '../middleware/authMiddleware';
import { addComment, addReply, getPostComments } from '../controllers/commentController';

const router = express.Router();

router.get('/post/:id', getPostComments);

router.post('/add', isAuth, addComment);

router.post('/add-reply', isAuth, addReply);

export default router;
