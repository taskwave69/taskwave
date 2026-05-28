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

        // CURRENT BALANCES
        const currentWithdrawable =
          Number(
            userData
              ?.withdrawableBalance || 0
          );

        const currentPending =
          Number(
            userData
              ?.pendingBalance || 0
          );

        const rewardAmount =
          Number(
            claim.amount
          );

        // MOVE BALANCE
        const newPending =
          Math.max(
            currentPending -
            rewardAmount,
            0
          );

        const newWithdrawable =
          currentWithdrawable +
          rewardAmount;

        // UPDATE USER
        await updateDoc(
          userRef,
          {
            pendingBalance:
              newPending,

            withdrawableBalance:
              newWithdrawable,
          }
        );

        // UPDATE CLAIM
        await updateDoc(
          doc(
            db,
            "taskClaims",
            claim.id
          ),
          {
            status:
              "approved",

            approvedAt:
              Date.now(),
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

        const currentPending =
          Number(
            userData
              ?.pendingBalance || 0
          );

        const rewardAmount =
          Number(
            claim.amount
          );

        // REMOVE FROM PENDING
        await updateDoc(
          userRef,
          {
            pendingBalance:
              Math.max(
                currentPending -
                rewardAmount,
                0
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
              "rejected",
          }
        );

        fetchClaims();

      } catch (error) {

        console.log(error);

      }
    };

  return (
    <div>Admin Panel Updated</div>
  );
}

export default Admin;