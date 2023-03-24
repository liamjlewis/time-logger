import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/counter/usersSlice';
import userInfoReducer from '../features/userInfo/userInfoSlice';
import workDaysReducer from '../features/workDayList/workDayListSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    userInfo: userInfoReducer,
    workDayList: workDaysReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
