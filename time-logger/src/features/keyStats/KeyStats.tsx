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
import RadarChart from '../../components/RadarChart';

import { workUnitsForLineChart, workUnitsForRadarChart, LineChartDataType, RadarChartDataType } from '../../utilities';

let userDataOld: string = "";

export function KeyStats() {
  const userData = useAppSelector(selectUserData);
  const userInfo = useAppSelector(selectUserInfo);
  
  const [workUnitsProcessedLineChart, setWorkUnitsProcessedLineChart] = useState<LineChartDataType | null>(null);
  const [workUnitsProcessedRadarChart, setWorkUnitsProcessedRadarChart] = useState<RadarChartDataType | null>(null);

  useEffect(() => {
    // this is a temporary fix since rendering is being triggered even when userData hasn't changed, it needs to be investigated in the future
    // Perhaps I'm misusing useAppSelector, does it need to be combined with state? https://redux-toolkit.js.org/tutorials/typescript#use-typed-hooks-in-components
    if(userDataOld === JSON.stringify(userData)) return;

    setWorkUnitsProcessedLineChart(workUnitsForLineChart(userData.workUnits, userData.projects));
    setWorkUnitsProcessedRadarChart(workUnitsForRadarChart(userData.workUnits, userData.projects));
    //NOTE: this needs to limit the data to the last week since it's supposed to just be a quick overview
    // NOTE: setWorkUnitsProcessedLineChart is being called more than it should be, look into this?
    userDataOld = JSON.stringify(userData);
  }, [userData])

  return (
    <div>
      {userInfo.isLoggedIn ? 
        <div>
          {workUnitsProcessedLineChart && workUnitsProcessedRadarChart ? 
            <Container>
              <Row>
                <Col sm={12}>
                  <StackedBarChart data={workUnitsProcessedLineChart} fullscreen={true} />
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={4}>
                  <LineChart data={workUnitsProcessedLineChart} fullscreen={true} />
                </Col>
                <Col sm={12} md={4}>
                  <RadarChart data={workUnitsProcessedRadarChart} fullscreen={true} />
                </Col>
                <Col sm={12} md={4}>
                  <LineChart data={workUnitsProcessedLineChart} fullscreen={true} />
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
