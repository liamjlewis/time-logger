import {useEffect, useState } from 'react';

import { WorkUnitType } from "../userData/userDataSlice";

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUserData } from '../userData/userDataSlice';
import { selectUserInfo } from '../userInfo/userInfoSlice';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from '../../components/Spinner';
import LineChart from '../../components/lineChart';
import StackedBarChart from '../../components/StackedBarChart';
import RadarChart from '../../components/RadarChart';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  workUnitsForLineChart, 
  workUnitsForRadarChart, 
  LineChartDataType, 
  RadarChartDataType, 
  getWorkUnitsWithinDateRange, 
  shortDateFormat 
} from '../../utilities';

//default dates
const oneYearAgo = new Date();
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
const defaultDateLow = shortDateFormat(oneYearAgo);
const defaultDateHigh = shortDateFormat(new Date());
// NOTE: these dates should be taken from some config settings and used in the initial call to the API since right now it's just GETing all the days and available data.

export function KeyStats() {
  const userData = useAppSelector(selectUserData);
  const userInfo = useAppSelector(selectUserInfo);
  
  const [workUnitsProcessedLineChart, setWorkUnitsProcessedLineChart] = useState<LineChartDataType | null>(null);
  const [workUnitsProcessedRadarChart, setWorkUnitsProcessedRadarChart] = useState<RadarChartDataType | null>(null);
  const [workUnitsDateFiltered, setWorkUnitsDateFiltered] = useState<Array<WorkUnitType>>([]);
  const [selectedDateLow, setSelectedDateLow] = useState<string>(defaultDateLow);
  const [selectedDateHigh, setSelectedDateHigh] = useState<string>(defaultDateHigh);

  useEffect(() => {
    setWorkUnitsDateFiltered(getWorkUnitsWithinDateRange(selectedDateLow, selectedDateHigh, userData.workUnits));
  }, [userData, selectedDateLow, selectedDateHigh])

  useEffect(() => {
      setWorkUnitsProcessedLineChart(workUnitsForLineChart(workUnitsDateFiltered, userData.projects));
      setWorkUnitsProcessedRadarChart(workUnitsForRadarChart(workUnitsDateFiltered, userData.projects));
  }, [workUnitsDateFiltered]);

  return (
    <div>
      {userInfo.isLoggedIn ? 
        <div>
          <DatePicker dateFormat="dd/MM/yyyy" selected={selectedDateLow ? new Date(selectedDateLow) : null} onChange={(date) => setSelectedDateLow(shortDateFormat(date))} />
          <DatePicker dateFormat="dd/MM/yyyy" selected={selectedDateHigh ? new Date(selectedDateHigh) : null} onChange={(date) => setSelectedDateHigh(shortDateFormat(date))} />
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
