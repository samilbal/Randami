import {createSlice} from '@reduxjs/toolkit';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    savePosts: (state, action) => {
      state[0] = action.payload;
    },
    clear: state => {
      state = [];
    },
  },
});

export const {savePosts, clear} = postsSlice.actions;
export default postsSlice.reducer;
