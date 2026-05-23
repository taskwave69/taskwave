import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";

import {
  auth,
  db
} from "../firebase";

import Sidebar from "../components/Sidebar";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    fetchTasks();

  }, []);

  // FETCH TASKS
  const fetchTasks = async () => {

    const snapshot = await getDocs(
      collection(db, "tasks")
    );

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    const currentUser =
      auth.currentUser?.email;

    // AUTO EXPIRE AFTER 15 MIN
    for (const task of data) {

      if (
        task.status === "claimed" &&
        task.claimedAt
      ) {

        const now = Date.now();

        const diff =
          now - task.claimedAt;

        if (
          diff >
          15 * 60 * 1000
        ) {

          await updateDoc(
            doc(db, "tasks", task.id),
            {
              status: "available",
              claimedBy: "",
              claimedAt: null
            }
          );

          task.status = "available";

          task.claimedBy = "";

        }
      }
    }

    // SHOW ONLY AVAILABLE OR OWN CLAIM
    const filtered = data.filter(
      (task) =>
        task.status === "available" ||
        task.claimedBy === currentUser
    );

    setTasks(filtered);

  };

  // CLAIM TASK
  const claimTask = async (taskId) => {

    const userEmail =
      auth.currentUser?.email;

    await updateDoc(
      doc(db, "tasks", taskId),
      {
        status: "claimed",
        claimedBy: userEmail,
        claimedAt: Date.now()
      }
    );

    alert("Task Claimed!");

    fetchTasks();

  };

  return (

    <div
      style={{
        display: "flex",
        background: "#050816",
        minHeight: "100vh",
        color: "white"
      }}
    >

      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "30px"
        }}
      >

        <h1
          style={{
            fontSize: "35px",
            marginBottom: "30px"
          }}
        >
          Tasks
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "25px"
          }}
        >

          {tasks.map((task) => {

            const ownClaim =
              task.claimedBy ===
              auth.currentUser?.email;

            return (

              <div
                key={task.id}
                style={{
                  background: "#111827",
                  borderRadius: "20px",
                  padding: "20px"
                }}
              >

                {task.image && (

                  <img
                    src={task.image}
                    alt=""
                    style={{
                      width: "100%",
                      borderRadius: "15px",
                      marginBottom: "15px"
                    }}
                  />

                )}

                <h2>{task.title}</h2>

                <p
                  style={{
                    color: "#9ca3af",
                    marginTop: "10px"
                  }}
                >
                  {task.description}
                </p>

                <h3
                  style={{
                    marginTop: "15px",
                    color: "#00d4ff"
                  }}
                >
                  ${task.reward}
                </h3>

                {task.status === "available" && (

                  <button
                    onClick={() =>
                      claimTask(task.id)
                    }
                    style={buttonStyle}
                  >
                    Claim Task
                  </button>

                )}

                {ownClaim && (

                  <div
                    style={{
                      marginTop: "20px",
                      color: "#00d4ff"
                    }}
                  >
                    Claimed By You
                  </div>

                )}

                {task.rejectionReason && (

                  <div
                    style={{
                      marginTop: "15px",
                      color: "red"
                    }}
                  >
                    Rejected:
                    {" "}
                    {task.rejectionReason}
                  </div>

                )}

              </div>

            );
          })}

        </div>

      </div>

    </div>
  );
}

const buttonStyle = {

  marginTop: "20px",

  width: "100%",

  padding: "14px",

  border: "none",

  borderRadius: "12px",

  background: "#00d4ff",

  color: "black",

  fontWeight: "bold",

  cursor: "pointer"
};

export default Tasks;