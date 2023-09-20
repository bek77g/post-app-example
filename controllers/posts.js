import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import uuid4 from 'uuid4';

//Путь к JSON файлу с данныит постов
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbFilePath = join(__dirname, '..', 'data', 'posts.json');
const dbUsersFilePath = join(__dirname, '..', 'data', 'users.json');

export const getPosts = async (req, res) => {
  try {
    const data = await readFile(dbFilePath, 'utf8');
    const posts = JSON.parse(data);
    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || 'Ошибка при чтении данных' });
  }
};

export const createPost = async (req, res) => {
  try {
    const reqUserId = req.user.userId;

    //Posts data
    const postsData = await readFile(dbFilePath, 'utf8');
    const posts = JSON.parse(postsData);

    //Users data
    const usersData = await readFile(dbUsersFilePath, 'utf8');
    const users = JSON.parse(usersData);
    const existingUser = users.find((user) => user.id === reqUserId);

    const newPost = {
      ...req.body,
      author: existingUser.username,
      userId: existingUser.id,
      id: uuid4(),
    };

    posts.push(newPost);
    await writeFile(dbFilePath, JSON.stringify(posts));
    res.json(newPost);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || 'Ошибка при создании поста' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const data = await readFile(dbFilePath, 'utf8');
    const posts = JSON.parse(data);
    const postId = req.params.postId;
    const { id, ...updatedPost } = req.body;

    const postIndex = posts.findIndex((post) => post.id === postId);

    if (postIndex === -1) {
      res.status(404).json({ error: 'Пост не найден' });
    }

    posts[postIndex] = { ...posts[postIndex], ...updatedPost };

    await writeFile(dbFilePath, JSON.stringify(posts));
    res.json(posts[postIndex]);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || 'Ошибка при обновлении поста' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const reqUserId = req.user.userId;
    const postId = req.params.postId;

    //Posts data
    const postsData = await readFile(dbFilePath, 'utf8');
    const posts = JSON.parse(postsData);

    //Users data
    const usersData = await readFile(dbUsersFilePath, 'utf8');
    const users = JSON.parse(usersData);
    const existingUser = users.find((user) => user.id === reqUserId);

    const postIndex = posts.findIndex((post) => post.id === postId);

    if (postIndex === -1) {
      return res.status(404).json({ error: 'Пост не найден для удаления' });
    }

    const existingPost = posts.find((post) => post.id === postId);

    if (existingPost.userId !== reqUserId) {
      return res
        .status(403)
        .json({ error: 'Вы не имеете право удалять данный пост' });
    }

    posts.splice(postIndex, 1);

    await writeFile(dbFilePath, JSON.stringify(posts));
    res.json({ success: 'Пост удалён' });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || 'Ошибка при удалении поста' });
  }
};
