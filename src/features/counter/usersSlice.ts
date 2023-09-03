import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchCount } from './counterAPI';

export interface UsersState {
  user: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UsersState = {
  user: "No user selected.",
  status: 'idle',
};

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async () => {
    let responseX = null;
    await fetch("/users")
    .then((response) => {
      responseX = response.json()
    })
    .catch(error => console.log('ERROR: ', error));
    return responseX;
  }
);

export const counterSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = JSON.stringify(action.payload);
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

//export const { getUsers } = counterSlice.actions;

export const selectUser = (state: RootState) => state.users.user;


export default counterSlice.reducer;
