import Sidebar from "../components/Sidebar";

function Wallet() {

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top,#111827,#050816)",
        color: "white",
        fontFamily: "Inter, sans-serif",

        paddingTop: "95px",
        paddingLeft: "22px",
        paddingRight: "22px",
        paddingBottom: "40px",
      }}
    >

      <Sidebar />

      {/* HEADER */}
      <div
        style={{
          marginBottom: "24px",
        }}
      >

        <h1
          style={{
            fontSize: "34px",
            fontWeight: "800",
            letterSpacing: "-1px",
            marginBottom: "8px",
          }}
        >
          Wallet
        </h1>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "14px",
            lineHeight: "26px",
          }}
        >
          Manage withdrawals and
          payment methods securely.
        </p>

      </div>

      {/* BALANCE CARD */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#8b5cf6,#7c3aed)",

          borderRadius: "24px",

          padding: "22px",

          marginBottom: "20px",

          boxShadow:
            "0 0 35px rgba(139,92,246,0.20)",
        }}
      >

        <p
          style={{
            fontSize: "13px",
            opacity: 0.82,
            marginBottom: "10px",
          }}
        >
          Available Balance
        </p>

        <h2
          style={{
            fontSize: "42px",
            fontWeight: "800",
            marginBottom: "10px",
            letterSpacing: "-2px",
          }}
        >
          $0.00
        </h2>

        <p
          style={{
            fontSize: "14px",
            lineHeight: "24px",
            opacity: 0.9,
          }}
        >
          Instant payouts through
          Binance and UPI.
        </p>

      </div>

      {/* PAYMENT METHODS */}
      <div
        style={{
          display: "grid",
          gap: "16px",
          marginBottom: "20px",
        }}
      >

        {/* BINANCE */}
        <div style={cardStyle}>

          <div>

            <p style={titleStyle}>
              Binance Wallet
            </p>

            <p style={subStyle}>
              Crypto Withdrawal
            </p>

          </div>

          <button style={buttonStyle}>
            Add
          </button>

        </div>

        {/* UPI */}
        <div style={cardStyle}>

          <div>

            <p style={titleStyle}>
              UPI Payment
            </p>

            <p style={subStyle}>
              Instant Transfer
            </p>

          </div>

          <button style={buttonStyle}>
            Add
          </button>

        </div>

      </div>

      {/* WITHDRAW BUTTON */}
      <button
        style={{
          width: "100%",
          padding: "17px",

          border: "none",

          borderRadius: "18px",

          background:
            "linear-gradient(135deg,#8b5cf6,#7c3aed)",

          color: "white",

          fontSize: "15px",

          fontWeight: "700",

          cursor: "pointer",

          boxShadow:
            "0 0 25px rgba(139,92,246,0.18)",
        }}
      >
        Withdraw Earnings
      </button>

    </div>
  );
}

const cardStyle = {

  background:
    "rgba(255,255,255,0.03)",

  border:
    "1px solid rgba(255,255,255,0.05)",

  borderRadius: "22px",

  padding: "18px",

  backdropFilter:
    "blur(18px)",

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",
};

const titleStyle = {

  fontSize: "16px",

  fontWeight: "700",

  marginBottom: "6px",
};

const subStyle = {

  color: "#9ca3af",

  fontSize: "13px",
};

const buttonStyle = {

  border: "none",

  padding:
    "10px 16px",

  borderRadius:
    "14px",

  background:
    "linear-gradient(135deg,#8b5cf6,#7c3aed)",

  color: "white",

  fontSize: "13px",

  fontWeight: "600",

  cursor: "pointer",
};

export default Wallet;