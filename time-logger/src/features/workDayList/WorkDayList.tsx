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

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h2>Projects:</h2>
          </Col>
        </Row>
      </Container>
      {userInfo.isLoggedIn &&  
        <Container>
          {workDayList.workDays.map((workDay: any) => (
            <Row key={workDay.id}>
              <Col>
                  <h4>
                    { workDay.date }
                  </h4>
              </Col>
              <Col>
                  <h4>
                    { workDay.dayNotes }
                  </h4>
              </Col>
            </Row>
          ))}
        </Container>
      }
    </div>
  );
}
