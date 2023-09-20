import { body } from 'express-validator';

export const postCreateValidation = [
  body('title')
    .notEmpty()
    .withMessage('Заголовок не может быть пустым')
    .isString()
    .withMessage('Заголовок должен быть строкой')
    .isLength({ min: 5, max: 300 })
    .withMessage('Заголвоок должен содержать от 5 до 300 символов'),
  body('content')
    .notEmpty()
    .withMessage('Контент не может быть пустым')
    .isString()
    .withMessage('Контент должен быть строкой')
    .isLength({ min: 5, max: 1000 })
    .withMessage('Контент должен содержать от 5 до 1000 символов'),
];
