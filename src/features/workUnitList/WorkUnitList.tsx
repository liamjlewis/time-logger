import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useState, useEffect } from 'react';
import { WorkUnitType, deleteWorkUnit, createWorkUnit, WorkDayType } from '../userData/userDataSlice';
import { selectUserData } from '../userData/userDataSlice';

import { groupArrayByProperty, getProjectById } from '../../utilities';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

export interface workUnitsListedByProjectIdType {
  [key: string]: Array<WorkUnitType>;
}

export interface displayListItem {
  projectName: string;
  projectId: string;
  colour: string;
  workUnits: Array<WorkUnitType>;
}

export interface propsType {
  workDay: WorkDayType;
}

// NOTE: these pills need a cross next to them that will delete the work unit
//this will be it's own component that takes a list of work units and makes them into a nicely displayed, colour-coded list seperated by project and able to be deleted - ACTUALLY it would make more sense if this is a reduc component that's merely handed the workday ID, that way it can easily make the call to delete a work unit without a function being handed down to it.

export function WorkUnitList(props:any) {
  const [displayList, setDisplayList] = useState<displayListItem[]>([]);
  
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);

  useEffect(() => {
    const thisDaysWorkUnits = userData.workUnits.filter(wU => wU.workDayId === props.workDay.id);
    const workUnitsListedByProjectId: workUnitsListedByProjectIdType = groupArrayByProperty(thisDaysWorkUnits, "projectId");
    const displayList = userData.projects.map((project):displayListItem => {
      return {
        projectName: project.name,
        projectId: project.id,
        colour: project.colour,
        workUnits: workUnitsListedByProjectId[project.id] || []
      };
    });
    setDisplayList(displayList)
  }, [userData]);

  return ( 
    <div>
      <Container>
        {displayList.map((displayItem, index) => (
          <Row key={index}>
            <Col>
                <h5>
                  {displayItem.projectName}
                </h5>
                {displayItem.workUnits.map((workUnit, index) => (
                  <span key={index}>
                    <Badge pill bg={displayItem.colour}>{new Date(workUnit.createdTimeStamp).toLocaleString().slice(-8, -3)} <span onClick={() => dispatch(deleteWorkUnit(workUnit.id))}>&#9447;</span></Badge>
                    &nbsp;
                  </span>
                ))}
                <Badge pill bg={displayItem.colour} onClick={() => dispatch(createWorkUnit({theWorkDayId: props.workDay.id, theProjectId: displayItem.projectId, optionalDate: props.workDay.date}))}><span>+</span></Badge>
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
}
