import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Wallet from "./pages/wallet";
import History from "./pages/history";
import Admin from "./pages/Admin";

import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Disclaimer from "./pages/Disclaimer";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/tasks"
          element={<Tasks />}
        />

        <Route
          path="/wallet"
          element={<Wallet />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />

        {/* LEGAL PAGES */}

        <Route
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/privacy"
          element={<Privacy />}
        />

        <Route
          path="/cookies"
          element={<Cookies />}
        />

        <Route
          path="/disclaimer"
          element={<Disclaimer />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;