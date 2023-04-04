import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const getUser = async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select('-password');

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json(error);
  }
};
