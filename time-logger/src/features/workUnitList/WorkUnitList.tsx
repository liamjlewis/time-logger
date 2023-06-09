import {useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getUserData, WorkUnitType } from '../userData/userDataSlice';
import { selectUserData } from '../userData/userDataSlice';
import { selectUserInfo } from '../userInfo/userInfoSlice';

import { groupArrayByProperty, getProjectById } from '../../utilities';
import { chartColours } from "../../constants";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

export interface WorkUnitListProps {
  workDayId: string;
}

export interface workUnitsListedByProjectIdType {
  [key: string]: Array<WorkUnitType>;
}

// NOTE: these pills need to be colour coded with the specific colour of that project
// NOTE: these pills need a cross next to them that will delete the work unit
//this will be it's own component that takes a list of work units and makes them into a nicely displayed, colour-coded list seperated by project and able to be deleted - ACTUALLY it would make more sense if this is a reduc component that's merely handed the workday ID, that way it can easily make the call to delete a work unit without a function being handed down to it.

export function WorkUnitList(props: WorkUnitListProps) {
  const dispatch = useAppDispatch();

  const userData = useAppSelector(selectUserData);
  const userInfo = useAppSelector(selectUserInfo);

  useEffect(()=>{
    if(userInfo.isLoggedIn){
      dispatch(getUserData(userInfo.id))
    }
  },[userInfo])

  const workUnitsListedByProjectId: workUnitsListedByProjectIdType = groupArrayByProperty(userData.workUnits.filter(wU => wU.workDayId === props.workDayId), "projectId")

  return (
    <div>
      <Container>
        {Object.keys(workUnitsListedByProjectId).map(projectId => (
          <Row>
            <Col>
                <h5>
                  {getProjectById(userData.projects, projectId).name}
                </h5>
                {workUnitsListedByProjectId[projectId].map((workUnit) => (
                  <span>
                    <Badge pill bg={getProjectById(userData.projects, projectId).colour}>{new Date(workUnit.createdTimeStamp).toLocaleString()}</Badge>
                    &nbsp;
                  </span>
                ))}
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
}
