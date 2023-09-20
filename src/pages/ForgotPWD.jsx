import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPwdRequest } from '../redux/features/userSlice.js';

const ForgotPWD = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const handleResetPasswordReq = () => {
    dispatch(resetPwdRequest(email));
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
        <button
          type='button'
          className='button'
          onClick={handleResetPasswordReq}>
          Сбросить пароль
        </button>
      </form>
    </div>
  );
};

export default ForgotPWD;
