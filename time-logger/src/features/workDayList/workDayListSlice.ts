import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchCount } from './WorkDayListAPI';

export interface WorkDayListState {
  data: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: WorkDayListState = {
  data: "No user selected.",
  status: 'idle',
};

export const getWorkDayList = createAsyncThunk(
  'workDayList/getWorkDayList',
  async () => {
    let responseX = null;
    await fetch("/userData")
    .then((response) => response.json())
    .then((data) => responseX = data)
    .catch(error => console.log('ERROR: ', error));
    return !responseX ? responseX :responseX["b8173d03-f47b-423d-a074-8076c9b7bba9"];
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
        state.data = JSON.stringify(action.payload);
      })
      .addCase(getWorkDayList.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

//export const { getWorkDayList } = counterSlice.actions;

export const selectWorkDayList = (state: RootState) => state.workDayList;


export default counterSlice.reducer;
