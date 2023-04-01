import {useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectWorkDayList } from '../workDayList/workDayListSlice';
import { selectUserInfo } from '../userInfo/userInfoSlice';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LineChart from '../../components/lineChart';

export function KeyStats() {
  const workDayList = useAppSelector(selectWorkDayList);
  const userInfo = useAppSelector(selectUserInfo);

  useEffect(() => {
    console.log("would this actually change is the redux state changes? because it's a var set by props and not the prop itself");
    // build a utility function that takes redux state data and fires it out properly formatted Nivo data - type check data going in and out.
    // also, "workDayList" needs to change in the state to userData, I think the initial call for data needs to be done in the userInfo slice, that can act as a component that's initialising all data.
    // it's conceptually a bit odd to have that data initialisation handled by a component I suppose, but that's Redux and it shouldn't cause an issue.
  }, [workDayList])

  const theDataTemp = [{"id":"dd643729-0d8c-4a32-a9d7-9aa291cf5021","data":[{"x":"27-02-23","y":3}]},{"id":"50d4df9a-e12b-40b9-9693-cf596fbdc713","data":[{"x":"26-02-23","y":1},{"x":"27-02-23","y":1}]}];

  return (
    <Container>
        {userInfo.isLoggedIn ? 
          <Row>
            <Col sm={12} md={4}>
              <LineChart data={theDataTemp} />
            </Col>
            <Col sm={12} md={4}>
              {JSON.stringify(workDayList)}
            </Col>
            <Col sm={12} md={4}>
              <LineChart data={theDataTemp} />
            </Col>
          </Row>
        :
          <Row>
            <Col>
              <p>Log in to view your stats and achievements.</p>
            </Col>
          </Row>
        }
    </Container>
  );
}
