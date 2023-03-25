import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface WorkDayListState {
  requestInfo: any;
  projects: any;
  workDays: any;
  workUnits: any;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: WorkDayListState = {
  requestInfo: null,
  projects: [],
  workDays: [],
  workUnits: [],
  status: 'idle',
};

export const getWorkDayList = createAsyncThunk(
  'workDayList/getWorkDayList',
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
  name: 'workDayList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkDayList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getWorkDayList.fulfilled, (state, action) => {
        state.status = 'idle';
        if(!!action.payload) {
          state.projects = action.payload["projects"] || null;
          state.workDays = action.payload["workDays"] || null;
          state.workUnits = action.payload["workUnits"] || null;
        }
      })
      .addCase(getWorkDayList.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

//export const { getWorkDayList } = counterSlice.actions;

export const selectWorkDayList = (state: RootState) => state.workDayList;


export default counterSlice.reducer;
