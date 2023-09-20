import React, { useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  deletePost,
  fetchPosts,
  selectPosts,
} from '../redux/features/postsSlice';
import { selectUser } from '../redux/features/userSlice';

function PostList() {
  const dispatch = useDispatch();

  // const { postList } = useSelector((state) => state.posts);
  const { postList } = useSelector(selectPosts);
  const userData = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
  };

  return (
    <div className='container'>
      <h2 className='page-title'>Список постов</h2>
      <ul className='post-list'>
        {postList.map((post) => (
          <li key={post.id} className='card'>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <hr style={{ margin: '10px 0' }} />
            <p>
              <i>
                Автор: <b>{post.author}</b>
              </i>
            </p>
            {post.userId === userData.user?.id && (
              <AiOutlineDelete
                onClick={() => handleDeletePost(post.id)}
                size={24}
                color='red'
                style={{ cursor: 'pointer' }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
