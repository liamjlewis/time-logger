import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchCount } from './UserInfoAPI';

export interface UserInfoState {
  status: 'idle' | 'loading' | 'failed';
  isLoggedIn: boolean;
  id: string;
  firstName: string;
  lastName: string;
  dateCreated: number|null;
  restDays: Array<string>;
  restDaysIrregular: Array<string>;
  restTime: string;
}

const initialState: UserInfoState = {
  status: 'idle',
  isLoggedIn: false,
  id: "",
  firstName: "",
  lastName: "",
  dateCreated: null,
  restDays: [],
  restDaysIrregular: [],
  restTime: "",
};

export const getUserInfo = createAsyncThunk(
  'userInfo/getUserInfo',
  async () => {
    let responseX = null;
    await fetch("/users")
    .then((response) => response.json())
    .then((data) => responseX = data)
    .catch(error => console.log('ERROR: ', error));
    return !!responseX ? responseX[0] : responseX;
  }
);

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = 'idle';
        if(!!action.payload) {
          // square bracket syntax is a fix for a typescript bug that stated "property X does not exist on type 'never'"
          state.isLoggedIn = true;
          state.id = action.payload["id"] || "";
          state.firstName = action.payload["firstName"] || "";
          state.lastName = action.payload["lastName"] || "";
          state.dateCreated = action.payload["dateCreated"] || null;
          state.restDays = action.payload["restDays"] || null;
          state.restDaysIrregular = action.payload["restDaysIrregular"] || null;
          state.restTime = action.payload["restTime"] || null;
        }else {
          state.isLoggedIn = false;
        }
      })
      .addCase(getUserInfo.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

//export const { getUserInfo } = userInfoSlice.actions;

export const selectUserInfo = (state: RootState) => state.userInfo;


export default userInfoSlice.reducer;
