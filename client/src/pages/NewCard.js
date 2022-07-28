import React, { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth";
import axios from "axios";

export default function NewCard() {
  const [title, setTitle] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const { userId } = useParams();
  const { newCollectionId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, front, back, newCollectionId };
    axios
      .post(`http://localhost:5005/api/user/${userId}/collection/${newCollectionId}/newFlashard`, requestBody)
      .then((response) => {
        navigate(`/${userId}/${newCollectionId}/new-card`);
        window.location.reload();
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleTitle = (e) => setTitle(e.target.value);
  const handleFront = (e) => setFront(e.target.value);
  const handleBack = (e) => setBack(e.target.value);

  return (
    <>
      <h1>Add a new card to your collection</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title: </label>
        <input type="text" value={title} onChange={handleTitle} />

        <label htmlFor="front">Front: </label>
        <input type="text" value={front} onChange={handleFront} />

        <label htmlFor="back">Back: </label>
        <input type="text" value={back} onChange={handleBack} />

        <button type="submit">Add cards</button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            const requestBody = { title, front, back, newCollectionId };
            // axios
            //   .post(`http://localhost:5005/api/user/${userId}/collection/${newCollectionId}/newFlashard`, requestBody)
            //   .then((response) => {
                navigate(`/${userId}/my-collections`);
              // })
              // .catch((err) => {
              //   const errorDescription = err.response.data.message;
              //   setErrorMessage(errorDescription);
              // });
          }}
        >
          To collections
        </button>
      </form>

      {errorMessage && <h5>{errorMessage}</h5>}
    </>
  );
}
