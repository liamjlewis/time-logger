import {useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUserData } from './userDataSlice';
import { getUserData } from './userDataSlice';
import { selectUserInfo } from '../userInfo/userInfoSlice';

export function UserData() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const userData = useAppSelector(selectUserData);

  useEffect(()=>{
    if(userInfo.isLoggedIn) {
      dispatch(getUserData(userInfo.id))
    }
  },[userInfo])


  return (
    <div>
        {JSON.stringify(userData)}
    </div>
  );
}
