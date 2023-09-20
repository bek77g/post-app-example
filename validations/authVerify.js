import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config.js';

export const authValidator = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Отсутствует токен аутентификации' });
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
      return res
        .status(401)
        .json({
          error: error.message || 'Недействительный токен аутентификации',
        });
    }

    req.user = decoded;

    next();
  });
};
