import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUserData, createWorkDay, deleteWorkDay, WorkDayType } from '../userData/userDataSlice';
import { selectUserInfo } from '../userInfo/userInfoSlice';

import { WorkUnitList } from '../workUnitList/WorkUnitList';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';

import { shortDateFormat } from '../../utilities';

export function WorkDayList() {
  const userData = useAppSelector(selectUserData);
  const userInfo = useAppSelector(selectUserInfo);

  const dispatch = useAppDispatch();

  const [todayHasWorkDay, setTodayHasWorkDay] = useState<boolean>(false);
  const [displayList, setDisplayList] = useState<WorkDayType[]>([]);

  useEffect(() => {
    const todaysDate = shortDateFormat();
    const todayHasWorkDay = userData.workDays.findIndex(w => w.date === todaysDate) !== -1;
    setTodayHasWorkDay(todayHasWorkDay)
    const displayListOrdered = userData.workDays.toSorted((a:WorkDayType, b:WorkDayType) => new Date(b.date).getTime() - new Date(a.date).getTime())
    setDisplayList(displayListOrdered);
  }, [userData]);

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h2>Work days:</h2>
          </Col>
        </Row>
      </Container>
      {userInfo.isLoggedIn &&  
        <Container>
          {!todayHasWorkDay && <Button variant="primary" onClick={() => dispatch(createWorkDay())}>New work day</Button>}
          {displayList.map((workDay: WorkDayType) => (
            <Row key={workDay.id} className="work-day-row">
              <Col sm={12} className="work-day-row__date-col">
                  <h3>
                    { workDay.date }
                  </h3>
                  <span onClick={() => dispatch(deleteWorkDay(workDay.id))}>&#9447;</span>
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
                    <WorkUnitList workDay={workDay} />
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
