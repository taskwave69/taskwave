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
  getDoc,
} from "firebase/firestore";

function Admin() {

  const navigate =
    useNavigate();

  const allowedAdmins = [

    "jinoyfelix956@gmail.com",

    "alanjaison159@gmail.com",

    "nixondavidnd13@gmail.com",

  ];

  const [section, setSection] =
    useState("addtask");

  const [tasks, setTasks] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [claims, setClaims] =
    useState([]);

  // TASK STATES
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

  const [subreddit, setSubreddit] =
    useState("");

  // WALLET
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

            navigate("/dashboard");
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

        // REMOVE CLAIMED TASKS
        const availableTasks =
          taskList.filter(
            (task) =>
              task.claimed !== true
          );

        setTasks(
          availableTasks
        );

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

  // FETCH CLAIMS
  const fetchClaims =
    async () => {

      try {

        const snapshot =
          await getDocs(
            collection(
              db,
              "taskClaims"
            )
          );

        const claimList =
          snapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setClaims(claimList);

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

    fetchTasks();

    fetchUsers();

    fetchClaims();

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
            subreddit,
            description,
            image,
            instructions,
            amount,

            claimed: false,

            claimedBy: "",

            pendingReview:
              false,

            proof: "",

            status:
              "available",

            rejected: false,

            createdAt:
              Date.now(),
          }
        );

        alert("Task Added");

        setTitle("");
        setSubreddit("");
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

  // REJECT USER
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
            withdrawableBalance:
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

  // APPROVE TASK
  const approveTask =
    async (claim) => {

      try {

        const userRef =
          doc(
            db,
            "users",
            claim.userId
          );

        const userSnap =
          await getDoc(
            userRef
          );

        const userData =
          userSnap.data();

        const currentWithdrawable =
          userData
            ?.withdrawableBalance || 0;

        const currentPending =
          userData
            ?.pendingBalance || 0;

        await updateDoc(
          userRef,
          {
            withdrawableBalance:
              currentWithdrawable +
              Number(
                claim.amount
              ),

            pendingBalance:
              currentPending -
              Number(
                claim.amount
              ),
          }
        );

        await updateDoc(
          doc(
            db,
            "taskClaims",
            claim.id
          ),
          {
            status:
              "approved",
          }
        );

        fetchClaims();

      } catch (error) {

        console.log(error);

      }
    };

  // REJECT TASK
  const rejectTaskClaim =
    async (claim) => {

      try {

        await updateDoc(
          doc(
            db,
            "taskClaims",
            claim.id
          ),
          {
            status:
              "rejected",
          }
        );

        fetchClaims();

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

        paddingTop: "92px",

        paddingLeft: "18px",

        paddingRight: "18px",

        paddingBottom: "40px",
      }}
    >

      <Sidebar />

      {/* HEADER */}
      <div
        style={{
          marginBottom: "22px",
        }}
      >

        <h1
          style={{
            fontSize: "24px",
            fontWeight: "800",
            letterSpacing: "-1px",
          }}
        >
          Admin Panel
        </h1>

      </div>

      {/* MENU */}
      <div
        style={{
          display: "grid",

          gridTemplateColumns:
            "1fr 1fr",

          gap: "10px",

          marginBottom: "18px",
        }}
      >

        <div
          onClick={() =>
            setSection("addtask")
          }

          style={folderStyle}
        >
          Add Task
        </div>

        <div
          onClick={() =>
            setSection("reviews")
          }

          style={folderStyle}
        >
          Reviews
        </div>

        <div
          onClick={() =>
            setSection("verification")
          }

          style={folderStyle}
        >
          Verification
        </div>

        <div
          onClick={() =>
            setSection("wallet")
          }

          style={folderStyle}
        >
          Wallet
        </div>

      </div>

      {/* ADD TASK */}
      {section === "addtask" && (

        <div style={cardStyle}>

          <h2 style={titleStyle}>
            Publish Task
          </h2>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            style={inputStyle}
          />

          <input
            placeholder="Subreddit"
            value={subreddit}
            onChange={(e) =>
              setSubreddit(
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
            placeholder="Reward Amount"
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

          {/* TASK LIST */}
          {tasks.map((task) => (

            <div
              key={task.id}

              style={taskCard}
            >

              <div>

                <p
                  style={{
                    color: "#8b5cf6",
                    fontSize: "10px",
                    marginBottom: "5px",
                  }}
                >
                  {task.subreddit}
                </p>

                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  {task.title}
                </h3>

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

      )}

    </div>
  );
}

const folderStyle = {

  background:
    "rgba(255,255,255,0.03)",

  border:
    "1px solid rgba(255,255,255,0.05)",

  borderRadius: "16px",

  padding: "14px",

  fontSize: "12px",

  fontWeight: "600",

  cursor: "pointer",

  textAlign: "center",
};

const cardStyle = {

  background:
    "rgba(255,255,255,0.03)",

  border:
    "1px solid rgba(255,255,255,0.05)",

  borderRadius: "24px",

  padding: "20px",

  display: "flex",

  flexDirection: "column",

  gap: "14px",
};

const titleStyle = {

  fontSize: "16px",

  fontWeight: "700",
};

const inputStyle = {

  width: "100%",

  padding: "14px",

  borderRadius: "14px",

  border:
    "1px solid rgba(255,255,255,0.06)",

  background:
    "rgba(255,255,255,0.04)",

  color: "white",

  fontSize: "12px",

  outline: "none",
};

const textareaStyle = {

  width: "100%",

  minHeight: "90px",

  padding: "14px",

  borderRadius: "14px",

  border:
    "1px solid rgba(255,255,255,0.06)",

  background:
    "rgba(255,255,255,0.04)",

  color: "white",

  fontSize: "12px",

  outline: "none",

  resize: "none",
};

const buttonStyle = {

  width: "100%",

  padding: "15px",

  border: "none",

  borderRadius: "16px",

  background:
    "linear-gradient(135deg,#8b5cf6,#7c3aed)",

  color: "white",

  fontSize: "13px",

  fontWeight: "700",

  cursor: "pointer",
};

const taskCard = {

  background:
    "rgba(255,255,255,0.03)",

  border:
    "1px solid rgba(255,255,255,0.05)",

  borderRadius: "16px",

  padding: "14px",

  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",
};

const rejectBtn = {

  padding: "10px 12px",

  border: "none",

  borderRadius: "12px",

  background:
    "rgba(239,68,68,0.12)",

  color: "#f87171",

  fontSize: "11px",

  fontWeight: "700",

  cursor: "pointer",
};

export default Admin;