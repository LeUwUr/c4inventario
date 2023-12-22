import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import 'tailwindcss/tailwind.css';
import AddItem from './AddItem';
import './App.css';
import LoginPage from './Login';
import { LoginContextProvider } from './LoginContext';
import RegistrationPage from './Registration';
import InventoryTable from './Table';
import UpdateItem from './UpdateItem';

export default function App() {
  return (
    <>
      <LoginContextProvider>
        <Router>
          <div>
            <Routes>
              <Route
                path="/"
                element={<LoginPage />}
              ></Route>
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