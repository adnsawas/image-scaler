import { NextFunction, Request, Response } from 'express';

export const validation = (req: Request, res: Response, next: NextFunction) => {
  // Get fileName from request's  query
  const { fileName } = req.query;

  // Reject the request if there is no query parameter names: fileName
  if (!fileName) {
    return res.status(404).send('No file name');
  }
  // Go to next middleware if any is available
  next();
};
