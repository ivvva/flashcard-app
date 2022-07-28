import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/css/signup.css"

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };
    console.log({env: process.env})
    axios
      .post(`${process.env.REACT_APP_BACKEND_URI}/api/auth/signup`, requestBody)
      .then((response) => {
        const userId = response.data._id;
        navigate(`/${userId}/dashboard`);
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  return (
    <>
      <div className="container">
        <div className="form-container sign-in-container">
          <h1>Signup</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email: </label>
            <input type="text" value={email} onChange={handleEmail} />

            <label htmlFor="password">Password: </label>
            <input type="password" value={password} onChange={handlePassword} />

            <label htmlFor="name">Name: </label>
            <input type="text" value={name} onChange={handleName} />

            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h4>Already have an account?</h4>
              <Link to="/login" className="ghost">
                <p>Login</p>
              </Link>
            </div>
          </div>
        </div>

        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </>
  );
}
