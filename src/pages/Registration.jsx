import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/features/userSlice';

function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    const newUserData = { username, email, password };
    dispatch(registerUser(newUserData));
    navigate('/');
  };

  return (
    <div className='container'>
      <h2 className='page-title'>Регистрация</h2>
      <form>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Имя пользователя'
            className='input-field'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email'
            className='input-field'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Пароль'
            className='input-field'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='button' className='button' onClick={handleRegister}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Registration;
