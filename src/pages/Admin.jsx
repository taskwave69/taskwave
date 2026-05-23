import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  addDoc
} from "firebase/firestore";

import {
  auth,
  db
} from "../firebase";

function Admin() {

  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [reward, setReward] = useState("");

  // CHECK ADMIN
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

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  // ADD TASK
  const addTask = async () => {

    if (!title || !description || !reward) {
      alert("Fill all fields");
      return;
    }

    try {

      await addDoc(
        collection(db, "tasks"),
        {
          title,
          description,
          reward,
          createdAt: Date.now()
        }
      );

      alert("Task Added!");

      setTitle("");
      setDescription("");
      setReward("");

    } catch (error) {

      console.log(error);

      alert("Error");
    }
  };

  // LOADING
  if (loading) {
    return (
      <h1 style={{ color: "white" }}>
        Loading...
      </h1>
    );
  }

  // BLOCK NON ADMINS
  if (!isAdmin) {

    return (
      <div
        style={{
          color: "white",
          background: "black",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px"
        }}
      >
        Access Denied
      </div>
    );
  }

  // ADMIN PANEL
  return (

    <div
      style={{
        background: "black",
        minHeight: "100vh",
        color: "white",
        padding: "30px"
      }}
    >

      <h1>Admin Panel</h1>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        style={inputStyle}
      />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        style={inputStyle}
      />

      <input
        type="number"
        placeholder="Reward"
        value={reward}
        onChange={(e) =>
          setReward(e.target.value)
        }
        style={inputStyle}
      />

      <button
        onClick={addTask}
        style={buttonStyle}
      >
        Add Task
      </button>

    </div>
  );
}

const inputStyle = {

  width: "100%",

  padding: "15px",

  marginTop: "20px",

  borderRadius: "10px",

  border: "none",

  fontSize: "18px"
};

const buttonStyle = {

  marginTop: "20px",

  padding: "15px 25px",

  border: "none",

  borderRadius: "10px",

  background: "#00d4ff",

  color: "black",

  fontSize: "18px",

  cursor: "pointer"
};

export default Admin;