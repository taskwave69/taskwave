import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        backgroundColor: "#111827",
        color: "white",
        padding: "20px",
        position: "fixed",
      }}
    >
      <h2>TaskWave</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "30px",
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

        <Link to="/admin" style={linkStyle}>
          Admin
        </Link>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

export default Sidebar;import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        backgroundColor: "#111827",
        color: "white",
        padding: "20px",
        position: "fixed",
      }}
    >
      <h2>TaskWave</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "30px",
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

        <Link to="/admin" style={linkStyle}>
          Admin
        </Link>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
};

export default Sidebar;