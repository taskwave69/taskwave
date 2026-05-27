import {
  useEffect,
  useState
} from "react";

import Sidebar from "../components/Sidebar";

import {
  auth,
  db
} from "../firebase";

import {
  doc,
  getDoc,
} from "firebase/firestore";

function Wallet() {

  const [pendingBalance, setPendingBalance] =
    useState(0);

  const [
    withdrawableBalance,
    setWithdrawableBalance
  ] = useState(0);

  const [loading, setLoading] =
    useState(true);

  // FETCH USER WALLET
  useEffect(() => {

    const fetchWallet =
      async () => {

        try {

          const user =
            auth.currentUser;

          if (!user) return;

          const docRef =
            doc(
              db,
              "users",
              user.uid
            );

          const docSnap =
            await getDoc(
              docRef
            );

          if (
            docSnap.exists()
          ) {

            const data =
              docSnap.data();

            setPendingBalance(
              data.pendingBalance || 0
            );

            setWithdrawableBalance(
              data.withdrawableBalance || 0
            );
          }

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchWallet();

  }, []);

  return (

    <div
      style={{
        minHeight: "100vh",

        background:
          "radial-gradient(circle at top,#111827,#050816)",

        color: "white",

        fontFamily:
          "Inter, sans-serif",

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
            fontSize: "30px",

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

            fontSize: "13px",

            lineHeight: "24px",
          }}
        >
          Manage your earnings and withdrawals.
        </p>

      </div>

      {/* LOADING */}
      {loading && (

        <p
          style={{
            color: "#9ca3af",

            fontSize: "13px",
          }}
        >
          Loading wallet...
        </p>

      )}

      {/* BALANCES */}
      {!loading && (

        <div
          style={{
            display: "grid",

            gap: "18px",

            marginBottom: "22px",
          }}
        >

          {/* WITHDRAWABLE */}
          <div
            style={{
              background:
                "linear-gradient(135deg,#8b5cf6,#7c3aed)",

              borderRadius: "26px",

              padding: "24px",

              boxShadow:
                "0 0 35px rgba(139,92,246,0.18)",
            }}
          >

            <p
              style={{
                fontSize: "12px",

                opacity: 0.82,

                marginBottom: "10px",

                letterSpacing: "1px",
              }}
            >
              WITHDRAWABLE BALANCE
            </p>

            <h2
              style={{
                fontSize: "42px",

                fontWeight: "800",

                letterSpacing: "-2px",

                marginBottom: "10px",
              }}
            >
              $
              {Number(
                withdrawableBalance
              ).toFixed(2)}
            </h2>

            <p
              style={{
                fontSize: "13px",

                lineHeight: "24px",

                opacity: 0.9,
              }}
            >
              Approved rewards available
              for withdrawal.
            </p>

          </div>

          {/* PENDING */}
          <div
            style={{
              background:
                "rgba(255,255,255,0.03)",

              border:
                "1px solid rgba(255,255,255,0.05)",

              borderRadius: "24px",

              padding: "22px",

              backdropFilter:
                "blur(18px)",
            }}
          >

            <p
              style={{
                color: "#c4b5fd",

                fontSize: "12px",

                marginBottom: "10px",

                letterSpacing: "1px",
              }}
            >
              PENDING REVIEW
            </p>

            <h2
              style={{
                fontSize: "34px",

                fontWeight: "800",

                marginBottom: "10px",

                letterSpacing: "-1px",
              }}
            >
              $
              {Number(
                pendingBalance
              ).toFixed(2)}
            </h2>

            <p
              style={{
                color: "#9ca3af",

                fontSize: "13px",

                lineHeight: "24px",
              }}
            >
              Waiting for manual admin approval.
            </p>

          </div>

        </div>

      )}

      {/* PAYMENT METHODS */}
      <div
        style={{
          display: "grid",

          gap: "16px",

          marginBottom: "22px",
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

      {/* WITHDRAW */}
      <button
        style={{
          width: "100%",

          padding: "17px",

          border: "none",

          borderRadius: "18px",

          background:
            "linear-gradient(135deg,#8b5cf6,#7c3aed)",

          color: "white",

          fontSize: "14px",

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

  fontSize: "15px",

  fontWeight: "700",

  marginBottom: "6px",
};

const subStyle = {

  color: "#9ca3af",

  fontSize: "12px",
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

  fontSize: "12px",

  fontWeight: "600",

  cursor: "pointer",
};

export default Wallet;