import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/postsSlice';
import userReducer from './features/userSlice';

const persistedUser = JSON.parse(localStorage.getItem('user'))?.user;

const initialState = {
  user: {
    user: persistedUser || null,
  },
};

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
  },
  preloadedState: initialState,
});
