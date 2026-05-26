// ===============================
// ADD THESE IMPORTS IN Admin.jsx
// ===============================

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";


// ===============================
// ADD THIS STATE INSIDE Admin()
// ===============================

const [users, setUsers] =
  useState([]);


// ===============================
// FETCH USERS FUNCTION
// ===============================

const fetchUsers =
  async () => {

    try {

      const q =
        query(
          collection(
            db,
            "users"
          ),

          where(
            "approved",
            "==",
            false
          )
        );

      const snapshot =
        await getDocs(q);

      const usersList =
        snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

      setUsers(usersList);

    } catch (error) {

      console.log(error);

    }
  };


// ===============================
// LOAD USERS
// ===============================

useEffect(() => {

  fetchUsers();

}, []);


// ===============================
// APPROVE USER
// ===============================

const approveUser =
  async (id) => {

    try {

      await updateDoc(
        doc(
          db,
          "users",
          id
        ),
        {
          approved: true,
        }
      );

      fetchUsers();

    } catch (error) {

      console.log(error);

    }
  };


// ===============================
// REJECT USER
// ===============================

const rejectUser =
  async (id) => {

    try {

      await deleteDoc(
        doc(
          db,
          "users",
          id
        )
      );

      fetchUsers();

    } catch (error) {

      console.log(error);

    }
  };


// ===============================
// REPLACE ENTIRE REVIEW SECTION
// ===============================

{section === "review" && (

  <div style={cardStyle}>

    <h2 style={sectionTitle}>
      Reddit Verifications
    </h2>

    {users.length === 0 && (

      <div
        style={{
          color: "#9ca3af",
          fontSize: "13px",
        }}
      >
        No pending verifications.
      </div>

    )}

    {users.map((user) => (

      <div
        key={user.id}
        style={{
          background:
            "rgba(255,255,255,0.03)",

          border:
            "1px solid rgba(255,255,255,0.05)",

          borderRadius: "20px",

          padding: "20px",

          display: "flex",

          flexDirection: "column",

          gap: "14px",
        }}
      >

        {/* USER INFO */}
        <div>

          <p
            style={{
              color: "#9ca3af",

              fontSize: "12px",

              marginBottom: "8px",
            }}
          >
            USER EMAIL
          </p>

          <h3
            style={{
              fontSize: "15px",

              fontWeight: "600",

              marginBottom: "18px",
            }}
          >
            {user.email}
          </h3>

          <p
            style={{
              color: "#9ca3af",

              fontSize: "12px",

              marginBottom: "8px",
            }}
          >
            REDDIT USERNAME
          </p>

          <h3
            style={{
              fontSize: "18px",

              fontWeight: "700",

              marginBottom: "18px",
            }}
          >
            u/{user.redditUsername}
          </h3>

          <p
            style={{
              color: "#9ca3af",

              fontSize: "12px",

              marginBottom: "8px",
            }}
          >
            REDDIT PROFILE
          </p>

          <a
            href={user.redditLink}

            target="_blank"

            rel="noreferrer"

            style={{
              color: "#a78bfa",

              fontSize: "13px",

              textDecoration:
                "none",

              wordBreak:
                "break-all",
            }}
          >
            {user.redditLink}
          </a>

        </div>

        {/* DISCORD STATUS */}
        <div
          style={{
            background:
              "rgba(139,92,246,0.08)",

            border:
              "1px solid rgba(139,92,246,0.14)",

            borderRadius: "16px",

            padding: "14px",
          }}
        >

          <p
            style={{
              color: "#c4b5fd",

              fontSize: "12px",

              marginBottom: "8px",
            }}
          >
            DISCORD STATUS
          </p>

          <p
            style={{
              color: "white",

              fontSize: "14px",

              fontWeight: "600",
            }}
          >
            {user.discordJoined
              ? "Joined Discord"
              : "Not Joined"}
          </p>

        </div>

        {/* ACTION BUTTONS */}
        <div
          style={{
            display: "flex",

            gap: "12px",

            marginTop: "6px",
          }}
        >

          <button
            onClick={() =>
              approveUser(
                user.id
              )
            }

            style={{
              flex: 1,

              padding: "14px",

              border: "none",

              borderRadius: "16px",

              background:
                "linear-gradient(135deg,#22c55e,#16a34a)",

              color: "white",

              fontSize: "14px",

              fontWeight: "700",

              cursor: "pointer",
            }}
          >
            Approve
          </button>

          <button
            onClick={() =>
              rejectUser(
                user.id
              )
            }

            style={{
              flex: 1,

              padding: "14px",

              border: "none",

              borderRadius: "16px",

              background:
                "linear-gradient(135deg,#ef4444,#dc2626)",

              color: "white",

              fontSize: "14px",

              fontWeight: "700",

              cursor: "pointer",
            }}
          >
            Reject
          </button>

        </div>

      </div>

    ))}

  </div>

)}