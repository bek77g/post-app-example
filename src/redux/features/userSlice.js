import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('user/login', async (userData) => {
  const response = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data;
});

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData) => {
    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  }
);

export const setUserPassword = createAsyncThunk(
  'user/set-new-password',
  async ({ newPassword, token }) => {
    const response = await fetch(`http://localhost:8080/set-pwd/${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword }),
    });
    const data = await response.json();
    return data;
  }
);
export const changeUserPassword = createAsyncThunk(
  'user/change-password',
  async ({ newPassword, currentPassword }) => {
    const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
    const response = await fetch(`http://localhost:8080/change-pwd`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      body: JSON.stringify({ newPassword, currentPassword }),
    });
    const data = await response.json();
    return data;
  }
);

export const resetPwdRequest = createAsyncThunk(
  'user/reset-password',
  async (email) => {
    const response = await fetch(`http://localhost:8080/reset-pwd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload));
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('user', JSON.stringify(action.payload));
    });

    builder.addCase(setUserPassword.fulfilled, (state, action) => {
      alert(action.payload.message, action.payload.error);
    });

    builder.addCase(resetPwdRequest.fulfilled, (state, action) => {
      alert(action.payload.message, action.payload.error);
    });

    builder.addCase(changeUserPassword.fulfilled, (state, action) => {
      alert(action.payload.message, action.payload.error);
    });

    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      }
    );
  },
});

export const selectUser = (state) => state.user;
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
