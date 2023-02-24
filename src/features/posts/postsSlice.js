import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
    posts: [],
    isPending: false,
    hasError: false,
    searchTerm: '',
}

export const loadPosts = createAsyncThunk(
    'posts/loadPosts',
    async(subreddit) => {
       const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
       const jsonResponse = await response.json();
       return jsonResponse.data.children; 
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
    },
    extraReducers:{
        [loadPosts.pending]: (state) => {
            state.isPending = true;
            state.hasError = false;
        },
        [loadPosts.fulfilled]: (state, action) => {
            state.isPending = false;
            state.hasError = false;
            state.posts = action.payload;
        },
        [loadPosts.hasError]: (state) => {
            state.isPending = false;
            state.hasError = true;
        }
    }
});

export const selectPosts = (state) => {
    const posts = state.posts.posts;
    const filteredPosts = posts.filter(post => post.data.title.toLowerCase().includes(state.posts.searchTerm.toLowerCase().trim()))
    return filteredPosts;
}
export const selectIsPending = (state) => state.posts.isPending;
export const selectHasError = (state) => state.posts.hasError;
export const selectSearchTerm = (state) => state.posts.searchTerm;

export const {setSearchTerm} = postsSlice.actions;

export default postsSlice.reducer