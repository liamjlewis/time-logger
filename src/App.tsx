import { HomePage } from './pages/homePage/HomePage';
import { UserData } from './features/userData/UserData';
import { NavArea } from './features/navArea/NavArea';
import './App.scss';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavArea />
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/test" Component={() => <h1>test</h1>} />
        </Routes>
        <footer>
          <UserData />
          <span>Copyright {new Date().getFullYear()}</span>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
