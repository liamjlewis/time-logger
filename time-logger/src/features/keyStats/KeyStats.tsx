import {useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUserData } from '../userData/userDataSlice';
import { selectUserInfo } from '../userInfo/userInfoSlice';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LineChart from '../../components/lineChart';

export function KeyStats() {
  const workDayList = useAppSelector(selectUserData);
  const userInfo = useAppSelector(selectUserInfo);

  useEffect(() => {
    console.log("would this actually change is the redux state changes? because it's a var set by props and not the prop itself");
    // build a utility function that takes redux state data and fires it out properly formatted Nivo data - type check data going in and out.
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
