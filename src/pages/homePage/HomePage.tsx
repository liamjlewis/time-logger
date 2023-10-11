import { WorkDayList } from '../../features/workDayList/WorkDayList';
import { KeyStats } from '../../features/keyStats/KeyStats';
import '../../App.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function HomePage() {
  return (
    <Container>
        <Row>
            <Col>
                <header className="App-header">
                    <h1>Where does the time go?</h1>
                </header>
            </Col>
        </Row>
        <Row>
            <Col>
                <main>
                    <KeyStats />
                    <WorkDayList />
                </main>
            </Col>
        </Row>
    </Container>
  );
}
