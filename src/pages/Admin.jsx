// src/App.jsx

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Wallet from "./pages/Wallet";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Verification from "./pages/Verification";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* DEFAULT */}
        <Route
          path="/"
          element={
            <Navigate
              to="/login"
            />
          }
        />

        {/* AUTH */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* VERIFICATION */}
        <Route
          path="/verification"
          element={
            <Verification />
          }
        />

        {/* MAIN */}
        <Route
          path="/dashboard"
          element={
            <Dashboard />
          }
        />

        <Route
          path="/tasks"
          element={<Tasks />}
        />

        <Route
          path="/wallet"
          element={<Wallet />}
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={<Admin />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;