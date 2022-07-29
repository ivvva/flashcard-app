import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, verifyStoredToken } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    axios
      .post(
        axios.post(
          `/api/login`,
          requestBody
        )
      )
      .then((response) => {
        const userId = response.data._id;
        console.log("i have a token mothafukkas");
        const token = response.data.authToken;
        storeToken(token);
        verifyStoredToken().then(() => {
          navigate(`/${userId}dashboard`);
        });
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input type="text" value={email} onChange={handleEmail} />

        <label htmlFor="password">Password: </label>
        <input type="password" value={password} onChange={handlePassword} />

        <button type="submit">Log In</button>
      </form>

      {errorMessage && <h5>{errorMessage}</h5>}

      <h4>Don't have an account?</h4>
      <Link to="/signup">Sign Up</Link>
    </>
  );
}
