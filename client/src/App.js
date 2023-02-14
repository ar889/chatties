import React, { useEffect, useRef } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isUser } from "./store/authSlice";
import { io } from "socket.io-client";

const App = () => {
  const socket = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
console.log(user)
  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    dispatch(isUser());
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={user.login ? <Home socket={socket} /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
