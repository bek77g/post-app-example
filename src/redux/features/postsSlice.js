const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
  const response = await fetch('http://localhost:8080/posts');
  const data = await response.json();
  return data;
});

export const addPost = createAsyncThunk('post/addPost', async (postData) => {
  const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
  const response = await fetch('http://localhost:8080/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    },
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  return data;
});

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (postId) => {
    const accessToken = JSON.parse(localStorage.getItem('user')).accessToken;
    await fetch(`http://localhost:8080/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });
    return { postId };
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState: {
    postList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.postList = action.payload;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.postList.push(action.payload);
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      const { postId } = action.payload;
      state.postList = state.postList.filter((post) => post.id !== postId);
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

export const selectPosts = (state) => state.posts;
export default postSlice.reducer;
