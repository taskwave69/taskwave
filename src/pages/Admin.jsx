import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";

import {
  db
} from "../firebase";

function Admin() {

  const [tasks, setTasks] = useState([]);

  const [reasons, setReasons] = useState({});

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    const snapshot = await getDocs(
      collection(db, "tasks")
    );

    const data = snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data()
      })
    );

    setTasks(data);

  };

  // APPROVE
  const approveTask = async (taskId) => {

    await updateDoc(
      doc(db, "tasks", taskId),
      {
        status: "approved"
      }
    );

    alert("Approved!");

    fetchTasks();

  };

  // REJECT
  const rejectTask = async (taskId) => {

    await updateDoc(
      doc(db, "tasks", taskId),
      {
        status: "available",

        claimedBy: "",

        claimedAt: null,

        rejectionReason:
          reasons[taskId] || "Rejected"
      }
    );

    alert("Rejected!");

    fetchTasks();

  };

  return (

    <div
      style={{
        background: "#050816",
        minHeight: "100vh",
        color: "white",
        padding: "30px"
      }}
    >

      <h1
        style={{
          fontSize: "35px",
          marginBottom: "30px"
        }}
      >
        Admin Panel
      </h1>

      <div
        style={{
          display: "grid",
          gap: "25px"
        }}
      >

        {tasks
          .filter(
            (task) =>
              task.status === "claimed"
          )
          .map((task) => (

            <div
              key={task.id}
              style={{
                background: "#111827",
                padding: "20px",
                borderRadius: "20px"
              }}
            >

              <h2>{task.title}</h2>

              <p
                style={{
                  marginTop: "10px",
                  color: "#9ca3af"
                }}
              >
                {task.description}
              </p>

              <p
                style={{
                  marginTop: "15px"
                }}
              >
                Claimed By:
                {" "}
                {task.claimedBy}
              </p>

              <textarea
                placeholder="Reject reason"
                value={
                  reasons[task.id] || ""
                }
                onChange={(e) =>
                  setReasons({
                    ...reasons,
                    [task.id]:
                      e.target.value
                  })
                }
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "15px",
                  borderRadius: "12px",
                  border: "none"
                }}
              />

              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  marginTop: "20px"
                }}
              >

                <button
                  onClick={() =>
                    approveTask(task.id)
                  }
                  style={{
                    ...btn,
                    background: "#00d4ff",
                    color: "black"
                  }}
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    rejectTask(task.id)
                  }
                  style={{
                    ...btn,
                    background: "red"
                  }}
                >
                  Reject
                </button>

              </div>

            </div>

          ))}

      </div>

    </div>
  );
}

const btn = {

  padding: "14px 25px",

  border: "none",

  borderRadius: "12px",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer"
};

export default Admin;