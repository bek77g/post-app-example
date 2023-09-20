import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeUserPassword } from '../redux/features/userSlice';

const ChangePWD = () => {
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePWD = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert('Пароли не совпадают');
    }
    dispatch(changeUserPassword({ newPassword: password, currentPassword }));
  };

  return (
    <div className='container'>
      <h2 className='page-title'>Установить новый пароль</h2>
      <form onSubmit={handleChangePWD}>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Старый пароль'
            className='input-field'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Новый пароль'
            className='input-field'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Подтвердить новый пароль'
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

export default ChangePWD;
