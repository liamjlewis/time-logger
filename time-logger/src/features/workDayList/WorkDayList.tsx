import {useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getUserData } from '../userData/userDataSlice';
import { selectUserData } from '../userData/userDataSlice';
import { selectUserInfo } from '../userInfo/userInfoSlice';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function WorkDayList() {
  const dispatch = useAppDispatch();

  const workDayList = useAppSelector(selectUserData);
  const userInfo = useAppSelector(selectUserInfo);

  useEffect(()=>{
    if(userInfo.isLoggedIn){
      dispatch(getUserData(userInfo.id))
    }
  },[userInfo])

  const projectsList = workDayList.projects.map((project: string) => JSON.stringify(project));

  return (
    <Container>
      <Row>
        <Col>
          {userInfo.isLoggedIn ? 
            <div>
              <h2>Projects:</h2>
              {projectsList.map((project: any) => (
                project
              ))}
            </div>
            :
            <span>Log in to view your stats and achievements.</span>
          }
        </Col>
      </Row>
    </Container>
  );
}
