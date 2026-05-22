import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  signOut
} from "firebase/auth";

import {
  auth
} from "../firebase";

import {
  Menu,
  X
} from "lucide-react";

import {
  useState
} from "react";

function Sidebar() {

  const [open, setOpen] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  const navStyle = (path) =>
    location.pathname === path
      ? "bg-cyan-400 text-black py-3 rounded-xl text-center font-bold block"
      : "hover:bg-zinc-800 py-3 rounded-xl text-center transition block";

  const handleLogout = async () => {

    await signOut(auth);

    navigate("/login");

  };

  return (
    <>

      {/* MOBILE TOPBAR */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center z-50">

        <h1 className="text-2xl font-bold text-cyan-400">
          TaskWave
        </h1>

        <button
          onClick={() =>
            setOpen(!open)
          }
        >
          {open ? (
            <X className="text-white" />
          ) : (
            <Menu className="text-white" />
          )}
        </button>

      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed md:static top-0 left-0 min-h-screen w-64 bg-zinc-900 border-r border-zinc-800 p-5 flex flex-col justify-between z-40 transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >

        <div>

          <h1 className="text-3xl font-bold text-cyan-400 mb-10 hidden md:block">
            TaskWave
          </h1>

          <div className="flex flex-col gap-4 mt-20 md:mt-0">

            <Link
              to="/dashboard"
              className={navStyle("/dashboard")}
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>

            <Link
              to="/tasks"
              className={navStyle("/tasks")}
              onClick={() => setOpen(false)}
            >
              Tasks
            </Link>

            <Link
              to="/wallet"
              className={navStyle("/wallet")}
              onClick={() => setOpen(false)}
            >
              Wallet
            </Link>

            <Link
              to="/history"
              className={navStyle("/history")}
              onClick={() => setOpen(false)}
            >
              History
            </Link>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-400 text-white py-3 rounded-xl font-bold transition"
        >
          Logout
        </button>

      </div>

    </>
  );
}

export default Sidebar;