import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const collectData = async () => {
    console.log(name, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      {/* Name Input */}
      <input
        className="inputBox"
        type="text"
        placeholder="Enter Your Name."
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      {/* Email Input  */}
      <input
        className="inputBox"
        type="email"
        placeholder="Enter Your Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      {/* Password Input  */}
      <input
        className="inputBox"
        type="password"
        placeholder="Enter Your Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <button onClick={collectData} className="appButton" type="button">
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
