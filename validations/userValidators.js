import { body } from 'express-validator';

export const userRegistrationValidation = [
  body('username')
    .notEmpty()
    .withMessage('Имя пользователя не может быть пустым')
    .isString()
    .withMessage('Имя пользователя должно быть строкой'),
  body('email')
    .notEmpty()
    .withMessage('Email не может быть пустым')
    .isEmail()
    .withMessage('Пожалуйста укажите правильный адрес эл. почты'),
  body('password')
    .notEmpty()
    .withMessage('Пароль не может быть пустым')
    .isString()
    .withMessage('Пароль должен быть строкой')
    .isLength({ min: 8, max: 16 })
    .withMessage('Пароль должен содержать минимум 8 символов, до 16')
    .matches(/\d/)
    .withMessage('Пароль должен содержать хотя бы одну цифру'),
];

export const userLoginValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email не может быть пустым')
    .isEmail()
    .withMessage('Пожалуйста укажите правильный адрес эл. почты'),
  body('password')
    .notEmpty()
    .withMessage('Пароль не может быть пустым')
    .isString()
    .withMessage('Пароль должен быть строкой'),
];
