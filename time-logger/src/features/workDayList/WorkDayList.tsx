import {useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getUserData } from '../userData/userDataSlice';
import { selectUserData } from '../userData/userDataSlice';
import { selectUserInfo } from '../userInfo/userInfoSlice';

import { WorkUnitList } from '../workUnitList/WorkUnitList';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function WorkDayList() {
  const dispatch = useAppDispatch();

  const userData = useAppSelector(selectUserData);
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
          {userData.workDays.map((workDay: any) => (
            <Row key={workDay.id} className="work-day-row">
              <Col sm={12} className="work-day-row__date-col">
                  <h3>
                    { workDay.date }
                  </h3>
              </Col>
              <Col sm={12} className="work-day-row__work-units-col">
                <Container>
                  {workDay.dayNotes && 
                    <Row>
                      <h4>Work Day Notes</h4>
                      { workDay.dayNotes }
                    </Row>
                  }
                  <Row>
                    <h4>Work Units logged</h4>
                    <WorkUnitList workDayId={workDay.id} />
                  </Row>
                </Container>
              </Col>
            </Row>
          ))}
        </Container>
      }
    </div>
  );
}
