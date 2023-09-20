import express from 'express';
import cors from 'cors';
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from './controllers/posts.js';
import {
  changePwd,
  loginUser,
  registerUser,
  resetPassword,
  setPwd,
} from './controllers/users.js';
import { authValidator } from './validations/authVerify.js';
import {
  userLoginValidation,
  userRegistrationValidation,
} from './validations/userValidators.js';
import handleValidatorErrors from './validations/handleValidatorErrors.js';
import { postCreateValidation } from './validations/postValidators.js';

const app = express();
const PORT = 8080;

//Middleware для автоматического разбора JSON в запросах
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

app.post(
  '/register',
  userRegistrationValidation,
  handleValidatorErrors,
  registerUser
);
app.post('/login', userLoginValidation, handleValidatorErrors, loginUser);

//Reset password
app.post('/reset-pwd', resetPassword);
app.patch('/set-pwd/:token', setPwd);

//Change password
app.patch('/change-pwd', authValidator, changePwd);

//Маршрут для получения ВСЕХ постов (GET)
app.get('/posts', getPosts);

//Маршрут для создания нового поста (POST)
app.post(
  '/posts',
  authValidator,
  postCreateValidation,
  handleValidatorErrors,
  createPost
);

//Маршрут для обновления сеществующего поста (PATCH)
app.patch('/posts/:postId', updatePost);

//Марщрут для удаления поста
app.delete('/posts/:postId', authValidator, deletePost);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
