import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  addDoc
} from "firebase/firestore";

import {
  db,
  auth
} from "../firebase";

function Admin() {

  // ADMIN PROTECTION
  const user = auth.currentUser;

  if (
    !user ||
    user.email !== "YOUR_EMAIL@gmail.com"
  ) {

    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center text-3xl font-bold">
        Access Denied
      </div>
    );
  }

  const [submissions, setSubmissions] = useState([]);

  const [withdrawRequests, setWithdrawRequests] = useState([]);

  // TASK CREATION STATES
  const [title, setTitle] = useState("");

  const [reward, setReward] = useState("");

  const [description, setDescription] = useState("");

  const [instructions, setInstructions] = useState("");

  const [imageLink, setImageLink] = useState("");

  const [subreddit, setSubreddit] = useState("");

  useEffect(() => {

    fetchSubmissions();

    fetchWithdrawRequests();

  }, []);

  // FETCH SUBMISSIONS
  const fetchSubmissions = async () => {

    const querySnapshot =
      await getDocs(collection(db, "submissions"));

    const list = [];

    querySnapshot.forEach((doc) => {

      list.push({
        id: doc.id,
        ...doc.data()
      });

    });

    setSubmissions(list);

  };

  // FETCH WITHDRAW REQUESTS
  const fetchWithdrawRequests = async () => {

    const querySnapshot =
      await getDocs(
        collection(db, "withdrawRequests")
      );

    const list = [];

    querySnapshot.forEach((doc) => {

      list.push({
        id: doc.id,
        ...doc.data()
      });

    });

    setWithdrawRequests(list);

  };

  // CREATE TASK
  const createTask = async () => {

    if (!title || !reward) {

      alert("Fill required fields");

      return;

    }

    await addDoc(
      collection(db, "tasks"),
      {

        title,

        reward: Number(reward),

        description,

        instructions,

        imageLink,

        subreddit,

        status: "active"

      }
    );

    alert("Task Created!");

    setTitle("");

    setReward("");

    setDescription("");

    setInstructions("");

    setImageLink("");

    setSubreddit("");

  };

  // APPROVE SUBMISSION
  const approveSubmission = async (submission) => {

    const userRef =
      doc(db, "users", submission.userId);

    const userSnap =
      await getDoc(userRef);

    if (userSnap.exists()) {

      const userData =
        userSnap.data();

      await updateDoc(userRef, {

        pending:
          userData.pending +
          submission.reward,

        totalEarnings:
          userData.totalEarnings +
          submission.reward

      });

      const submissionRef =
        doc(db, "submissions", submission.id);

      await updateDoc(submissionRef, {

        status: "approved",

        approvedAt: new Date()

      });

      alert("Submission Approved!");

      fetchSubmissions();

    }
  };

  // REJECT SUBMISSION
  const rejectSubmission = async (submission) => {

    const submissionRef =
      doc(db, "submissions", submission.id);

    await updateDoc(submissionRef, {

      status: "rejected"

    });

    alert("Submission Rejected!");

    fetchSubmissions();

  };

  // MARK WITHDRAW AS PAID
  const markAsPaid = async (request) => {

    const requestRef =
      doc(
        db,
        "withdrawRequests",
        request.id
      );

    await updateDoc(requestRef, {

      status: "paid"

    });

    alert("Marked as paid!");

    fetchWithdrawRequests();

  };

  // REJECT WITHDRAW REQUEST
  const rejectWithdraw = async (request) => {

    const requestRef =
      doc(
        db,
        "withdrawRequests",
        request.id
      );

    await updateDoc(requestRef, {

      status: "rejected"

    });

    alert("Withdrawal Rejected!");

    fetchWithdrawRequests();

  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">

      <h1 className="text-4xl md:text-5xl font-bold">
        Admin Panel
      </h1>

      {/* CREATE TASK */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mt-12">

        <h2 className="text-3xl font-bold">
          Create Task
        </h2>

        <div className="grid grid-cols-1 gap-4 mt-8">

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="bg-zinc-800 p-4 rounded-2xl outline-none"
          />

          <input
            type="number"
            placeholder="Reward"
            value={reward}
            onChange={(e) =>
              setReward(e.target.value)
            }
            className="bg-zinc-800 p-4 rounded-2xl outline-none"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="bg-zinc-800 p-4 rounded-2xl outline-none min-h-[120px]"
          />

          <textarea
            placeholder="Instructions"
            value={instructions}
            onChange={(e) =>
              setInstructions(e.target.value)
            }
            className="bg-zinc-800 p-4 rounded-2xl outline-none min-h-[120px]"
          />

          <input
            type="text"
            placeholder="Image Link"
            value={imageLink}
            onChange={(e) =>
              setImageLink(e.target.value)
            }
            className="bg-zinc-800 p-4 rounded-2xl outline-none"
          />

          <input
            type="text"
            placeholder="Subreddit Link"
            value={subreddit}
            onChange={(e) =>
              setSubreddit(e.target.value)
            }
            className="bg-zinc-800 p-4 rounded-2xl outline-none"
          />

          <button
            onClick={createTask}
            className="bg-cyan-400 hover:bg-cyan-300 text-black py-4 rounded-2xl font-bold transition"
          >
            Create Task
          </button>

        </div>

      </div>

      {/* SUBMISSIONS */}
      <div className="mt-14">

        <h2 className="text-3xl font-bold">
          Task Submissions
        </h2>

        <div className="grid grid-cols-1 gap-6 mt-8">

          {submissions.map((submission) => (

            <div
              key={submission.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
            >

              <p className="text-cyan-400 font-bold">
                User ID
              </p>

              <p className="break-all mt-2 text-zinc-300">
                {submission.userId}
              </p>

              <p className="text-cyan-400 font-bold mt-6">
                Proof
              </p>

              <a
                href={submission.proof}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline break-all mt-2 block"
              >
                Open Proof
              </a>

              <p className="text-cyan-400 font-bold mt-6">
                Reward
              </p>

              <p className="mt-2">
                ${submission.reward}
              </p>

              <p className="text-cyan-400 font-bold mt-6">
                Status
              </p>

              <p className="mt-2 capitalize">
                {submission.status}
              </p>

              <div className="flex gap-4 mt-8 flex-wrap">

                <button
                  onClick={() =>
                    approveSubmission(submission)
                  }
                  className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-xl font-bold transition"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    rejectSubmission(submission)
                  }
                  className="bg-red-500 hover:bg-red-400 text-white px-6 py-3 rounded-xl font-bold transition"
                >
                  Reject
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* WITHDRAW REQUESTS */}
      <div className="mt-20">

        <h2 className="text-3xl font-bold">
          Withdraw Requests
        </h2>

        <div className="grid grid-cols-1 gap-6 mt-8">

          {withdrawRequests.map((request) => (

            <div
              key={request.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
            >

              <p className="text-cyan-400 font-bold">
                User ID
              </p>

              <p className="break-all mt-2 text-zinc-300">
                {request.userId}
              </p>

              <p className="text-cyan-400 font-bold mt-6">
                Amount
              </p>

              <p className="mt-2">
                ${request.amount}
              </p>

              <p className="text-cyan-400 font-bold mt-6">
                UPI ID
              </p>

              <p className="mt-2">
                {request.upiId || "Not Provided"}
              </p>

              <p className="text-cyan-400 font-bold mt-6">
                Binance ID
              </p>

              <p className="mt-2">
                {request.binanceId || "Not Provided"}
              </p>

              <p className="text-cyan-400 font-bold mt-6">
                Status
              </p>

              <p className="mt-2 capitalize">
                {request.status}
              </p>

              <div className="flex gap-4 mt-8 flex-wrap">

                <button
                  onClick={() =>
                    markAsPaid(request)
                  }
                  className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-xl font-bold transition"
                >
                  Mark Paid
                </button>

                <button
                  onClick={() =>
                    rejectWithdraw(request)
                  }
                  className="bg-red-500 hover:bg-red-400 text-white px-6 py-3 rounded-xl font-bold transition"
                >
                  Reject
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Admin;