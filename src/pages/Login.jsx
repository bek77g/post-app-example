import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/features/userSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const userData = { email, password };
    dispatch(loginUser(userData));
    navigate('/');
  };

  return (
    <div className='container'>
      <h2 className='page-title'>Вход</h2>
      <form>
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
        <button type='button' className='button' onClick={handleLogin}>
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
