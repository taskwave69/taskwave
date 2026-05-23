import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>TaskWave</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
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
  fontSize: "18px",
};

export default Sidebar;