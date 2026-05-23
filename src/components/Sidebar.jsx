import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  auth,
  db
} from "../firebase";

import { FiMenu, FiX } from "react-icons/fi";

function Sidebar() {

  const [open, setOpen] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {

    checkAdmin();

  }, []);

  const checkAdmin = async () => {

    try {

      const snapshot = await getDocs(
        collection(db, "admins")
      );

      const admins = snapshot.docs.map(
        (doc) => doc.data().email
      );

      if (
        admins.includes(auth.currentUser?.email)
      ) {
        setIsAdmin(true);
      }

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <>

      {/* MENU BUTTON */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          background: "#00d4ff",
          border: "none",
          color: "black",
          padding: "10px",
          borderRadius: "10px",
          fontSize: "22px",
          cursor: "pointer"
        }}
      >
        <FiMenu />
      </button>

      {/* SIDEBAR */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: open ? "0" : "-260px",
          width: "240px",
          height: "100vh",
          background: "#081028",
          color: "white",
          padding: "30px 20px",
          transition: "0.3s",
          zIndex: 999
        }}
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpen(false)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "28px",
            cursor: "pointer",
            marginBottom: "30px"
          }}
        >
          <FiX />
        </button>

        <h2 style={{ marginBottom: "40px" }}>
          TaskWave
        </h2>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px"
          }}
        >

          <Link to="/dashboard" style={linkStyle}>
            Dashboard
          </Link>

          <Link to="/tasks" style={linkStyle}>
            Tasks
          </Link>

          <Link to="/wallet" style={linkStyle}>
            Wallet
          </Link>

          <Link to="/history" style={linkStyle}>
            History
          </Link>

          {/* SHOW ONLY FOR ADMINS */}
          {isAdmin && (

            <Link
              to="/admin"
              style={linkStyle}
            >
              Admin
            </Link>

          )}

        </nav>

      </div>

    </>
  );
}

const linkStyle = {

  color: "white",

  textDecoration: "none",

  fontSize: "22px"
};

export default Sidebar;