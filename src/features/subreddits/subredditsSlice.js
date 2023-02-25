import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSubreddits } from '../../api/index.js';

const initialState = {
    subreddits: [],
    selectedSubreddit: 'pics',
    isPending: false,
    hasError: false,
}

export const loadSubreddits = createAsyncThunk(
    'subreddits/loadSubreddits',
    async() => {
        // const response = await fetch('https://www.reddit.com/subreddits.json');
        // const jsonResponse = await response.json();
        // return jsonResponse.data.children; 
        const allSubreddits = getSubreddits();
        return allSubreddits;
    }
)

export const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: initialState,
    reducers: {
        setSelectedSubreddit: (state, action) => {
            state.selectedSubreddit = action.payload;
        },
    },
    extraReducers: {
       [loadSubreddits.pending]: (state) => {
         state.isPending = true;
         state.hasError = false;
       },
       [loadSubreddits.fulfilled]: (state, action) => {
        state.isPending = false;
        state.hasError = false;
        state.subreddits = action.payload;
       },
       [loadSubreddits.rejected]: (state) => {
        state.isPending = false;
        state.hasError = true;
       }
    }

})

export const selectAllSubreddits = (state) => state.subreddits.subreddits;
export const selectIsPending = (state) => state.subreddits.isPending;
export const selecthasError = (state) => state.subreddits.hasError;
export const selectSelectedSubreddit = (state) => state.subreddits.selectedSubreddit;

export const { setSelectedSubreddit } = subredditsSlice.actions

export default subredditsSlice.reducer;

