import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { WorkUnitType, deleteWorkUnit, createWorkUnit } from '../userData/userDataSlice';
import { selectUserData } from '../userData/userDataSlice';

import { groupArrayByProperty, getProjectById } from '../../utilities';

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

// NOTE: these pills need a cross next to them that will delete the work unit
//this will be it's own component that takes a list of work units and makes them into a nicely displayed, colour-coded list seperated by project and able to be deleted - ACTUALLY it would make more sense if this is a reduc component that's merely handed the workday ID, that way it can easily make the call to delete a work unit without a function being handed down to it.

export function WorkUnitList(props: WorkUnitListProps) {
  const dispatch = useAppDispatch();

  const userData = useAppSelector(selectUserData);

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
                {workUnitsListedByProjectId[projectId].map((workUnit, index) => (
                  <>
                    <span>
                      <Badge pill bg={getProjectById(userData.projects, projectId).colour}>{new Date(workUnit.createdTimeStamp).toLocaleString()} <span onClick={() => dispatch(deleteWorkUnit(workUnit.id))}>&#9447;</span></Badge>
                      &nbsp;
                    </span>
                    {(index + 1) === workUnitsListedByProjectId[projectId].length && 
                      <Badge pill bg={getProjectById(userData.projects, projectId).colour} onClick={() => dispatch(createWorkUnit({theWorkDayId: workUnit.workDayId, theProjectId: projectId}))}><span>+</span></Badge>
                    }
                  </>
                ))}
            </Col>
          </Row>
        ))}
      </Container>
    </div>
  );
}
