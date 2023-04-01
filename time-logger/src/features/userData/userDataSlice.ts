import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface UserDataState {
  requestInfo: any;
  projects: any;
  workDays: any;
  workUnits: any;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserDataState = {
  requestInfo: null,
  projects: [],
  workDays: [],
  workUnits: [],
  status: 'idle',
};

export const getUserData = createAsyncThunk(
  'userData/getUserData',
  async (userId: string) => {
    let theResponse = null;
    await fetch("/userData", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
     body: JSON.stringify({id: userId})
    })
    .then((response) => response.json())
    .then((data) => theResponse = data)
    .catch(error => console.log('ERROR: ', error));
    return theResponse;
  }
);

export const counterSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = 'idle';
        if(!!action.payload) {
          state.projects = action.payload["projects"] || null;
          state.workDays = action.payload["workDays"] || null;
          state.workUnits = action.payload["workUnits"] || null;
        }
      })
      .addCase(getUserData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectUserData = (state: RootState) => state.userData;


export default counterSlice.reducer;
