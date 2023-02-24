import { configureStore } from '@reduxjs/toolkit';
import subredditsReducer from '../features/subreddits/subredditsSlice.js';
import postsReducer from '../features/posts/postsSlice.js';

export const store = configureStore({
  reducer: {
    subreddits: subredditsReducer,
    posts: postsReducer,
  },
});
