import './App.css';
import LoginPage from './Login';
import RegistrationPage from './Registration';
import InventoryTable from './Table';
import AddItem from './AddItem';
import UpdateItem from './UpdateItem';
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
            <li>
                <Link to="/agregar">Agregar</Link>
              </li>
              <li>
                <Link to="/actualizar">Actualizar</Link>
              </li>
          </ul>
        </nav>
    <hr/>
      {/* <Route exact path="/" component={Home} /> */}
      <Routes>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/registration" element={<RegistrationPage/>}></Route>
        <Route path="/inventory" element={<InventoryTable/>}></Route>
        <Route path="/agregar" element={<AddItem />} />
            <Route path="/actualizar" element={<UpdateItem />} />
      </Routes>
      </div>
    </Router>
    </>
  );
}