import {useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getUserData } from './userDataSlice';
import { selectUserInfo } from '../userInfo/userInfoSlice';

export function UserData() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);

  useEffect(()=>{
    if(userInfo.isLoggedIn) {
      dispatch(getUserData())
    }
  },[userInfo])


  return (
    <div></div>
);
}
