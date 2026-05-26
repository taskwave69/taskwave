// src/pages/Admin.jsx

import {
  useState,
  useEffect
} from "react";

import {
  useNavigate
} from "react-router-dom";

import Sidebar from "../components/Sidebar";

import {
  auth,
  db
} from "../firebase";

import {
  onAuthStateChanged
} from "firebase/auth";

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

function Admin() {

  const navigate =
    useNavigate();

  // APPROVED ADMINS
  const allowedAdmins = [

    "jinoyfelix956@gmail.com",

    "alanjaison159@gmail.com",

    "nixondavidnd13@gmail.com",

  ];

  const [section, setSection] =
    useState("tasks");

  const [tasks, setTasks] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  // ADD TASK STATES
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState("");

  const [instructions, setInstructions] =
    useState("");

  const [amount, setAmount] =
    useState("");

  // WALLET STATES
  const [userId, setUserId] =
    useState("");

  const [walletAmount, setWalletAmount] =
    useState("");

  // ADMIN PROTECTION
  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (user) => {

          if (!user) {

            navigate("/login");

            return;
          }

          const isAdmin =
            allowedAdmins.includes(
              user.email
            );

          if (!isAdmin) {

            navigate(
              "/dashboard"
            );
          }
        }
      );

    return () =>
      unsubscribe();

  }, []);

  // FETCH TASKS
  const fetchTasks =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "tasks"
            )
          );

        const taskList =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setTasks(taskList);

      } catch (error) {

        console.log(error);

      }
    };

  // FETCH USERS
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

  useEffect(() => {

    fetchTasks();

    fetchUsers();

  }, []);

  // ADD TASK
  const handleAddTask =
    async () => {

      try {

        await addDoc(
          collection(
            db,
            "tasks"
          ),
          {
            title,
            description,
            image,
            instructions,
            amount,
            createdAt:
              Date.now(),
          }
        );

        alert("Task Added");

        setTitle("");
        setDescription("");
        setImage("");
        setInstructions("");
        setAmount("");

        fetchTasks();

      } catch (error) {

        console.log(error);

      }
    };

  // DELETE TASK
  const handleDeleteTask =
    async (id) => {

      try {

        await deleteDoc(
          doc(
            db,
            "tasks",
            id
          )
        );

        fetchTasks();

      } catch (error) {

        console.log(error);

      }
    };

  // APPROVE USER
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

  // UPDATE WALLET
  const handleWalletUpdate =
    async () => {

      try {

        await updateDoc(
          doc(
            db,
            "users",
            userId
          ),
          {
            balance:
              Number(
                walletAmount
              ),
          }
        );

        alert(
          "Wallet Updated"
        );

      } catch (error) {

        console.log(error);

      }
    };

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
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "8px",
          }}
        >
          Admin Panel
        </h1>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "13px",
          }}
        >
          Manage workers,
          verifications and tasks.
        </p>

      </div>

      {/* MENU */}
      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "1fr 1fr",

          gap: "14px",

          marginBottom: "24px",
        }}
      >

        <div
          onClick={() =>
            setSection("tasks")
          }
          style={{
            ...folderStyle,

            border:
              section === "tasks"

                ? activeBorder

                : inactiveBorder,
          }}
        >

          <h3 style={folderTitle}>
            Tasks
          </h3>

        </div>

        <div
          onClick={() =>
            setSection("review")
          }
          style={{
            ...folderStyle,

            border:
              section === "review"

                ? activeBorder

                : inactiveBorder,
          }}
        >

          <h3 style={folderTitle}>
            Verification
          </h3>

        </div>

        <div
          onClick={() =>
            setSection("wallet")
          }
          style={{
            ...folderStyle,

            border:
              section === "wallet"

                ? activeBorder

                : inactiveBorder,
          }}
        >

          <h3 style={folderTitle}>
            Wallet
          </h3>

        </div>

      </div>

      {/* TASKS */}
      {section === "tasks" && (

        <div style={cardStyle}>

          <h2 style={sectionTitle}>
            Add Task
          </h2>

          <input
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            style={textareaStyle}
          />

          <input
            placeholder="Image Link"
            value={image}
            onChange={(e) =>
              setImage(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <textarea
            placeholder="Instructions"
            value={instructions}
            onChange={(e) =>
              setInstructions(
                e.target.value
              )
            }
            style={textareaStyle}
          />

          <input
            placeholder="Task Amount"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <button
            onClick={
              handleAddTask
            }
            style={buttonStyle}
          >
            Publish Task
          </button>

          {/* EXISTING TASKS */}
          <div
            style={{
              marginTop: "18px",

              display: "grid",

              gap: "14px",
            }}
          >

            {tasks.map((task) => (

              <div
                key={task.id}
                style={reviewCard}
              >

                <div>

                  <h3
                    style={{
                      fontSize:
                        "15px",
                      marginBottom:
                        "6px",
                    }}
                  >
                    {task.title}
                  </h3>

                  <p
                    style={{
                      color:
                        "#9ca3af",
                      fontSize:
                        "13px",
                    }}
                  >
                    ${task.amount}
                  </p>

                </div>

                <button
                  onClick={() =>
                    handleDeleteTask(
                      task.id
                    )
                  }
                  style={rejectBtn}
                >
                  Delete
                </button>

              </div>

            ))}

          </div>

        </div>

      )}

      {/* VERIFICATION */}
      {section === "review" && (

        <div style={cardStyle}>

          <h2 style={sectionTitle}>
            Reddit Verifications
          </h2>

          {users.map((user) => (

            <div
              key={user.id}
              style={reviewCard}
            >

              <div>

                <h3
                  style={{
                    fontSize: "15px",
                    marginBottom: "6px",
                  }}
                >
                  u/{user.redditUsername}
                </h3>

                <a
                  href={
                    user.redditLink
                  }
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#a78bfa",
                    fontSize: "13px",
                    textDecoration:
                      "none",
                  }}
                >
                  Open Reddit Profile
                </a>

              </div>

              <button
                onClick={() =>
                  approveUser(
                    user.id
                  )
                }
                style={approveBtn}
              >
                Approve
              </button>

            </div>

          ))}

        </div>

      )}

      {/* WALLET */}
      {section === "wallet" && (

        <div style={cardStyle}>

          <h2 style={sectionTitle}>
            Edit Wallet
          </h2>

          <input
            placeholder="User UID"
            value={userId}
            onChange={(e) =>
              setUserId(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            placeholder="New Balance"
            value={walletAmount}
            onChange={(e) =>
              setWalletAmount(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <button
            onClick={
              handleWalletUpdate
            }
            style={buttonStyle}
          >
            Update Wallet
          </button>

        </div>

      )}

    </div>
  );
}

const activeBorder =
  "1px solid rgba(139,92,246,0.35)";

const inactiveBorder =
  "1px solid rgba(255,255,255,0.05)";

const folderStyle = {

  background:
    "rgba(255,255,255,0.03)",

  borderRadius: "22px",

  padding: "20px",

  cursor: "pointer",
};

const folderTitle = {

  fontSize: "15px",

  fontWeight: "600",
};

const cardStyle = {

  background:
    "rgba(255,255,255,0.03)",

  border:
    "1px solid rgba(255,255,255,0.05)",

  borderRadius: "24px",

  padding: "22px",

  display: "flex",

  flexDirection: "column",

  gap: "16px",
};

const sectionTitle = {

  fontSize: "18px",

  fontWeight: "700",
};

const inputStyle = {

  width: "100%",

  padding: "16px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.06)",

  background:
    "rgba(255,255,255,0.04)",

  color: "white",

  fontSize: "14px",

  outline: "none",
};

const textareaStyle = {

  width: "100%",

  minHeight: "110px",

  padding: "16px",

  borderRadius: "16px",

  border:
    "1px solid rgba(255,255,255,0.06)",

  background:
    "rgba(255,255,255,0.04)",

  color: "white",

  fontSize: "14px",

  outline: "none",

  resize: "none",
};

const buttonStyle = {

  width: "100%",

  padding: "16px",

  border: "none",

  borderRadius: "18px",

  background:
    "linear-gradient(135deg,#8b5cf6,#7c3aed)",

  color: "white",

  fontSize: "15px",

  fontWeight: "700",

  cursor: "pointer",
};

const reviewCard = {

  background:
    "rgba(255,255,255,0.03)",

  border:
    "1px solid rgba(255,255,255,0.05)",

  borderRadius: "18px",

  padding: "18px",

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",
};

const approveBtn = {

  padding: "10px 14px",

  border: "none",

  borderRadius: "12px",

  background:
    "linear-gradient(135deg,#22c55e,#16a34a)",

  color: "white",

  cursor: "pointer",

  fontWeight: "600",
};

const rejectBtn = {

  padding: "10px 14px",

  border: "none",

  borderRadius: "12px",

  background:
    "linear-gradient(135deg,#ef4444,#dc2626)",

  color: "white",

  cursor: "pointer",

  fontWeight: "600",
};

export default Admin;