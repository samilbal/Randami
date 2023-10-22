import {configureStore} from '@reduxjs/toolkit';
import postsReducer from './PostsSlice';

export default store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
