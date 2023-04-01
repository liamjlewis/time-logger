import {useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUserData } from '../userData/userDataSlice';
import { selectUserInfo } from '../userInfo/userInfoSlice';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LineChart from '../../components/lineChart';

import { workUnitsForLineChart } from '../../utilities';

export function KeyStats() {
  const userData = useAppSelector(selectUserData);
  const userInfo = useAppSelector(selectUserInfo);
  
  const [workUnitsProcessed, setWorkUnitsProcessed] = useState<any[]>([]);

  useEffect(() => {
    setWorkUnitsProcessed(workUnitsForLineChart(userData.workUnits));
  }, [userData])

  return (
    <Container>
        {userInfo.isLoggedIn ? 
          <Row>
            <Col sm={12} md={4}>
              <LineChart data={workUnitsProcessed} />
            </Col>
            <Col sm={12} md={4}>
              <LineChart data={workUnitsProcessed} />
            </Col>
            <Col sm={12} md={4}>
              <LineChart data={workUnitsProcessed} />
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
