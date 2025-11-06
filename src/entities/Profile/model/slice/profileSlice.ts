import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchProfileData, updateProfileData, Profile, ProfileSchema,
} from 'entities/Profile';

const initialState: ProfileSchema = {
    isLoading: false, readonly: false, error: undefined, data: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadOnly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.form = state.data;
        },
        updateProfile: (state, action: PayloadAction<Profile>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(updateProfileData.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
                state.readonly = true;
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
