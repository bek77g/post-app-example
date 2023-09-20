import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserPassword } from '../redux/features/userSlice';
import { useParams } from 'react-router-dom';

const ResetPWD = () => {
  const dispatch = useDispatch();
  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePWD = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert('Пароли не совпадают');
    }
    dispatch(setUserPassword({ newPassword: password, token }));
  };

  return (
    <div className='container'>
      <h2 className='page-title'>Изменить пароль</h2>
      <form onSubmit={handleChangePWD}>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            className='input-field'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Подтвердить пароль'
            className='input-field'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='button'>
          Изменить
        </button>
      </form>
    </div>
  );
};

export default ResetPWD;
