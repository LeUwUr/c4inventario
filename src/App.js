// App.js
import './App.css';
import Navbar from './Navbar';
import LoginPage from './Login';
import RegistrationPage from './Registration';
import InventoryTable from './Table';
import AddItem from './AddItem';
import UpdateItem from './UpdateItem';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { LoginContextProvider } from './LoginContext';


export default function App() {
  return (
    <>
      <LoginContextProvider>
        <Router>
          <div>
            <nav>
              <ul>
              </ul>
            </nav>
            <hr />
            
            <Routes>
              <Route
                path="/login"
                element={<LoginPage />}
              ></Route>
              <Route
                path="/registration"
                element={<RegistrationPage />}
              ></Route>
              <Route
                path="/inicio"
                element={<InventoryTable />}
              ></Route>
              <Route
                path="/agregar"
                element={<AddItem />}
              ></Route>
              <Route
                path="/actualizar"
                element={<UpdateItem />}
              ></Route>
            </Routes>
          </div>
        </Router>
      </LoginContextProvider>
    </>
  );
}
