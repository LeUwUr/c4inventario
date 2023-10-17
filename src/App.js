import './App.css';
import LoginPage from './Login';
import RegistrationPage from './Registration';
import InventoryTable from './Table';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export default function App() {
  return (
    <>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/registration">Resgistrate</Link>
            </li>
            <li>
              <Link to="/inventory">Inventario</Link>
            </li>
          </ul>
        </nav>
    <hr/>
      {/* <Route exact path="/" component={Home} /> */}
      <Routes>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/registration" element={<RegistrationPage/>}></Route>
        <Route path="/inventory" element={<InventoryTable/>}></Route>
      </Routes>
      </div>
    </Router>
    </>
  );
}
