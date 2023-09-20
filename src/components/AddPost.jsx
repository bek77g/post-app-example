import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/features/postsSlice.js';

const AddPost = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const postData = { title, content };
    dispatch(addPost(postData));
    setTitle('');
    setContent('');
  }

  return (
    <div className='add-post'>
      <div className='add-post-container'>
        <h2>Добавить свой пост</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Заголовок'
              className='input-field'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <textarea
              placeholder='Содержание'
              className='textarea-field'
              value={content}
              onChange={(e) => setContent(e.target.value)}></textarea>
          </div>
          <button type='submit' className='button'>
            Опубликовать
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
