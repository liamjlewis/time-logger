import React from 'react';
import { Counter } from './features/counter/Counter';
import { UserInfo } from './features/userInfo/UserInfo';
import { WorkDayList } from './features/workDayList/WorkDayList';
import './App.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="App">
      <nav>
        <Container>
          <Row>
            <Col className="d-flex justify-content-start">
              <a id="menu-toggle" role="menuitem" aria-label="Open the menu">
                &#9776;
              </a>
            </Col>
            <Col className="d-flex justify-content-end">
              &#9731;
              <UserInfo />
            </Col>
          </Row>
        </Container>
      </nav>
      <header className="App-header">
        <h1>Where does the time go?</h1>
      </header>
      <main>
        <Container>
          <Row>
            <Col>stats</Col>
            <Col xs={6}>stats</Col>
            <Col>stats</Col>
          </Row>
        </Container>
        <WorkDayList />
      </main>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <Counter />
    </div>
  );
}

export default App;
