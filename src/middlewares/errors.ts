import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof Error) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};