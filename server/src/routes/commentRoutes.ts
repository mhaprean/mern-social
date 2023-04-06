import express from 'express';

import { isAuth } from '../middleware/authMiddleware';
import { addComment, addReply, getPostComments, likeComment } from '../controllers/commentController';

const router = express.Router();

router.get('/post/:id', getPostComments);

router.post('/add', isAuth, addComment);

router.post('/add-reply', isAuth, addReply);

// like / dislike a comment
router.post('/:id/like', isAuth, likeComment);

export default router;
