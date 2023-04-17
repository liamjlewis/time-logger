import {useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUserData } from '../userData/userDataSlice';
import { selectUserInfo } from '../userInfo/userInfoSlice';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from '../../components/Spinner';
import LineChart from '../../components/LineChart';
import StackedBarChart from '../../components/StackedBarChart';

import { workUnitsForLineChart, LineChartDataType } from '../../utilities';

export function KeyStats() {
  const userData = useAppSelector(selectUserData);
  const userInfo = useAppSelector(selectUserInfo);
  
  const [workUnitsProcessed, setWorkUnitsProcessed] = useState<LineChartDataType | null>(null);

  useEffect(() => {
    setWorkUnitsProcessed(workUnitsForLineChart(userData.workUnits, userData.projects));
    //NOTE: this needs to limit the data to the last week since it's supposed to just be a quick overview
    // NOTE: setWorkUnitsProcessed is being called more than it should be, look into this?
  }, [userData])

  return (
    <div>
      {userInfo.isLoggedIn ? 
        <div>
          {workUnitsProcessed ? 
            <Container>
              <Row>
                <Col sm={12}>
                  <StackedBarChart data={workUnitsProcessed} fullscreen={true} />
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={4}>
                  <LineChart data={workUnitsProcessed} fullscreen={true} />
                </Col>
                <Col sm={12} md={4}>
                  <LineChart data={workUnitsProcessed} fullscreen={true} />
                </Col>
                <Col sm={12} md={4}>
                  <LineChart data={workUnitsProcessed} fullscreen={true} />
                </Col>
              </Row>
            </Container>
          :
            <Container>
              <Spinner />
            </Container>
          }
        </div>
      :
        <Container>
          <Row>
            <Col>
              <p>Log in to view your stats and achievements.</p>
            </Col>
          </Row>
        </Container>
      }
    </div>
  );
}
