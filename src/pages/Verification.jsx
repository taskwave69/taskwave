// src/pages/Verification.jsx

import { useState } from "react";

import {
  auth,
  db
} from "../firebase";

import {
  doc,
  setDoc
} from "firebase/firestore";

import {
  useNavigate
} from "react-router-dom";

function Verification() {

  const navigate =
    useNavigate();

  const [redditUsername, setRedditUsername] =
    useState("");

  const [redditLink, setRedditLink] =
    useState("");

  const [discordJoined, setDiscordJoined] =
    useState(false);

 