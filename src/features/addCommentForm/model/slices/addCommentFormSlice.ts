import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddCommentFormSchema } from '../types/addCommentForm';

const initialState: AddCommentFormSchema = { text: '' };

export const addCommentForm = createSlice({
    name: 'addCommentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginByUserName.pending, (state) => {
    //             state.isLoading = true;
    //             state.error = undefined;
    //         })
    //         .addCase(loginByUserName.fulfilled, (state, action) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(loginByUserName.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload as string;
    //         });
    // },
});

// Action creators are generated for each case reducer function
export const { actions: addCommentFormAction } = addCommentForm;
export const { reducer: addCommentFormReducer } = addCommentForm;
