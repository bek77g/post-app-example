import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JWT_SECRET_KEY } from '../config.js';
import jwt from 'jsonwebtoken';
import uuid4 from 'uuid4';
import bcrypt from 'bcrypt';
import { sendMailService } from '../services/mail-send.js';

//Путь к JSON файлу с данныит пользователей
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbFilePath = join(__dirname, '..', 'data', 'users.json');

export const registerUser = async (req, res) => {
  try {
    const { password, ...userData } = req.body;

    const usersData = await readFile(dbFilePath, 'utf8');
    const existingUsers = JSON.parse(usersData);

    const userExists = existingUsers.some(
      (user) => user.email === userData.email
    );

    if (userExists) {
      console.log('Пользователь с таким именем уже существует');
      res
        .status(400)
        .json({ error: 'Пользователь с таким именем уже существует' });
    }

    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      ...userData,
      password: hashedPassword,
      id: uuid4(),
    };

    existingUsers.push(newUser);

    await writeFile(dbFilePath, JSON.stringify(existingUsers));

    const token = await jwt.sign({ userId: newUser.id }, JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    const { password: hiddenPwd, ...userRes } = newUser;

    res.json({ user: userRes, accessToken: token });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, ...userData } = req.body;

    const usersData = await readFile(dbFilePath, 'utf8');
    const existingUsers = JSON.parse(usersData);

    const user = existingUsers.find((user) => user.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Пользователь не найден' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Неверный пароль' });
    }

    const token = await jwt.sign({ userId: user.id }, JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    const { password: hiddenPwd, ...userRes } = user;

    res.json({ user: userRes, accessToken: token });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при аутентификации пользователя' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const resetToken = jwt.sign({ email }, JWT_SECRET_KEY, {
      expiresIn: '15m',
    });

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    const emailContent = `Для сброса пароля перейдите по следующей ссылке: ${resetLink}`;

    //Отправка письма на почту
    // await sendMailService(email, emailContent);

    console.log(emailContent);

    res.json({
      message: 'Инструкции по сбросу пароля отправлены на ваш email',
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Ошибка при отправке инструкций по сбросу пароля' });
  }
};

export const setPwd = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.params;

    const { email, exp } = jwt.verify(token, JWT_SECRET_KEY);

    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (exp < currentTimestamp) {
      return res.status(500).send({ message: 'Срок сброса пароля истек' });
    }

    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const usersData = await readFile(dbFilePath, 'utf8');
    const existingUsers = JSON.parse(usersData);

    const updatedUsers = existingUsers.map((user) => {
      if (user.email === email) {
        return { ...user, password: hashedPassword };
      }
      return user;
    });

    await writeFile(dbFilePath, JSON.stringify(updatedUsers));

    res.json({ message: 'Пароль успешно изменен' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при изменении пароля' });
  }
};

export const changePwd = async (req, res) => {
  try {
    const reqUserId = req.user.userId;
    const { currentPassword, newPassword } = req.body;

    const usersData = await readFile(dbFilePath, 'utf-8');
    const existingUsers = JSON.parse(usersData);

    const user = existingUsers.find((user) => user.id === reqUserId);

    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Неверный текущий пароль' });
    }

    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedPassword;

    await writeFile(dbFilePath, JSON.stringify(existingUsers));

    res.json({ message: 'Пароль успешно изменен' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при изменении пароля' });
  }
};
