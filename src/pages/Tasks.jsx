import { useEffect, useState } from "react";

import {
  collection,
  getDocs
} from "firebase/firestore";

import { Link } from "react-router-dom";

import { db } from "../firebase";

import Sidebar from "../components/Sidebar";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const fetchTasks = async () => {

      const querySnapshot =
        await getDocs(collection(db, "tasks"));

      const taskList = [];

      querySnapshot.forEach((doc) => {

        taskList.push({
          id: doc.id,
          ...doc.data()
        });

      });

      setTasks(taskList);

    };

    fetchTasks();

  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold">
          Tasks
        </h1>

        <p className="text-zinc-400 mt-3">
          Complete tasks and earn rewards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
            >

              <h2 className="text-2xl font-bold">
                {task.title}
              </h2>

              <p className="text-cyan-400 text-xl mt-3">
                Reward: ${task.reward}
              </p>

              <Link to={`/tasks/${task.id}`}>

                <button
                  className="mt-6 bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-3 rounded-xl font-bold transition"
                >
                  Claim Task
                </button>

              </Link>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Tasks;