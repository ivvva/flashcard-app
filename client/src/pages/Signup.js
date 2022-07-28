import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import css from "../assets/css/signup.css";
import main from "../assets/main.png";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };
    axios
      .post("http://localhost:5005/api/auth/signup", requestBody)
      .then((response) => {
        const userId = response.data._id;
        // redirect to login
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
        <Link to="/login" className="ghost"><p>Login</p></Link>
          </div>
        </div>
        </div>

        {errorMessage && <p>{errorMessage}</p>}

       
      </div>
    </>
  );
}
