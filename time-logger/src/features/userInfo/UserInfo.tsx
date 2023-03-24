import {useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getUserInfo
} from './userInfoSlice';
import {
  selectUserInfo,
} from './userInfoSlice';

export function UserInfo() {
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getUserInfo())
  },[])

  const userInfo = useAppSelector(selectUserInfo);

  return (
    <div>
        {userInfo.isLoggedIn ? 
          <span>Hello {userInfo.firstName}</span>
          :
          <span>not logged in</span>
        }
    </div>
  );
}
